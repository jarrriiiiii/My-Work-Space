import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletFacingService } from './property-wallet-facing.service';

describe('PropertyWalletFacingService', () => {
  let service: PropertyWalletFacingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyWalletFacingService],
    }).compile();

    service = module.get<PropertyWalletFacingService>(PropertyWalletFacingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
