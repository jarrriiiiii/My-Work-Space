import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletProductUtilsController } from './property-wallet-product-utils.controller';
import { PropertyWalletProductUtilsService } from './property-wallet-product-utils.service';

describe('PropertyWalletProductUtilsController', () => {
  let controller: PropertyWalletProductUtilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyWalletProductUtilsController],
      providers: [PropertyWalletProductUtilsService],
    }).compile();

    controller = module.get<PropertyWalletProductUtilsController>(PropertyWalletProductUtilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
