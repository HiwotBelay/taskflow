import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  health() {
    return {
      message: 'TaskFlow API is running',
      status: 'ok',
      api: '/api',
      version: '1.0.0',
    };
  }
}

