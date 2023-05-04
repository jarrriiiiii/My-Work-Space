import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletProductService } from './property-wallet-product.service';

describe('PropertyWalletProductService', () => {
  let service: PropertyWalletProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyWalletProductService],
    }).compile();

    service = module.get<PropertyWalletProductService>(PropertyWalletProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
