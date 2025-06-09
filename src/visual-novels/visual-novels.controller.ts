import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { VisualNovelsService } from './visual-novels.service';
import { CreateVisualNovelDto } from './dto/create-visual-novel.dto';
import { UpdateVisualNovelDto } from './dto/update-visual-novel.dto';

@Controller('/visual-novels')
export class VisualNovelsController {
  constructor(private readonly visualNovelsService: VisualNovelsService) {}

  @Get()
  async findAll(@Query() query: { genre?: string; type?: string }) {
    return this.visualNovelsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.visualNovelsService.findOne(+id);
  }

  @Post()
  async create(@Body() createVisualNovelDto: CreateVisualNovelDto) {
    return this.visualNovelsService.create(createVisualNovelDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVisualNovelDto: UpdateVisualNovelDto,
  ) {
    return this.visualNovelsService.update(+id, updateVisualNovelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.visualNovelsService.remove(+id);
  }
}
