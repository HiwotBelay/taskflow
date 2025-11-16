import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { IssueSeverity } from '../entities/issue.entity';

export class CreateIssueDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID()
  taskId: string;

  @IsEnum(IssueSeverity)
  @IsOptional()
  severity?: IssueSeverity;

  @IsUUID()
  @IsOptional()
  assignedTo?: string;
}






