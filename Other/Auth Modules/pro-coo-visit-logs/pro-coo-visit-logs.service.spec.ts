import { Test, TestingModule } from '@nestjs/testing';
import { ProCooVisitLogsService } from './pro-coo-visit-logs.service';

describe('ProCooVisitLogsService', () => {
  let service: ProCooVisitLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProCooVisitLogsService],
    }).compile();

    service = module.get<ProCooVisitLogsService>(ProCooVisitLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
