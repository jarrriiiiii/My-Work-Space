import { Test, TestingModule } from '@nestjs/testing';
import { ProCooAuthService } from './pro-coo-auth.service';

describe('ProCooAuthService', () => {
  let service: ProCooAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProCooAuthService],
    }).compile();

    service = module.get<ProCooAuthService>(ProCooAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
