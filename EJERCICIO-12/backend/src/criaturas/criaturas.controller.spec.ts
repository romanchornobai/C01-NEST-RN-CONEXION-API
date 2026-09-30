import { Test, TestingModule } from '@nestjs/testing';
import { CriaturasController } from './criaturas.controller.js';

describe('CriaturasController', () => {
  let controller: CriaturasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CriaturasController],
    }).compile();

    controller = module.get<CriaturasController>(CriaturasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
