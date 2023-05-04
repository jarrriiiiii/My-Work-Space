import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletProductController } from './property-wallet-product.controller';
import { PropertyWalletProductService } from './property-wallet-product.service';

describe('PropertyWalletProductController', () => {
  let controller: PropertyWalletProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyWalletProductController],
      providers: [PropertyWalletProductService],
    }).compile();

    controller = module.get<PropertyWalletProductController>(PropertyWalletProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
