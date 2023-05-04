import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletProductFacingService } from './property-wallet-product-facing.service';

describe('PropertyWalletProductFacingService', () => {
  let service: PropertyWalletProductFacingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyWalletProductFacingService],
    }).compile();

    service = module.get<PropertyWalletProductFacingService>(PropertyWalletProductFacingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
