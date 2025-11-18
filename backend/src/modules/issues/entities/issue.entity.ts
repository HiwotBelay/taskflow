import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { TeamMember } from '../../team-members/entities/team-member.entity';

export enum IssueSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum IssueStatus {
  OPEN = 'open',
  IN_REVIEW = 'in-review',
  RESOLVED = 'resolved',
  WONT_FIX = 'wont-fix',
}

@Entity('issues')
export class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Task, (task) => task.issues, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column({
    type: 'enum',
    enum: IssueSeverity,
    default: IssueSeverity.MEDIUM,
  })
  severity: IssueSeverity;

  @Column({
    type: 'enum',
    enum: IssueStatus,
    default: IssueStatus.OPEN,
  })
  status: IssueStatus;

  @ManyToOne(() => TeamMember)
  @JoinColumn({ name: 'reported_by' })
  reportedBy: TeamMember;

  @ManyToOne(() => TeamMember, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assignedTo: TeamMember;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  resolvedAt: Date;
}







