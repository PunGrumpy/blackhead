import { Module } from '@nestjs/common'
import { LogsModule } from '../logs/logs.module'
import { ScannerController } from './scanner.controller'
import { SecurityScannerService } from './scanner.service'
import {
  NetworkScanner,
  ScannerFactory,
  WebApplicationScanner
} from './scanners'

@Module({
  imports: [LogsModule],
  providers: [
    SecurityScannerService,
    NetworkScanner,
    WebApplicationScanner,
    ScannerFactory
  ],
  controllers: [ScannerController],
  exports: [SecurityScannerService]
})
export class ScannerModule {}
