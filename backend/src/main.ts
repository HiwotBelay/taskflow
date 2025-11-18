import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  // Render sets PORT automatically, fallback to 3001 for local dev
  const port = parseInt(process.env.PORT || configService.get('PORT', '3001'), 10);
  const frontendUrl = configService.get('FRONTEND_URL', 'http://localhost:3000');

  // Enable CORS
  const allowedOrigins = [
    frontendUrl,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // In development, allow all origins
      if (process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      
      // In production, check against allowed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Also check if origin matches any allowed origin (for subdomains)
      const originMatches = allowedOrigins.some(allowed => {
        const allowedDomain = allowed.replace('https://', '').replace('http://', '');
        const originDomain = origin.replace('https://', '').replace('http://', '');
        return originDomain === allowedDomain || originDomain.endsWith('.' + allowedDomain);
      });
      
      if (originMatches) {
        return callback(null, true);
      }
      
      // Allow Vercel domains by default
      if (origin.includes('.vercel.app') || origin.includes('vercel.app')) {
        return callback(null, true);
      }
      
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`🚀 Backend server running on http://localhost:${port}/api`);
}

bootstrap();





