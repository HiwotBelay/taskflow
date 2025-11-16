import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  userId: string;

  @IsString()
  type: string;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsUUID()
  @IsOptional()
  relatedToTask?: string;

  @IsUUID()
  @IsOptional()
  relatedToProject?: string;
}






