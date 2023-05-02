import { Module } from '@nestjs/common';
import { PropertyWalletProjectService } from './property_wallet_project.service';
import { PropertyWalletProjectController } from './property_wallet_project.controller';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
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
  controllers: [PropertyWalletProjectController],
  providers: [PropertyWalletProjectService]
})
export class PropertyWalletProjectModule {}
