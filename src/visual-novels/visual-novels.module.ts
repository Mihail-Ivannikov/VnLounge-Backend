import { Module } from '@nestjs/common';
import { VisualNovelsController } from './visual-novels.controller';
import { VisualNovelsService } from './visual-novels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisualNovel } from './visual-novel.entity';
import { TypeOrmVisualNovelRepository } from './repositories/typeorm-visual-novel.repository';
import { VisualNovelFactory } from './factories/visual-novel.factory';

@Module({
  imports: [TypeOrmModule.forFeature([VisualNovel])],
  controllers: [VisualNovelsController],
  providers: [
    VisualNovelsService,
    VisualNovelFactory,
    {
      provide: 'IVisualNovelRepository',
      useClass: TypeOrmVisualNovelRepository,
    },
  ],
})
export class VisualNovelsModule {}
