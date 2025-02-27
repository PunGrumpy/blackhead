import { Module } from '@nestjs/common'
import { LogsModule } from '../logs/logs.module'
import { ScannerController } from './scanner.controller'
import { SecurityScannerService } from './scanner.service'

@Module({
  imports: [LogsModule],
  providers: [SecurityScannerService],
  controllers: [ScannerController],
  exports: [SecurityScannerService]
})
export class ScannerModule {}
