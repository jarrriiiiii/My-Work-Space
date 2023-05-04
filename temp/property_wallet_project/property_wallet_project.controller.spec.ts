import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletProjectController } from './property_wallet_project.controller';
import { PropertyWalletProjectService } from './property_wallet_project.service';

describe('PropertyWalletProjectController', () => {
  let controller: PropertyWalletProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyWalletProjectController],
      providers: [PropertyWalletProjectService],
    }).compile();

    controller = module.get<PropertyWalletProjectController>(PropertyWalletProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
