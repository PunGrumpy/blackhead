import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { UserTypes } from '../auth/decorators/user-types.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserTypeGuard } from '../auth/guards/user-type.guard'

import { CreateUserTypeDto } from './dto/create-user-type.dto'
import { UpdateUserTypeDto } from './dto/update-user-type.dto'
import { UserTypesService } from './user-types.service'

@Controller('user-types')
export class UserTypesController {
  private readonly userTypesService: UserTypesService

  constructor(userTypesService: UserTypesService) {
    this.userTypesService = userTypesService
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN')
  create(@Body() createUserTypeDto: CreateUserTypeDto) {
    return this.userTypesService.create(createUserTypeDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userTypesService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.userTypesService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN')
  update(
    @Param('id') id: string,
    @Body() updateUserTypeDto: UpdateUserTypeDto
  ) {
    return this.userTypesService.update(id, updateUserTypeDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN')
  remove(@Param('id') id: string) {
    return this.userTypesService.remove(id)
  }
}
