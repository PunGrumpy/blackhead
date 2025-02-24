import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('👤 Users')
export class UsersController {
  private readonly usersService: UsersService

  constructor(usersService: UsersService) {
    this.usersService = usersService
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User details' })
  findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id)
  }
}
