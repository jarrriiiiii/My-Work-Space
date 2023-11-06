import { Test, TestingModule } from '@nestjs/testing';
import { ProCooAssignProjectService } from './pro-coo-assign-project.service';

describe('ProCooAssignProjectService', () => {
  let service: ProCooAssignProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProCooAssignProjectService],
    }).compile();

    service = module.get<ProCooAssignProjectService>(
      ProCooAssignProjectService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
