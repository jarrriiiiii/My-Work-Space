import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ProCooAssignProjectService } from './pro-coo-assign-project.service';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { noModulePermission } from 'src/admin/admin-user-auth/admin-guards/adminPermission.decorator';
import { CreateProCooAssignProjectDto } from './dto/create-pro-coo-assign-project.dto';

@ApiTags('pro-coo-assign-project')
@Controller({ version: '1', path: 'pro-coo-assign-project' })
export class ProCooAssignProjectController {
  constructor(
    private readonly proCooAssignProjectService: ProCooAssignProjectService,
  ) {}

  @noModulePermission()
  @Get('getProjects/:projectCoordinatorUserId')
  @UseInterceptors(TransformInterceptor)
  getProjectsByprojectCoordinatorUserId(
    @Param('projectCoordinatorUserId') projectCoordinatorUserId: number,
  ) {
    return this.proCooAssignProjectService.getProjectsByprojectCoordinatorUserId(
      +projectCoordinatorUserId,
    );
  }

  @noModulePermission()
  @Get('getProducts/:projectCoordinatorUserId')
  @UseInterceptors(TransformInterceptor)
  getProductsByprojectCoordinatorUserId(
    @Param('projectCoordinatorUserId') projectCoordinatorUserId: number,
  ) {
    return this.proCooAssignProjectService.getProductsByprojectCoordinatorUserId(
      +projectCoordinatorUserId,
    );
  }

  @noModulePermission()
  @UseInterceptors(TransformInterceptor)
  @Post('/proCooAssign/Project')
  proCooAssignProject(
    @Body() createProCooAssignProjectDto: CreateProCooAssignProjectDto,
  ) {
    return this.proCooAssignProjectService.proCooAssignProject(
      createProCooAssignProjectDto,
    );
  }
}
