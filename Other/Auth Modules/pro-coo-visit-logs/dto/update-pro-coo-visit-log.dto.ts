import { PartialType } from '@nestjs/swagger';
import { CreateProCooVisitLogDto } from './create-pro-coo-visit-log.dto';

export class UpdateProCooVisitLogDto extends PartialType(
  CreateProCooVisitLogDto,
) {}
