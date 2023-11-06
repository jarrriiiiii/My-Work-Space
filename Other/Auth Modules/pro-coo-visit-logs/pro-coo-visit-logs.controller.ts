import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProCooVisitLogsService } from './pro-coo-visit-logs.service';
import {
  CreateProCooVisitLogDto,
  VisitStatusDto,
} from './dto/create-pro-coo-visit-log.dto';
import { UpdateProCooVisitLogDto } from './dto/update-pro-coo-visit-log.dto';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/transform.interceptor';
import { proCooRoleType } from 'src/common/constant';
import { proCoo } from 'src/auth/guards/permission.decorator';

@ApiTags('pro-coo-visit-logs')
@Controller({ version: '1', path: 'pro-coo-visit-logs' })
export class ProCooVisitLogsController {
  constructor(
    private readonly proCooVisitLogsService: ProCooVisitLogsService,
  ) {}

  @proCoo(proCooRoleType.attendant, proCooRoleType.projectCoordinator)
  @UseInterceptors(TransformInterceptor)
  @Post('createProCooVisitLog')
  createProCooVisitLog(
    @Body() createProCooVisitLogDto: CreateProCooVisitLogDto,
  ) {
    return this.proCooVisitLogsService.createProCooVisitLog(
      createProCooVisitLogDto,
    );
  }

  @proCoo(proCooRoleType.attendant, proCooRoleType.projectCoordinator)
  @Get('getAllProCooVisitLog')
  @UseInterceptors(TransformInterceptor)
  getAllProCooVisitLog(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.proCooVisitLogsService.getAllProCooVisitLog(page, limit);
  }

  @proCoo(proCooRoleType.attendant, proCooRoleType.projectCoordinator)
  @Patch('/editProCooVisitLog/:id')
  @UseInterceptors(TransformInterceptor)
  editProCooVisitLog(
    @Param('id') id: number,
    @Body() updateProCooVisitLogDto: UpdateProCooVisitLogDto,
  ) {
    return this.proCooVisitLogsService.editProCooVisitLog(
      id,
      updateProCooVisitLogDto,
    );
  }

  @proCoo(proCooRoleType.attendant, proCooRoleType.projectCoordinator)
  @Delete('deleteProCooVisitLog/:id')
  @UseInterceptors(TransformInterceptor)
  deleteProCooVisitLog(@Param('id') id: number) {
    return this.proCooVisitLogsService.deleteProCooVisitLog(+id);
  }

  @proCoo(proCooRoleType.attendant, proCooRoleType.projectCoordinator)
  @Patch('/visitStatus/:id')
  @UseInterceptors(TransformInterceptor)
  visitStatus(@Param('id') id: number, @Body() visitStatusDto: VisitStatusDto) {
    return this.proCooVisitLogsService.visitStatus(id, visitStatusDto);
  }
}
