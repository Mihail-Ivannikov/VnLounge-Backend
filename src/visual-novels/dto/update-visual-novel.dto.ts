import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class UpdateVisualNovelDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  genre: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  duration: number; // Ensuring duration is a positive number

  @IsNumber()
  @IsOptional()
  @IsPositive()
  rating: number; // Ensuring rating is a positive number

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image_url: string;

  @IsString()
  @IsOptional()
  torrent_url: string;

  @IsDateString()
  @IsOptional()
  date: string;
}
