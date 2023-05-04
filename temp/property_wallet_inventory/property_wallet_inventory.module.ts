import { Module } from '@nestjs/common';
import { PropertyWalletInventoryService } from './property_wallet_inventory.service';
import { PropertyWalletInventoryController } from './property_wallet_inventory.controller';
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
  controllers: [PropertyWalletInventoryController],
  providers: [PropertyWalletInventoryService]
})
export class PropertyWalletInventoryModule {}
