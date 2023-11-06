import { PartialType } from '@nestjs/swagger';
import { CreateProCooAuthDto } from './create-pro-coo-auth.dto';

export class UpdateProCooAuthDto extends PartialType(CreateProCooAuthDto) {}
