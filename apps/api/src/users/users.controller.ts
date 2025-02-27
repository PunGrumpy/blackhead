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

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  private readonly usersService: UsersService

  constructor(usersService: UsersService) {
    this.usersService = usersService
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN')
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserTypeGuard)
  @UserTypes('ADMIN')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
