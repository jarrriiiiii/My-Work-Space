import { Test, TestingModule } from '@nestjs/testing';
import { ProCooAuthController } from './pro-coo-auth.controller';
import { ProCooAuthService } from './pro-coo-auth.service';

describe('ProCooAuthController', () => {
  let controller: ProCooAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProCooAuthController],
      providers: [ProCooAuthService],
    }).compile();

    controller = module.get<ProCooAuthController>(ProCooAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
