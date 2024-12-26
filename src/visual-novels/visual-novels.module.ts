import { Module } from '@nestjs/common';
import { VisualNovelsController } from './visual-novels.controller';
import { VisualNovelsService } from './visual-novels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisualNovel } from './visual-novel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VisualNovel])],
  controllers: [VisualNovelsController],
  providers: [VisualNovelsService],
})
export class VisualNovelsModule {}
