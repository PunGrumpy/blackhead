import { Module } from '@nestjs/common'
import { LogsModule } from '../logs/logs.module'
import { TargetsController } from './targets.controller'
import { TargetsService } from './targets.service'

@Module({
  imports: [LogsModule],
  providers: [TargetsService],
  controllers: [TargetsController],
  exports: [TargetsService]
})
export class TargetsModule {}
