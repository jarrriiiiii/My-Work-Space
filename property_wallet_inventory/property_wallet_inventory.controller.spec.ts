import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletInventoryController } from './property_wallet_inventory.controller';
import { PropertyWalletInventoryService } from './property_wallet_inventory.service';

describe('PropertyWalletInventoryController', () => {
  let controller: PropertyWalletInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyWalletInventoryController],
      providers: [PropertyWalletInventoryService],
    }).compile();

    controller = module.get<PropertyWalletInventoryController>(PropertyWalletInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
