import { Module } from '@nestjs/common';
import { PropertyWalletProductUtilsService } from './property-wallet-product-utils.service';
import { PropertyWalletProductUtilsController } from './property-wallet-product-utils.controller';

@Module({
  controllers: [PropertyWalletProductUtilsController],
  providers: [PropertyWalletProductUtilsService]
})
export class PropertyWalletProductUtilsModule {}
