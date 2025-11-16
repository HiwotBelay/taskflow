import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Task } from '../tasks/entities/task.entity';
import { Project } from '../projects/entities/project.entity';
import { TeamMember } from '../team-members/entities/team-member.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(TeamMember)
    private teamMembersRepository: Repository<TeamMember>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const user = await this.teamMembersRepository.findOne({
      where: { id: createNotificationDto.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${createNotificationDto.userId} not found`);
    }

    let relatedToTask = null;
    let relatedToProject = null;

    if (createNotificationDto.relatedToTask) {
      relatedToTask = await this.tasksRepository.findOne({
        where: { id: createNotificationDto.relatedToTask },
      });
    }

    if (createNotificationDto.relatedToProject) {
      relatedToProject = await this.projectsRepository.findOne({
        where: { id: createNotificationDto.relatedToProject },
      });
    }

    const notification = this.notificationsRepository.create({
      ...createNotificationDto,
      user,
      relatedToTask,
      relatedToProject,
    });

    return this.notificationsRepository.save(notification);
  }

  async findAll(userId: string, unread?: boolean): Promise<Notification[]> {
    const query = this.notificationsRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.relatedToTask', 'relatedToTask')
      .leftJoinAndSelect('notification.relatedToProject', 'relatedToProject')
      .where('notification.user.id = :userId', { userId })
      .orderBy('notification.createdAt', 'DESC');

    if (unread !== undefined) {
      query.andWhere('notification.isRead = :unread', { unread: !unread });
    }

    return query.getMany();
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id },
    });

    if (notification) {
      notification.isRead = true;
      return this.notificationsRepository.save(notification);
    }

    return notification;
  }

  async markAllAsRead(userId: string): Promise<number> {
    const result = await this.notificationsRepository.update(
      { user: { id: userId }, isRead: false },
      { isRead: true },
    );
    return result.affected || 0;
  }

  async remove(id: string): Promise<void> {
    await this.notificationsRepository.delete(id);
  }
}





