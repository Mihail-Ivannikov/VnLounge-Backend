import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisualNovel } from './visual-novel.entity';
import { CreateVisualNovelDto } from './dto/create-visual-novel.dto';
import { UpdateVisualNovelDto } from './dto/update-visual-novel.dto';

@Injectable()
export class VisualNovelsService {
  constructor(
    @InjectRepository(VisualNovel)
    private visualNovelsRepository: Repository<VisualNovel>,
  ) {}

  async findAll(filters?: {
    genre?: string;
    type?: string;
  }): Promise<VisualNovel[]> {
    const query = this.visualNovelsRepository.createQueryBuilder('novel');

    if (filters?.genre) {
      query.andWhere('novel.genre = :genre', { genre: filters.genre });
    }

    if (filters?.type) {
      query.andWhere('novel.type = :type', { type: filters.type });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<VisualNovel> {
    return this.visualNovelsRepository.findOne({ where: { id } });
  }

  async create(
    createVisualNovelDto: CreateVisualNovelDto,
  ): Promise<VisualNovel> {
    const visualNovel =
      this.visualNovelsRepository.create(createVisualNovelDto);
    return await this.visualNovelsRepository.save(visualNovel);
  }

  async update(
    id: number,
    updateVisualNovelDto: UpdateVisualNovelDto,
  ): Promise<VisualNovel> {
    await this.visualNovelsRepository.update(id, updateVisualNovelDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.visualNovelsRepository.delete(id);
  }
}
