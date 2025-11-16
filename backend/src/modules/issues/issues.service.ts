import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue, IssueStatus } from './entities/issue.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Task } from '../tasks/entities/task.entity';
import { TeamMember } from '../team-members/entities/team-member.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private issuesRepository: Repository<Issue>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(TeamMember)
    private teamMembersRepository: Repository<TeamMember>,
    private notificationsService: NotificationsService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async create(createIssueDto: CreateIssueDto, userId: string): Promise<Issue> {
    const task = await this.tasksRepository.findOne({
      where: { id: createIssueDto.taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    const reportedBy = await this.teamMembersRepository.findOne({
      where: { id: userId },
    });

    if (!reportedBy) {
      throw new NotFoundException('User not found');
    }

    let assignedTo = null;
    if (createIssueDto.assignedTo) {
      assignedTo = await this.teamMembersRepository.findOne({
        where: { id: createIssueDto.assignedTo },
      });
    }

    const issue = this.issuesRepository.create({
      ...createIssueDto,
      task,
      reportedBy,
      assignedTo,
    });

    const savedIssue = await this.issuesRepository.save(issue);

    // Send notification if issue is assigned to someone
    if (assignedTo) {
      const notification = await this.notificationsService.create({
        userId: assignedTo.id,
        type: 'issue-assigned',
        title: 'Issue Assigned',
        message: `${reportedBy.name} assigned you an issue: "${issue.title}" in task "${task.title}"`,
        relatedToTask: task.id,
      });
      this.notificationsGateway.sendNotification(assignedTo.id, notification);
    }

    // Notify task assignee if issue is reported (if different from reporter)
    if (task.assignedTo && task.assignedTo.id !== reportedBy.id) {
      const notification = await this.notificationsService.create({
        userId: task.assignedTo.id,
        type: 'issue-reported',
        title: 'New Issue Reported',
        message: `${reportedBy.name} reported an issue in your task: "${task.title}"`,
        relatedToTask: task.id,
      });
      this.notificationsGateway.sendNotification(task.assignedTo.id, notification);
    }

    return savedIssue;
  }

  async findAll(taskId?: string): Promise<Issue[]> {
    const query = this.issuesRepository
      .createQueryBuilder('issue')
      .leftJoinAndSelect('issue.task', 'task')
      .leftJoinAndSelect('issue.reportedBy', 'reportedBy')
      .leftJoinAndSelect('issue.assignedTo', 'assignedTo');

    if (taskId) {
      query.where('issue.task.id = :taskId', { taskId });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Issue> {
    const issue = await this.issuesRepository.findOne({
      where: { id },
      relations: ['task', 'reportedBy', 'assignedTo'],
    });

    if (!issue) {
      throw new NotFoundException(`Issue with ID ${id} not found`);
    }

    return issue;
  }

  async resolve(id: string, status: IssueStatus): Promise<Issue> {
    const issue = await this.findOne(id);
    const oldStatus = issue.status;
    issue.status = status;
    if (status === IssueStatus.RESOLVED) {
      issue.resolvedAt = new Date();
    }
    const savedIssue = await this.issuesRepository.save(issue);

    // Send notification when issue is resolved
    if (status === IssueStatus.RESOLVED && oldStatus !== IssueStatus.RESOLVED) {
      // Notify the person who reported the issue
      if (issue.reportedBy && issue.reportedBy.id) {
        const notification = await this.notificationsService.create({
          userId: issue.reportedBy.id,
          type: 'issue-resolved',
          title: 'Issue Resolved',
          message: `The issue "${issue.title}" has been resolved`,
          relatedToTask: issue.task?.id,
        });
        this.notificationsGateway.sendNotification(issue.reportedBy.id, notification);
      }

      // Notify task assignee if different
      if (issue.task?.assignedTo && issue.task.assignedTo.id !== issue.reportedBy?.id) {
        const notification = await this.notificationsService.create({
          userId: issue.task.assignedTo.id,
          type: 'issue-resolved',
          title: 'Issue Resolved',
          message: `The issue "${issue.title}" in your task has been resolved`,
          relatedToTask: issue.task.id,
        });
        this.notificationsGateway.sendNotification(issue.task.assignedTo.id, notification);
      }
    }

    return savedIssue;
  }

  async remove(id: string): Promise<void> {
    const issue = await this.findOne(id);
    await this.issuesRepository.remove(issue);
  }
}





