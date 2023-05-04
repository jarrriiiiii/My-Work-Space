import { Module } from '@nestjs/common';
import { PropertyWalletFacingService } from './property-wallet-facing.service';
import { PropertyWalletFacingController } from './property-wallet-facing.controller';
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
  controllers: [PropertyWalletFacingController],
  providers: [PropertyWalletFacingService]
})
export class PropertyWalletFacingModule {}
