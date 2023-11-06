import { PartialType } from '@nestjs/swagger';
import { CreateProCooAssignProjectDto } from './create-pro-coo-assign-project.dto';

export class UpdateProCooAssignProjectDto extends PartialType(
  CreateProCooAssignProjectDto,
) {}
