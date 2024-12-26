import { Test, TestingModule } from '@nestjs/testing';
import { VisualNovelsController } from './visual-novels.controller';

describe('VisualNovelsController', () => {
  let controller: VisualNovelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisualNovelsController],
    }).compile();

    controller = module.get<VisualNovelsController>(VisualNovelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
