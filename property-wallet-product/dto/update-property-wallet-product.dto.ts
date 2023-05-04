import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyWalletProductStep1Dto, CreatePropertyWalletProductStep2Dto } from './create-property-wallet-product.dto';

export class UpdatePropertyWalletProductStep1Dto extends PartialType(CreatePropertyWalletProductStep1Dto) {}
export class UpdatePropertyWalletProductStep2Dto extends PartialType(CreatePropertyWalletProductStep2Dto) {}
