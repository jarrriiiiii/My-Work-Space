import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletFacingController } from './property-wallet-facing.controller';
import { PropertyWalletFacingService } from './property-wallet-facing.service';

describe('PropertyWalletFacingController', () => {
  let controller: PropertyWalletFacingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyWalletFacingController],
      providers: [PropertyWalletFacingService],
    }).compile();

    controller = module.get<PropertyWalletFacingController>(PropertyWalletFacingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
