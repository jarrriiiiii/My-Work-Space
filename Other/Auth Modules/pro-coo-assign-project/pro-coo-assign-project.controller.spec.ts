import { Test, TestingModule } from '@nestjs/testing';
import { ProCooAssignProjectController } from './pro-coo-assign-project.controller';
import { ProCooAssignProjectService } from './pro-coo-assign-project.service';

describe('ProCooAssignProjectController', () => {
  let controller: ProCooAssignProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProCooAssignProjectController],
      providers: [ProCooAssignProjectService],
    }).compile();

    controller = module.get<ProCooAssignProjectController>(
      ProCooAssignProjectController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
