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
        const host = configService.get('DATABASE_HOST', 'localhost');
        // Clean host - remove any protocol, connection string parts, or IPv6 addresses
        let cleanHost = host;
        if (host.includes('://')) {
          // Remove postgresql:// or https://
          cleanHost = host.split('://')[1];
          if (cleanHost.includes('@')) {
            // Remove user:pass@
            cleanHost = cleanHost.split('@')[1];
          }
          if (cleanHost.includes('/')) {
            // Remove /database
            cleanHost = cleanHost.split('/')[0];
          }
        }
        // Remove port if included
        if (cleanHost.includes(':')) {
          cleanHost = cleanHost.split(':')[0];
        }
        
        const port = parseInt(configService.get('DATABASE_PORT', '5432'), 10);
        const isSupabase = cleanHost.includes('supabase.co') || cleanHost.includes('pooler.supabase.com');
        const isNeon = cleanHost.includes('neon.tech');
        
        return {
          type: 'postgres',
          host: cleanHost,
          port: port,
          username: configService.get('DATABASE_USER', 'taskflow_user'),
          password: configService.get('DATABASE_PASSWORD', 'password'),
          database: configService.get('DATABASE_NAME', 'taskflow_db'),
          entities: [Project, Task, TeamMember, Issue, Notification],
          synchronize: true,
          logging: configService.get('NODE_ENV') === 'development',
          ssl: (isSupabase || isNeon) ? { rejectUnauthorized: false } : false,
          extra: {
            // Force IPv4 for Supabase connections
            ...(isSupabase && {
              connectionTimeoutMillis: 10000,
            }),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}



