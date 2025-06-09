import { Test, TestingModule } from '@nestjs/testing';
import { VisualNovelsService } from './visual-novels.service';
import { VisualNovel } from './visual-novel.entity';
import { CreateVisualNovelDto } from './dto/create-visual-novel.dto';
import { IVisualNovelRepository } from './repositories/visual-novel.repository.interface';

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

// Create a mock repository that implements IVisualNovelRepository
const mockVisualNovelRepository = {
  // Add underscore prefix to unused parameters
  findAll: jest.fn((_filters) => Promise.resolve([mockVisualNovel])),
  findOne: jest.fn((_id) =>
    Promise.resolve(_id === mockVisualNovel.id ? mockVisualNovel : null),
  ),
  create: jest.fn((dto) => Promise.resolve({ ...dto, id: Date.now() })),
  update: jest.fn((id, dto) => Promise.resolve({ ...mockVisualNovel, ...dto })),
  remove: jest.fn((_id) => Promise.resolve()),
  findByGenre: jest.fn((_genre) => Promise.resolve([mockVisualNovel])),
  findByRating: jest.fn((_rating) => Promise.resolve([mockVisualNovel])),
};

describe('VisualNovelsService', () => {
  let service: VisualNovelsService;
  let repository: IVisualNovelRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisualNovelsService,
        {
          provide: 'IVisualNovelRepository',
          useValue: mockVisualNovelRepository,
        },
      ],
    }).compile();

    service = module.get<VisualNovelsService>(VisualNovelsService);
    repository = module.get<IVisualNovelRepository>('IVisualNovelRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined(); // This line needs the repository variable
  });

  describe('findAll', () => {
    it('should return all visual novels', async () => {
      const result = await service.findAll();
      expect(mockVisualNovelRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockVisualNovel]);
    });

    it('should filter by genre and type', async () => {
      const result = await service.findAll({
        genre: 'Genre A',
        type: 'Type A',
      });
      expect(mockVisualNovelRepository.findAll).toHaveBeenCalledWith({
        genre: 'Genre A',
        type: 'Type A',
      });
      expect(result).toEqual([mockVisualNovel]);
    });
  });

  describe('findOne', () => {
    it('should return a single visual novel by ID', async () => {
      const result = await service.findOne(1);
      expect(mockVisualNovelRepository.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockVisualNovel);
    });

    it('should return null if visual novel is not found', async () => {
      jest
        .spyOn(mockVisualNovelRepository, 'findOne')
        .mockResolvedValueOnce(null);
      const result = await service.findOne(999);
      expect(mockVisualNovelRepository.findOne).toHaveBeenCalledWith(999);
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
      expect(mockVisualNovelRepository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({ ...createDto, id: expect.any(Number) });
    });
  });

  describe('remove', () => {
    it('should delete a visual novel by ID', async () => {
      await service.remove(1);
      expect(mockVisualNovelRepository.remove).toHaveBeenCalledWith(1);
    });
  });
});
