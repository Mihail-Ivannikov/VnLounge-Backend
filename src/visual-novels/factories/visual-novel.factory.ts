import { Injectable } from '@nestjs/common';
import { VisualNovel } from '../visual-novel.entity';
import { CreateVisualNovelDto } from '../dto/create-visual-novel.dto';

// Abstract Product
export interface IVisualNovelProduct {
  getType(): string;
  getRecommendedDuration(): number;
}

// Concrete Products
export class StandardVisualNovel implements IVisualNovelProduct {
  constructor(private entity: VisualNovel) {}
  
  getType(): string {
    return 'VN';
  }
  
  getRecommendedDuration(): number {
    return this.entity.duration || 10;
  }
}

export class MangaVisualNovel implements IVisualNovelProduct {
  constructor(private entity: VisualNovel) {}
  
  getType(): string {
    return 'Manga';
  }
  
  getRecommendedDuration(): number {
    return this.entity.duration || 5;
  }
}

// Factory
@Injectable()
export class VisualNovelFactory {
  createVisualNovelProduct(visualNovel: VisualNovel): IVisualNovelProduct {
    switch(visualNovel.type) {
      case 'Manga':
        return new MangaVisualNovel(visualNovel);
      case 'VN':
      default:
        return new StandardVisualNovel(visualNovel);
    }
  }
}