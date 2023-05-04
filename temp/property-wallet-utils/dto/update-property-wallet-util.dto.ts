import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyWalletUtilDto } from './create-property-wallet-util.dto';

export class UpdatePropertyWalletUtilDto extends PartialType(CreatePropertyWalletUtilDto) {}
