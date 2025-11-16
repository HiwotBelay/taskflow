import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember, TeamMemberStatus } from './entities/team-member.entity';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectRepository(TeamMember)
    private teamMembersRepository: Repository<TeamMember>,
  ) {}

  async create(createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMember> {
    const member = this.teamMembersRepository.create({
      ...createTeamMemberDto,
      status: createTeamMemberDto.status || TeamMemberStatus.ACTIVE,
    });
    return this.teamMembersRepository.save(member);
  }

  async findAll(status?: TeamMemberStatus): Promise<TeamMember[]> {
    const query = this.teamMembersRepository.createQueryBuilder('member');

    if (status) {
      query.where('member.status = :status', { status });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<TeamMember> {
    const member = await this.teamMembersRepository.findOne({
      where: { id },
      relations: ['assignedTasks', 'createdProjects'],
    });

    if (!member) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }

    return member;
  }

  async updateStatus(id: string, status: TeamMemberStatus): Promise<TeamMember> {
    const member = await this.findOne(id);
    member.status = status;
    return this.teamMembersRepository.save(member);
  }

  async remove(id: string): Promise<void> {
    const member = await this.findOne(id);
    await this.teamMembersRepository.remove(member);
  }
}






