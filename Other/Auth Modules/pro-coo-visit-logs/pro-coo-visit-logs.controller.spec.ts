import { Test, TestingModule } from '@nestjs/testing';
import { ProCooVisitLogsController } from './pro-coo-visit-logs.controller';
import { ProCooVisitLogsService } from './pro-coo-visit-logs.service';

describe('ProCooVisitLogsController', () => {
  let controller: ProCooVisitLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProCooVisitLogsController],
      providers: [ProCooVisitLogsService],
    }).compile();

    controller = module.get<ProCooVisitLogsController>(
      ProCooVisitLogsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
