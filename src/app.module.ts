import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisualNovelsModule } from './visual-novels/visual-novels.module';
import { ConfigModule } from '@nestjs/config';
import { VisualNovel } from './visual-novels/visual-novel.entity';

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
  ],
})
export class AppModule {}
