import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('visual_novels')
export class VisualNovel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  torrent_url: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  genre: string;
}
