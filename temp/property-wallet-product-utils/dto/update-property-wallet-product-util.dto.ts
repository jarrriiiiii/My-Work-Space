import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyWalletProductUtilDto } from './create-property-wallet-product-util.dto';

export class UpdatePropertyWalletProductUtilDto extends PartialType(CreatePropertyWalletProductUtilDto) {}
