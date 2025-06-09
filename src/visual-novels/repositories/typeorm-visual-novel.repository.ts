import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisualNovel } from '../visual-novel.entity';
import { IVisualNovelRepository } from './visual-novel.repository.interface';

@Injectable()
export class TypeOrmVisualNovelRepository implements IVisualNovelRepository {
  constructor(
    @InjectRepository(VisualNovel)
    private repository: Repository<VisualNovel>,
  ) {}

  async findAll(filters?: { genre?: string; type?: string }): Promise<VisualNovel[]> {
    const query = this.repository.createQueryBuilder('novel');

    if (filters?.genre) {
      query.andWhere('novel.genre = :genre', { genre: filters.genre });
    }

    if (filters?.type) {
      query.andWhere('novel.type = :type', { type: filters.type });
    }

    return await query.getMany();
  }

  async findOne(id: number): Promise<VisualNovel> {
    return this.repository.findOne({ where: { id } });
  }

  async create(visualNovel: Partial<VisualNovel>): Promise<VisualNovel> {
    const newVisualNovel = this.repository.create(visualNovel);
    return await this.repository.save(newVisualNovel);
  }

  async update(id: number, visualNovel: Partial<VisualNovel>): Promise<VisualNovel> {
    await this.repository.update(id, visualNovel);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findByGenre(genre: string): Promise<VisualNovel[]> {
    return this.repository.find({ where: { genre } });
  }

  async findByRating(minRating: number): Promise<VisualNovel[]> {
    return this.repository.find({
      where: { rating: minRating },
      order: { rating: 'DESC' },
    });
  }
}