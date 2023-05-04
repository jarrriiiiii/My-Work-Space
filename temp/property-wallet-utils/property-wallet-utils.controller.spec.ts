import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletUtilsController } from './property-wallet-utils.controller';
import { PropertyWalletUtilsService } from './property-wallet-utils.service';

describe('PropertyWalletUtilsController', () => {
  let controller: PropertyWalletUtilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyWalletUtilsController],
      providers: [PropertyWalletUtilsService],
    }).compile();

    controller = module.get<PropertyWalletUtilsController>(PropertyWalletUtilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
