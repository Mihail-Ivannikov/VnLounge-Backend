import { VisualNovel } from '../visual-novel.entity';

export interface IVisualNovelRepository {
  findAll(filters?: { genre?: string; type?: string }): Promise<VisualNovel[]>;
  findOne(id: number): Promise<VisualNovel>;
  create(visualNovel: Partial<VisualNovel>): Promise<VisualNovel>;
  update(id: number, visualNovel: Partial<VisualNovel>): Promise<VisualNovel>;
  remove(id: number): Promise<void>;
  findByGenre(genre: string): Promise<VisualNovel[]>;
  findByRating(minRating: number): Promise<VisualNovel[]>;
}