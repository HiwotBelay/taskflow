import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Project } from '../modules/projects/entities/project.entity';
import { Task } from '../modules/tasks/entities/task.entity';
import { TeamMember } from '../modules/team-members/entities/team-member.entity';
import { Issue } from '../modules/issues/entities/issue.entity';
import { Notification } from '../modules/notifications/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Use individual variables (more reliable)
        const host = configService.get('DATABASE_HOST');
        const port = parseInt(configService.get('DATABASE_PORT', '5432'), 10);
        const username = configService.get('DATABASE_USER');
        const password = configService.get('DATABASE_PASSWORD');
        const database = configService.get('DATABASE_NAME', 'postgres');
        
        // Validate required variables
        if (!host || !username || !password) {
          console.error('Missing required database variables. Check DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD');
          throw new Error('Database configuration is incomplete');
        }
        
        const isSupabase = host.includes('supabase.co') || host.includes('pooler.supabase.com');
        const isNeon = host.includes('neon.tech');
        
        console.log(`Connecting to database: ${host}:${port}/${database} as ${username}`);
        
        return {
          type: 'postgres',
          host: host,
          port: port,
          username: username,
          password: password,
          database: database,
          entities: [Project, Task, TeamMember, Issue, Notification],
          synchronize: true,
          logging: configService.get('NODE_ENV') === 'development',
          ssl: (isSupabase || isNeon) ? { rejectUnauthorized: false } : false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}



