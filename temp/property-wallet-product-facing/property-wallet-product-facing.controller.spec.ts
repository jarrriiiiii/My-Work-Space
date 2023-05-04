import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletProductFacingController } from './property-wallet-product-facing.controller';
import { PropertyWalletProductFacingService } from './property-wallet-product-facing.service';

describe('PropertyWalletProductFacingController', () => {
  let controller: PropertyWalletProductFacingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyWalletProductFacingController],
      providers: [PropertyWalletProductFacingService],
    }).compile();

    controller = module.get<PropertyWalletProductFacingController>(PropertyWalletProductFacingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
