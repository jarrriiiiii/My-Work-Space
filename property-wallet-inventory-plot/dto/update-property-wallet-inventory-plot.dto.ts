import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyWalletInventoryPlotDto } from './create-property-wallet-inventory-plot.dto';

export class UpdatePropertyWalletInventoryPlotDto extends PartialType(CreatePropertyWalletInventoryPlotDto) {}
