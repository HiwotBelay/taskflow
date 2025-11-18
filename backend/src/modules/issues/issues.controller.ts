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
  Request,
} from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { IssueStatus } from './entities/issue.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('issues')
@UseGuards(JwtAuthGuard)
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() createIssueDto: CreateIssueDto, @Request() req) {
    return this.issuesService.create(createIssueDto, req.user.id);
  }

  @Get()
  findAll(@Query('taskId') taskId?: string) {
    return this.issuesService.findAll(taskId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuesService.findOne(id);
  }

  @Patch(':id/resolve')
  resolve(@Param('id') id: string, @Body('status') status: IssueStatus) {
    return this.issuesService.resolve(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuesService.remove(id);
  }
}







