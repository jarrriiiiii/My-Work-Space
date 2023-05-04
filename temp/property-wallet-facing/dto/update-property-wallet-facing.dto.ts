import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyWalletFacingDto } from './create-property-wallet-facing.dto';

export class UpdatePropertyWalletFacingDto extends PartialType(CreatePropertyWalletFacingDto) {}
