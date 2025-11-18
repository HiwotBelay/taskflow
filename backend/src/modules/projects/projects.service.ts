import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { TeamMember } from '../team-members/entities/team-member.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { UserRole } from '../auth/enums/user-role.enum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(TeamMember)
    private teamMembersRepository: Repository<TeamMember>,
    private notificationsService: NotificationsService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {
    const createdBy = await this.teamMembersRepository.findOne({
      where: { id: userId },
    });

    if (!createdBy) {
      throw new NotFoundException('User not found');
    }

    const project = this.projectsRepository.create({
      ...createProjectDto,
      createdBy,
      deadline: createProjectDto.deadline
        ? new Date(createProjectDto.deadline)
        : null,
    });

    const savedProject = await this.projectsRepository.save(project);

    // Notify the creator about project creation
    const notification = await this.notificationsService.create({
      userId: createdBy.id,
      type: 'project-created',
      title: 'Project Created',
      message: `You successfully created the project "${savedProject.name}"`,
      relatedToProject: savedProject.id,
    });
    this.notificationsGateway.sendNotification(createdBy.id, notification);

    return savedProject;
  }

  async findAll(userId?: string, userRole?: string): Promise<Project[]> {
    const query = this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.createdBy', 'createdBy')
      .leftJoinAndSelect('project.tasks', 'tasks')
      .leftJoinAndSelect('tasks.assignedTo', 'assignedTo');

    // Managers/Admins see all projects
    // Team Members see projects where they have tasks OR projects they created
    // This ensures they can access projects they're working on
    if (userRole !== UserRole.ADMIN && userRole !== UserRole.MANAGER && userId) {
      // Team Members see projects where they have assigned tasks or projects they created
      query.where('tasks.assignedTo.id = :userId', { userId })
        .orWhere('project.createdBy.id = :userId', { userId });
    }
    // If admin/manager or no userId, return all projects (no where clause)

    return query.getMany();
  }

  async findOne(id: string, userId?: string, userRole?: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['createdBy', 'tasks', 'tasks.assignedTo'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Check permissions: Team Members can only view projects where they have tasks
    if (userRole !== UserRole.ADMIN && userRole !== UserRole.MANAGER && userId) {
      const hasAccess = 
        project.createdBy.id === userId ||
        project.tasks.some(task => task.assignedTo?.id === userId);
      
      if (!hasAccess) {
        throw new ForbiddenException('You do not have permission to view this project');
      }
    }

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId?: string, userRole?: string): Promise<Project> {
    const project = await this.findOne(id, userId, userRole);
    
    // Only Admins, Managers, or project creators can update projects
    if (userRole !== UserRole.ADMIN && userRole !== UserRole.MANAGER && project.createdBy.id !== userId) {
      throw new ForbiddenException('You do not have permission to update this project');
    }
    const oldDeadline = project.deadline ? new Date(project.deadline) : null;

    Object.assign(project, {
      ...updateProjectDto,
      deadline: updateProjectDto.deadline
        ? new Date(updateProjectDto.deadline)
        : project.deadline,
    });

    // Recalculate progress based on tasks
    if (project.tasks && project.tasks.length > 0) {
      const completedTasks = project.tasks.filter(
        (task) => task.status === 'completed',
      ).length;
      project.progress = Math.round(
        (completedTasks / project.tasks.length) * 100,
      );
    }

    const savedProject = await this.projectsRepository.save(project);

    // Check if deadline was changed (schedule adjustment)
    const newDeadline = savedProject.deadline ? new Date(savedProject.deadline) : null;
    const deadlineChanged = newDeadline && oldDeadline && newDeadline.getTime() !== oldDeadline.getTime();
    const deadlineSet = !oldDeadline && newDeadline;

    // Notify all team members assigned to tasks in this project if schedule was adjusted
    if ((deadlineChanged || deadlineSet) && project.tasks && project.tasks.length > 0) {
      const assignedMembers = new Set<string>();
      project.tasks.forEach((task) => {
        if (task.assignedTo) {
          assignedMembers.add(task.assignedTo.id);
        }
      });

      const formattedOldDate = oldDeadline ? oldDeadline.toLocaleDateString() : 'No date';
      const formattedNewDate = newDeadline ? newDeadline.toLocaleDateString() : 'No date';

      for (const memberId of assignedMembers) {
        const notification = await this.notificationsService.create({
          userId: memberId,
          type: 'schedule-updated',
          title: 'Project Schedule Updated',
          message: `The deadline for project "${project.name}" has been changed from ${formattedOldDate} to ${formattedNewDate}`,
          relatedToProject: project.id,
        });
        this.notificationsGateway.sendNotification(memberId, notification);
      }
    }

    return savedProject;
  }

  async remove(id: string, userId?: string, userRole?: string): Promise<void> {
    const project = await this.findOne(id, userId, userRole);
    
    // Only Admins, Managers, or project creators can delete projects
    if (userRole !== UserRole.ADMIN && userRole !== UserRole.MANAGER && project.createdBy.id !== userId) {
      throw new ForbiddenException('You do not have permission to delete this project');
    }
    
    await this.projectsRepository.remove(project);
  }
}





