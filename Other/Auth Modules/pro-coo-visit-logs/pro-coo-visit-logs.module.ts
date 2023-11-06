import { Module } from '@nestjs/common';
import { ProCooVisitLogsService } from './pro-coo-visit-logs.service';
import { ProCooVisitLogsController } from './pro-coo-visit-logs.controller';

@Module({
  controllers: [ProCooVisitLogsController],
  providers: [ProCooVisitLogsService],
})
export class ProCooVisitLogsModule {}
