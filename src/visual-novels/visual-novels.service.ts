import { Inject, Injectable } from '@nestjs/common';
import { VisualNovel } from './visual-novel.entity';
import { CreateVisualNovelDto } from './dto/create-visual-novel.dto';
import { UpdateVisualNovelDto } from './dto/update-visual-novel.dto';
import { IVisualNovelRepository } from './repositories/visual-novel.repository.interface';

@Injectable()
export class VisualNovelsService {
  constructor(
    @Inject('IVisualNovelRepository') private visualNovelRepository: IVisualNovelRepository,
  ) {}

  async findAll(filters?: {
    genre?: string;
    type?: string;
  }): Promise<VisualNovel[]> {
    return this.visualNovelRepository.findAll(filters);
  }

  async findOne(id: number): Promise<VisualNovel> {
    return this.visualNovelRepository.findOne(id);
  }

  async create(
    createVisualNovelDto: CreateVisualNovelDto,
  ): Promise<VisualNovel> {
    return this.visualNovelRepository.create(createVisualNovelDto);
  }

  async update(
    id: number,
    updateVisualNovelDto: UpdateVisualNovelDto,
  ): Promise<VisualNovel> {
    return this.visualNovelRepository.update(id, updateVisualNovelDto);
  }

  async remove(id: number): Promise<void> {
    await this.visualNovelRepository.remove(id);
  }

  // New methods using the repository
  async findByGenre(genre: string): Promise<VisualNovel[]> {
    return this.visualNovelRepository.findByGenre(genre);
  }

  async findByRating(minRating: number): Promise<VisualNovel[]> {
    return this.visualNovelRepository.findByRating(minRating);
  }
}
