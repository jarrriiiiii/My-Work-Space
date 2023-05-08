import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletInventoryPlotController } from './property-wallet-inventory-plot.controller';
import { PropertyWalletInventoryPlotService } from './property-wallet-inventory-plot.service';

describe('PropertyWalletInventoryPlotController', () => {
  let controller: PropertyWalletInventoryPlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyWalletInventoryPlotController],
      providers: [PropertyWalletInventoryPlotService],
    }).compile();

    controller = module.get<PropertyWalletInventoryPlotController>(PropertyWalletInventoryPlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
