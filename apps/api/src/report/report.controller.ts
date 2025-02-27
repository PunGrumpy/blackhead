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
import { UserTypes } from '../auth/decorators/user-types.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserTypeGuard } from '../auth/guards/user-type.guard'

import { GenerateReportDto } from './dto/generate-report.dto'
import { ReportGeneratorService } from './report.service'

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportGeneratorService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async generateReport(
    @Body() generateReportDto: GenerateReportDto,
    @Request() req
  ) {
    return this.reportService.generateReport(generateReportDto, req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getReportById(@Param('id') id: string) {
    return this.reportService.getReportById(id)
  }

  @Get('scan/:scanId')
  @UseGuards(JwtAuthGuard)
  async getReportByScanId(@Param('scanId') scanId: string) {
    return this.reportService.getReportByScanId(scanId)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN', 'AUDITOR')
  async deleteReport(@Param('id') id: string, @Request() req) {
    return this.reportService.deleteReport(id, req.user.id)
  }
}
