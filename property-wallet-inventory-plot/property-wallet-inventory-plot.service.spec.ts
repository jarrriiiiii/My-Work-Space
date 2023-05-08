import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletInventoryPlotService } from './property-wallet-inventory-plot.service';

describe('PropertyWalletInventoryPlotService', () => {
  let service: PropertyWalletInventoryPlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyWalletInventoryPlotService],
    }).compile();

    service = module.get<PropertyWalletInventoryPlotService>(PropertyWalletInventoryPlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
