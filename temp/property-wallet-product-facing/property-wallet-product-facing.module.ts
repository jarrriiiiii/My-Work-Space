import { Module } from '@nestjs/common';
import { PropertyWalletProductFacingService } from './property-wallet-product-facing.service';
import { PropertyWalletProductFacingController } from './property-wallet-product-facing.controller';

@Module({
  controllers: [PropertyWalletProductFacingController],
  providers: [PropertyWalletProductFacingService]
})
export class PropertyWalletProductFacingModule {}
