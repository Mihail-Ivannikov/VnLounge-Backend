import { Test, TestingModule } from '@nestjs/testing';
import { VisualNovelsService } from './visual-novels.service';

describe('VisualNovelsService', () => {
  let service: VisualNovelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisualNovelsService],
    }).compile();

    service = module.get<VisualNovelsService>(VisualNovelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
