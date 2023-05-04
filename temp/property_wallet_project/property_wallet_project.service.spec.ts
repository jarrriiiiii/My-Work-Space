import { Test, TestingModule } from '@nestjs/testing';
import { PropertyWalletProjectService } from './property_wallet_project.service';

describe('PropertyWalletProjectService', () => {
  let service: PropertyWalletProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyWalletProjectService],
    }).compile();

    service = module.get<PropertyWalletProjectService>(PropertyWalletProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
