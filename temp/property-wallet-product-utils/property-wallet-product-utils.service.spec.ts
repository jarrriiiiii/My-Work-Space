import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletProductUtilsService } from './property-wallet-product-utils.service';

describe('PropertyWalletProductUtilsService', () => {
  let service: PropertyWalletProductUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyWalletProductUtilsService],
    }).compile();

    service = module.get<PropertyWalletProductUtilsService>(PropertyWalletProductUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
