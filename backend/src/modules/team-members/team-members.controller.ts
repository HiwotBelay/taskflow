import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TeamMembersService } from './team-members.service';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { TeamMemberStatus } from './entities/team-member.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('team-members')
@UseGuards(JwtAuthGuard)
export class TeamMembersController {
  constructor(private readonly teamMembersService: TeamMembersService) {}

  @Post()
  create(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.teamMembersService.create(createTeamMemberDto);
  }

  @Get()
  findAll(@Query('status') status?: TeamMemberStatus) {
    return this.teamMembersService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamMembersService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TeamMemberStatus,
  ) {
    return this.teamMembersService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamMembersService.remove(id);
  }
}







