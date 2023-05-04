import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletUtilsService } from './property-wallet-utils.service';

describe('PropertyWalletUtilsService', () => {
  let service: PropertyWalletUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyWalletUtilsService],
    }).compile();

    service = module.get<PropertyWalletUtilsService>(PropertyWalletUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
