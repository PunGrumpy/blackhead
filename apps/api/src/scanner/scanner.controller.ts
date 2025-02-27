import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { StartScanDto } from './dto/start-scan.dto'
import { SecurityScannerService } from './scanner.service'

@Controller('scans')
export class ScannerController {
  private readonly scannerService: SecurityScannerService

  constructor(scannerService: SecurityScannerService) {
    this.scannerService = scannerService
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  startScan(@Body() startScanDto: StartScanDto, @Request() req) {
    return this.scannerService.startScan(startScanDto, req.user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserScans(@Request() req) {
    return this.scannerService.getUserScans(req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getScanById(@Param('id') id: string) {
    return this.scannerService.getScanById(id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  cancelScan(@Param('id') id: string, @Request() req) {
    return this.scannerService.cancelScan(id, req.user.id)
  }
}
