import { Test, TestingModule } from '@nestjs/testing';
import { VisualNovelsController } from './visual-novels.controller';
import { VisualNovelsService } from './visual-novels.service';

const mockVisualNovel = {
  id: 1,
  title: 'Test Novel',
  date: '2024-12-25',
  genre: 'Adventure',
  type: 'VN',
  rating: 4.5,
  image_url: 'http://example.com/image.jpg',
  author: 'Test Author',
  duration: 10,
  description: 'A test visual novel',
  torrent_url: 'http://example.com/torrent',
};

const mockVisualNovelsService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('VisualNovelsController', () => {
  let controller: VisualNovelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisualNovelsController],
      providers: [
        {
          provide: VisualNovelsService,
          useValue: mockVisualNovelsService,
        },
      ],
    }).compile();

    controller = module.get<VisualNovelsController>(VisualNovelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all visual novels', async () => {
    mockVisualNovelsService.findAll.mockResolvedValue([mockVisualNovel]);
    const novels = await controller.findAll({});
    expect(novels).toEqual([mockVisualNovel]);
    expect(mockVisualNovelsService.findAll).toHaveBeenCalledWith({});
  });

  it('should get a single visual novel by ID', async () => {
    mockVisualNovelsService.findOne.mockResolvedValue(mockVisualNovel);
    const novel = await controller.findOne('1');
    expect(novel).toEqual(mockVisualNovel);
    expect(mockVisualNovelsService.findOne).toHaveBeenCalledWith(1);
  });

  it('should create a visual novel', async () => {
    const createVisualNovelDto = {
      title: 'Test Novel',
      date: '2024-12-25',
      genre: 'Adventure',
      type: 'VN',
      rating: 4.5,
      image_url: 'http://example.com/image.jpg',
      author: 'Test Author',
      duration: 10,
      description: 'A test visual novel',
      torrent_url: 'http://example.com/torrent',
    };

    mockVisualNovelsService.create.mockResolvedValue(mockVisualNovel);
    const novel = await controller.create(createVisualNovelDto);
    expect(novel).toEqual(mockVisualNovel);
    expect(mockVisualNovelsService.create).toHaveBeenCalledWith(
      createVisualNovelDto,
    );
  });

  it('should update a visual novel', async () => {
    const updateVisualNovelDto = {
      title: 'Updated Title',
      date: '2024-12-25',
      genre: 'Adventure',
      type: 'VN',
      rating: 4.5,
      image_url: 'http://example.com/image.jpg',
      author: 'Test Author',
      duration: 12, // Corrected to number
      description: 'An updated description',
      torrent_url: 'http://example.com/updated-torrent',
    };

    mockVisualNovelsService.update.mockResolvedValue(mockVisualNovel);
    const novel = await controller.update('1', updateVisualNovelDto);
    expect(novel).toEqual(mockVisualNovel);
    expect(mockVisualNovelsService.update).toHaveBeenCalledWith(
      1,
      updateVisualNovelDto,
    );
  });

  it('should delete a visual novel', async () => {
    mockVisualNovelsService.remove.mockResolvedValue(mockVisualNovel);
    const novel = await controller.remove('1');
    expect(novel).toEqual(mockVisualNovel);
    expect(mockVisualNovelsService.remove).toHaveBeenCalledWith(1);
  });
});
