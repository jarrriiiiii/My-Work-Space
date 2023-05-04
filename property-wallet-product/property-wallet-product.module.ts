import { Module } from '@nestjs/common';
import { PropertyWalletProductService } from './property-wallet-product.service';
import { PropertyWalletProductController } from './property-wallet-product.controller';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { AdminUserAuthModule } from '../../admin-user-auth/admin-user-auth.module';

@Module({
  imports : [
    PassportModule.register({defaultStrategy : 'jwt'}),
    HttpModule.register({
      timeout: 120000,
      maxRedirects: 5,
    }),
    AdminUserAuthModule
  ],
  controllers: [PropertyWalletProductController],
  providers: [PropertyWalletProductService]
})
export class PropertyWalletProductModule {}
