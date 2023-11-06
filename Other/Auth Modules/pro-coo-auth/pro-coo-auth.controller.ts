import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Get,
  ParseIntPipe,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { ProCooAuthService } from './pro-coo-auth.service';

import { TransformInterceptor } from 'src/common/transform.interceptor';
import {
  PcSignInDto,
  PcSignUpDto,
  SuspendCoordinatorDto,
} from './dto/create-pro-coo-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { proCoo } from 'src/auth/guards/permission.decorator';
import { proCooRoleType } from 'src/common/constant';
import { noModulePermission } from 'src/admin/admin-user-auth/admin-guards/adminPermission.decorator';

@ApiTags('pro-coo-auth')
@Controller({ version: '1', path: 'pro-coo-auth' })
export class ProCooAuthController {
  constructor(private readonly proCooAuthService: ProCooAuthService) {}

  @noModulePermission()
  @Post('/PcSignUp')
  @UseInterceptors(TransformInterceptor)
  PcSignUp(@Body() pcSignUpDto: PcSignUpDto) {
    return this.proCooAuthService.PcSignUp(pcSignUpDto);
  }

  @Post('/PcSignIn')
  @UseInterceptors(TransformInterceptor)
  PcSignIn(@Body() pcSignInDto: PcSignInDto) {
    return this.proCooAuthService.PcSignIn(pcSignInDto);
  }

  @noModulePermission()
  @Get('/getProCooRoleList')
  @UseInterceptors(TransformInterceptor)
  getProCooRoleList() {
    return this.proCooAuthService.getProCooRoleList();
  }

  @noModulePermission()
  @Get('/getAllCoordinator')
  @UseInterceptors(TransformInterceptor)
  getAllCoordinator(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.proCooAuthService.getAllCoordinator(page, limit);
  }

  @proCoo(proCooRoleType.attendant)
  @Get('/getAllAttendant')
  @UseInterceptors(TransformInterceptor)
  getAllAttendant(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.proCooAuthService.getAllAttendant(page, limit);
  }

  @proCoo(proCooRoleType.attendant)
  @Get('/getAttendantDetailById')
  @UseInterceptors(TransformInterceptor)
  getAttendantDetailById() {
    return this.proCooAuthService.getAttendantDetailById();
  }

  @noModulePermission()
  @Patch('/suspendCoordinator/:id')
  @UseInterceptors(TransformInterceptor)
  suspendCoordinator(
    @Param('id') id: number,
    @Body() suspendCoordinatorDto: SuspendCoordinatorDto,
  ) {
    return this.proCooAuthService.suspendCoordinator(id, suspendCoordinatorDto);
  }
}
