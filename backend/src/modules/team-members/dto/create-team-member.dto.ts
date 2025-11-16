import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { TeamMemberStatus } from '../entities/team-member.entity';

export class CreateTeamMemberDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  role: string;

  @IsEnum(TeamMemberStatus)
  @IsOptional()
  status?: TeamMemberStatus;
}






