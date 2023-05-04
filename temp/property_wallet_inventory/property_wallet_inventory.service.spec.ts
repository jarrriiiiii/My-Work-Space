import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletInventoryService } from './property_wallet_inventory.service';

describe('PropertyWalletInventoryService', () => {
  let service: PropertyWalletInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyWalletInventoryService],
    }).compile();

    service = module.get<PropertyWalletInventoryService>(PropertyWalletInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
