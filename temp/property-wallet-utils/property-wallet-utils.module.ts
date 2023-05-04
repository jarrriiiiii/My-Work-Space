import { Module } from '@nestjs/common';
import { PropertyWalletUtilsService } from './property-wallet-utils.service';
import { PropertyWalletUtilsController } from './property-wallet-utils.controller';
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
  controllers: [PropertyWalletUtilsController],
  providers: [PropertyWalletUtilsService]
})
export class PropertyWalletUtilsModule {}
