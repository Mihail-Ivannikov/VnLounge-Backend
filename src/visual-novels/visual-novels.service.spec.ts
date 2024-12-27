import { Test, TestingModule } from '@nestjs/testing';
import { VisualNovelsService } from './visual-novels.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VisualNovel } from './visual-novel.entity';
import { CreateVisualNovelDto } from './dto/create-visual-novel.dto';
import { UpdateVisualNovelDto } from './dto/update-visual-novel.dto';

const mockVisualNovel: VisualNovel = {
  id: 1,
  title: 'Test Novel',
  date: '2023-01-01',
  image_url: 'https://example.com/image.jpg',
  author: 'Test Author',
  duration: 120,
  rating: 4.5,
  description: 'Test Description',
  torrent_url: 'https://example.com/torrent',
  type: 'Type A',
  genre: 'Genre A',
};

const mockRepository = {
  create: jest.fn((dto) => ({ ...dto, id: Date.now() })),
  save: jest.fn((entity) => Promise.resolve(entity)),
  find: jest.fn(() => Promise.resolve([mockVisualNovel])),
  findOne: jest.fn(({ where: { id } }) =>
    Promise.resolve(id === mockVisualNovel.id ? mockVisualNovel : null),
  ),
  update: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
  createQueryBuilder: jest.fn(() => ({
    andWhere: jest.fn().mockReturnThis(),
    getMany: jest.fn(() => Promise.resolve([mockVisualNovel])),
  })),
};

describe('VisualNovelsService', () => {
  let service: VisualNovelsService;
  let repository: Repository<VisualNovel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisualNovelsService,
        {
          provide: getRepositoryToken(VisualNovel),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<VisualNovelsService>(VisualNovelsService);
    repository = module.get<Repository<VisualNovel>>(
      getRepositoryToken(VisualNovel),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all visual novels', async () => {
      const result = await service.findAll();
      expect(repository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual([mockVisualNovel]);
    });

    it('should filter by genre and type', async () => {
      const result = await service.findAll({
        genre: 'Genre A',
        type: 'Type A',
      });
      expect(repository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual([mockVisualNovel]);
    });
  });

  describe('findOne', () => {
    it('should return a single visual novel by ID', async () => {
      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockVisualNovel);
    });

    it('should return null if visual novel is not found', async () => {
      const result = await service.findOne(999);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new visual novel', async () => {
      const createDto: CreateVisualNovelDto = {
        title: 'New Novel',
        date: '2023-01-01',
        genre: 'Genre B',
        type: 'Type B',
        rating: 4.0,
        image_url: 'https://example.com/new.jpg',
        author: 'New Author',
        duration: 150,
        description: 'New Description',
        torrent_url: 'https://example.com/new-torrent',
      };

      const result = await service.create(createDto);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalledWith({
        ...createDto,
        id: expect.any(Number),
      });
      expect(result).toEqual({ ...createDto, id: expect.any(Number) });
    });
  });

  describe('remove', () => {
    it('should delete a visual novel by ID', async () => {
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
