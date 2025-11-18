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
        // Try DATABASE_URL first (full connection string)
        const databaseUrl = configService.get('DATABASE_URL');
        
        if (databaseUrl) {
          // Use full connection string - TypeORM will parse it
          // For Supabase, we need to handle IPv6 issues
          const isSupabase = databaseUrl.includes('supabase.co');
          
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [Project, Task, TeamMember, Issue, Notification],
            synchronize: true,
            logging: configService.get('NODE_ENV') === 'development',
            ssl: isSupabase ? { rejectUnauthorized: false } : false,
            extra: isSupabase ? {
              // Try to prefer IPv4
              connectionTimeoutMillis: 10000,
            } : undefined,
          };
        }
        
        // Fallback to individual variables
        const host = configService.get('DATABASE_HOST', 'localhost');
        const port = parseInt(configService.get('DATABASE_PORT', '5432'), 10);
        const isSupabase = host.includes('supabase.co') || host.includes('pooler.supabase.com');
        const isNeon = host.includes('neon.tech');
        
        return {
          type: 'postgres',
          host: host,
          port: port,
          username: configService.get('DATABASE_USER', 'taskflow_user'),
          password: configService.get('DATABASE_PASSWORD', 'password'),
          database: configService.get('DATABASE_NAME', 'taskflow_db'),
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



