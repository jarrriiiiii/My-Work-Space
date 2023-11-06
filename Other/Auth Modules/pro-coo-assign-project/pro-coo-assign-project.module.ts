import { Module } from '@nestjs/common';
import { ProCooAssignProjectService } from './pro-coo-assign-project.service';
import { ProCooAssignProjectController } from './pro-coo-assign-project.controller';
import { AdminUserAuthModule } from 'src/admin/admin-user-auth/admin-user-auth.module';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { jwtConfig } from 'src/config/jwt-token.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { SesModule } from '@nextnm/nestjs-ses';
import { RealtimeModule } from 'src/realtime/realtime.module';
import { CommonFunction } from 'src/admin/property_wallet_project_detail/property_wallet_project/helpers/helper.service';

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
  ],
  controllers: [ProCooAssignProjectController],
  providers: [ProCooAssignProjectService, CommonFunction],
})
export class ProCooAssignProjectModule {}
