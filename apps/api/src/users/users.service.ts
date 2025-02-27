import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  private readonly prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.prisma = prisma
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, name, userTypeId } = createUserDto

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new ConflictException('Email already in use')
    }

    // Check if user type exists
    const userType = await this.prisma.userType.findUnique({
      where: { id: userTypeId }
    })

    if (!userType) {
      throw new NotFoundException(`User type with ID ${userTypeId} not found`)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        userTypeId
      },
      include: {
        userType: true
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        userType: true
      }
    })
    return users.map(({ password, ...rest }) => rest)
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userType: true
      }
    })
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        userType: true
      }
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    const data: Partial<CreateUserDto> = { ...updateUserDto }

    // If password is being updated, hash it
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    // If userTypeId is provided, check if it exists
    if (updateUserDto.userTypeId) {
      const userType = await this.prisma.userType.findUnique({
        where: { id: updateUserDto.userTypeId }
      })

      if (!userType) {
        throw new NotFoundException(
          `User type with ID ${updateUserDto.userTypeId} not found`
        )
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        userType: true
      }
    })

    const { password, ...userWithoutPassword } = updatedUser
    return userWithoutPassword
  }

  async remove(id: string) {
    const user = await this.findOne(id)

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }

    await this.prisma.user.delete({
      where: { id }
    })
  }
}
