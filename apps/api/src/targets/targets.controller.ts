import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards
} from '@nestjs/common'
import { UserTypes } from '../auth/decorators/user-types.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserTypeGuard } from '../auth/guards/user-type.guard'

import { CreateTargetDto } from './dto/create-target.dto'
import { UpdateTargetDto } from './dto/update-target.dto'
import { TargetsService } from './targets.service'

@Controller('targets')
export class TargetsController {
  private readonly targetsService: TargetsService

  constructor(targetsService: TargetsService) {
    this.targetsService = targetsService
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN', 'AUDITOR')
  create(@Body() createTargetDto: CreateTargetDto, @Request() req) {
    return this.targetsService.create(createTargetDto, req.user.id)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.targetsService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.targetsService.findOne(id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN', 'AUDITOR')
  update(
    @Param('id') id: string,
    @Body() updateTargetDto: UpdateTargetDto,
    @Request() req
  ) {
    return this.targetsService.update(id, updateTargetDto, req.user.id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN')
  remove(@Param('id') id: string, @Request() req) {
    return this.targetsService.remove(id, req.user.id)
  }

  @Get(':id/scans')
  @UseGuards(JwtAuthGuard)
  getTargetScans(@Param('id') id: string) {
    return this.targetsService.getTargetScans(id)
  }
}
