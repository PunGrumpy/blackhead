import { Module } from '@nestjs/common'
import { LogsModule } from '../logs/logs.module'
import { ReportController } from './report.controller'
import { ReportGeneratorService } from './report.service'

@Module({
  imports: [LogsModule],
  providers: [ReportGeneratorService],
  controllers: [ReportController],
  exports: [ReportGeneratorService]
})
export class ReportModule {}
