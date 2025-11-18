import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Project } from '../projects/entities/project.entity';
import { TeamMember } from '../team-members/entities/team-member.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { UserRole } from '../auth/enums/user-role.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(TeamMember)
    private teamMembersRepository: Repository<TeamMember>,
    private notificationsService: NotificationsService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
    const project = await this.projectsRepository.findOne({
      where: { id: createTaskDto.projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const createdBy = await this.teamMembersRepository.findOne({
      where: { id: userId },
    });

    if (!createdBy) {
      throw new NotFoundException('User not found');
    }

    let assignedTo = null;
    if (createTaskDto.assignedTo) {
      assignedTo = await this.teamMembersRepository.findOne({
        where: { id: createTaskDto.assignedTo },
      });
    }

    const task = this.tasksRepository.create({
      ...createTaskDto,
      project,
      createdBy,
      assignedTo,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
    });

    const savedTask = await this.tasksRepository.save(task);

    // Send notification if assigned
    if (assignedTo) {
      const notification = await this.notificationsService.create({
        userId: assignedTo.id,
        type: 'task-assigned',
        title: 'Task Assigned',
        message: `${createdBy.name} assigned you "${task.title}"`,
        relatedToTask: savedTask.id,
      });
      this.notificationsGateway.sendNotification(assignedTo.id, notification);
    }

    return savedTask;
  }

  async findAll(projectId?: string, userId?: string, userRole?: string): Promise<Task[]> {
    const query = this.tasksRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('task.assignedTo', 'assignedTo')
      .leftJoinAndSelect('task.createdBy', 'createdBy');

    if (projectId) {
      query.where('task.project.id = :projectId', { projectId });
    }

    // Team Members can see all tasks in projects they're part of (for collaboration)
    // But when viewing all tasks (no projectId), they only see tasks assigned to them
    if (userRole !== UserRole.ADMIN && userRole !== UserRole.MANAGER && userId) {
      if (projectId) {
        // When viewing a specific project, team members can see ALL tasks in that project
        // This allows them to see what others are working on for better collaboration
        // They can still only UPDATE tasks assigned to them (enforced in update method)
        query.andWhere('project.id = :projectId', { projectId });
      } else {
        // When viewing all tasks (no project filter), show only assigned tasks
        query.where('task.assignedTo.id = :userId', { userId })
          .orWhere('task.createdBy.id = :userId', { userId })
          .orWhere('project.createdBy.id = :userId', { userId });
      }
    }

    return query.getMany();
  }

  async findOne(id: string, userId?: string, userRole?: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['project', 'assignedTo', 'createdBy', 'issues'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Check permissions: Team Members can only view tasks assigned to them or tasks they created
    if (userRole !== UserRole.ADMIN && userRole !== UserRole.MANAGER && userId) {
      const hasAccess = 
        task.assignedTo?.id === userId ||
        task.createdBy.id === userId ||
        task.project?.createdBy?.id === userId;
      
      if (!hasAccess) {
        throw new ForbiddenException('You do not have permission to view this task');
      }
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string, userRole?: string): Promise<Task> {
    const task = await this.findOne(id, userId, userRole);
    const oldDueDate = task.dueDate ? new Date(task.dueDate) : null;
    const oldAssignedTo = task.assignedTo?.id;
    const oldStatus = task.status; // Store old status before updating

    // Check permissions for update
    const isAdminOrManager = userRole === UserRole.ADMIN || userRole === UserRole.MANAGER;
    const isTaskCreator = task.createdBy.id === userId;
    const isProjectCreator = task.project?.createdBy?.id === userId;
    const isAssignedTo = task.assignedTo?.id === userId;

    // Team Members can only update their own task status, not other fields
    if (!isAdminOrManager && !isTaskCreator && !isProjectCreator) {
      if (isAssignedTo) {
        // Only allow status updates for assigned team members
        const allowedFields = ['status'];
        const updateFields = Object.keys(updateTaskDto);
        const hasRestrictedFields = updateFields.some(field => !allowedFields.includes(field));
        
        if (hasRestrictedFields) {
          throw new ForbiddenException('You can only update the status of tasks assigned to you');
        }
      } else {
        throw new ForbiddenException('You do not have permission to update this task');
      }
    }

    // Only Admins, Managers, or task/project creators can reassign tasks or change deadlines
    if (updateTaskDto.assignedTo && updateTaskDto.assignedTo !== task.assignedTo?.id) {
      if (!isAdminOrManager && !isTaskCreator && !isProjectCreator) {
        throw new ForbiddenException('You do not have permission to reassign tasks');
      }
      const assignedTo = await this.teamMembersRepository.findOne({
        where: { id: updateTaskDto.assignedTo },
      });

      if (assignedTo) {
        task.assignedTo = assignedTo;
        const notification = await this.notificationsService.create({
          userId: assignedTo.id,
          type: 'task-assigned',
          title: 'Task Reassigned',
          message: `You have been assigned "${task.title}"`,
          relatedToTask: task.id,
        });
        this.notificationsGateway.sendNotification(assignedTo.id, notification);
      }
    }

    // Check if due date is being changed (schedule adjustment)
    const newDueDate = updateTaskDto.dueDate ? new Date(updateTaskDto.dueDate) : task.dueDate;
    const dueDateChanged = newDueDate && oldDueDate && newDueDate.getTime() !== oldDueDate.getTime();
    const dueDateSet = !oldDueDate && newDueDate;

    // Only Admins, Managers, or task/project creators can change deadlines
    if ((dueDateChanged || dueDateSet) && !isAdminOrManager && !isTaskCreator && !isProjectCreator) {
      throw new ForbiddenException('You do not have permission to change task deadlines');
    }

    Object.assign(task, {
      ...updateTaskDto,
      dueDate: newDueDate,
    });

    const savedTask = await this.tasksRepository.save(task);

    // Check if task status changed to completed (compare with old status)
    const statusChanged = updateTaskDto.status && updateTaskDto.status !== oldStatus;
    const taskCompleted = statusChanged && updateTaskDto.status === 'completed';

    // Send notification if schedule was adjusted (due date changed)
    if ((dueDateChanged || dueDateSet) && task.assignedTo) {
      const formattedOldDate = oldDueDate ? oldDueDate.toLocaleDateString() : 'No date';
      const formattedNewDate = newDueDate ? new Date(newDueDate).toLocaleDateString() : 'No date';
      const notification = await this.notificationsService.create({
        userId: task.assignedTo.id,
        type: 'schedule-updated',
        title: 'Task Schedule Updated',
        message: `The due date for "${task.title}" has been changed from ${formattedOldDate} to ${formattedNewDate}`,
        relatedToTask: task.id,
      });
      this.notificationsGateway.sendNotification(task.assignedTo.id, notification);
    }

    // Send notification if task was completed
    if (taskCompleted) {
      // Notify the person who assigned the task (project creator or task creator)
      if (task.createdBy && task.createdBy.id !== task.assignedTo?.id) {
        const notification = await this.notificationsService.create({
          userId: task.createdBy.id,
          type: 'task-completed',
          title: 'Task Completed',
          message: `"${task.title}" has been marked as completed`,
          relatedToTask: task.id,
        });
        this.notificationsGateway.sendNotification(task.createdBy.id, notification);
      }

      // Also notify project creator if different
      if (task.project && task.project.createdBy && task.project.createdBy.id !== task.assignedTo?.id && task.project.createdBy.id !== task.createdBy?.id) {
        const notification = await this.notificationsService.create({
          userId: task.project.createdBy.id,
          type: 'task-completed',
          title: 'Task Completed',
          message: `"${task.title}" in project "${task.project.name}" has been completed`,
          relatedToTask: task.id,
          relatedToProject: task.project.id,
        });
        this.notificationsGateway.sendNotification(task.project.createdBy.id, notification);
      }
    }

    // Update project progress
    if (task.project) {
      const project = await this.projectsRepository.findOne({
        where: { id: task.project.id },
        relations: ['tasks'],
      });

      if (project && project.tasks) {
        const completedTasks = project.tasks.filter(
          (t) => t.status === 'completed',
        ).length;
        project.progress = Math.round(
          (completedTasks / project.tasks.length) * 100,
        );
        await this.projectsRepository.save(project);
      }
    }

    return savedTask;
  }

  async remove(id: string, userId?: string, userRole?: string): Promise<void> {
    const task = await this.findOne(id, userId, userRole);
    
    // Only Admins, Managers, or task/project creators can delete tasks
    const isAdminOrManager = userRole === UserRole.ADMIN || userRole === UserRole.MANAGER;
    const isTaskCreator = task.createdBy.id === userId;
    const isProjectCreator = task.project?.createdBy?.id === userId;
    
    if (!isAdminOrManager && !isTaskCreator && !isProjectCreator) {
      throw new ForbiddenException('You do not have permission to delete this task');
    }
    
    await this.tasksRepository.remove(task);
  }
}





