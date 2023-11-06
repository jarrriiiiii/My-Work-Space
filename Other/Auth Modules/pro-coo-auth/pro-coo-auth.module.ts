import { Module } from '@nestjs/common';
import { ProCooAuthService } from './pro-coo-auth.service';
import { ProCooAuthController } from './pro-coo-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt-token.config';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { AdminUserAuthModule } from 'src/admin/admin-user-auth/admin-user-auth.module';
import { SesModule } from '@nextnm/nestjs-ses';
import { RealtimeModule } from 'src/realtime/realtime.module';
import { PaymentTransactionModule } from 'src/payment-transaction/payment-transaction.module';
import { MobileSms } from 'src/common/mobile-sms.service';
import { EmailService } from 'src/common/aws-ses.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig),
    HttpModule.register({
      timeout: 120000,
      maxRedirects: 5,
    }),
    // AdminUserAuthModule,
    AuthModule,
    AdminUserAuthModule,
    SesModule.forRoot({
      SECRET: 'Z6R2G/YcdVz2F7BPvU5xveVxidQKTwMzL1/ShXdn',
      AKI_KEY: 'AKIAUCVMOYINWQFW445M',
      // REGION: 'us-east-1',
      REGION: 'ap-south-1',
    }),
    RealtimeModule,
    PaymentTransactionModule,
  ],
  controllers: [ProCooAuthController],
  providers: [ProCooAuthService, MobileSms, EmailService],
})
export class ProCooAuthModule {}
