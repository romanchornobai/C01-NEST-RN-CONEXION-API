import { Test, TestingModule } from '@nestjs/testing';
import { CriaturasService } from './criaturas.service.js';

describe('CriaturasService', () => {
  let service: CriaturasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CriaturasService],
    }).compile();

    service = module.get<CriaturasService>(CriaturasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
