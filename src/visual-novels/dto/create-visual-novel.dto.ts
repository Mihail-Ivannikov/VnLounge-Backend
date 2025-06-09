import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateVisualNovelDto {
  @IsString()
  title: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsOptional()
  image_url: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  duration: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  rating: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  torrent_url: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  genre: string;
}
