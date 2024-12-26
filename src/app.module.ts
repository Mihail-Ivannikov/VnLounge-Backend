import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisualNovelsModule } from './visual-novels/visual-novels.module';
import { ConfigModule } from '@nestjs/config';
import { VisualNovel } from './visual-novels/visual-novel.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: false, // Set to false in production
      ssl: { rejectUnauthorized: false }, // If SSL is required for Supabase
      entities: [VisualNovel],
    }),
    VisualNovelsModule,
    // ServeStaticModule to serve static files (like images)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your 'upload' directory
      serveRoot: '/uploads', // URL path prefix for the images (e.g., http://localhost:8000/uploads)
    }),
  ],
})
export class AppModule {}
