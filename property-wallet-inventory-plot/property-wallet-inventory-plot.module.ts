import { Module } from '@nestjs/common';
import { PropertyWalletInventoryPlotService } from './property-wallet-inventory-plot.service';
import { PropertyWalletInventoryPlotController } from './property-wallet-inventory-plot.controller';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { AdminUserAuthModule } from 'src/admin/admin-user-auth/admin-user-auth.module';

@Module({
  imports : [
    PassportModule.register({defaultStrategy : 'jwt'}),
    HttpModule.register({
      timeout: 120000,
      maxRedirects: 5,
    }),
    AdminUserAuthModule
  ],
  controllers: [PropertyWalletInventoryPlotController],
  providers: [PropertyWalletInventoryPlotService]
})
export class PropertyWalletInventoryPlotModule {}
