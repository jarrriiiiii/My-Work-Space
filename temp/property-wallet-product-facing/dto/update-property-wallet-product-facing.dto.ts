import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyWalletProductFacingDto } from './create-property-wallet-product-facing.dto';

export class UpdatePropertyWalletProductFacingDto extends PartialType(CreatePropertyWalletProductFacingDto) {}
