import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { UserTypes } from '../auth/decorators/user-types.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserTypeGuard } from '../auth/guards/user-type.guard'

import { LogsService } from './logs.service'

@Controller('logs')
@UseGuards(JwtAuthGuard, UserTypeGuard)
@UserTypes('ADMIN', 'AUDITOR')
export class LogsController {
  private readonly logsService: LogsService

  constructor(logsService: LogsService) {
    this.logsService = logsService
  }

  @Get()
  findAll(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.logsService.findAll(limit, offset)
  }

  @Get('user/:userId')
  findByUser(
    @Param('userId') userId: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ) {
    return this.logsService.findByUser(userId, limit, offset)
  }

  @Get('scan/:scanId')
  findByScan(@Param('scanId') scanId: string) {
    return this.logsService.findByScan(scanId)
  }

  @Get('action/:action')
  findByAction(
    @Param('action') action: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number
  ) {
    return this.logsService.findByAction(action, limit, offset)
  }
}
