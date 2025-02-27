import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserTypeDto } from './dto/create-user-type.dto'
import { UpdateUserTypeDto } from './dto/update-user-type.dto'

@Injectable()
export class UserTypesService {
  private readonly prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.prisma = prisma
  }

  async create(createUserTypeDto: CreateUserTypeDto) {
    const { name } = createUserTypeDto

    // Check if user type already exists
    const existingType = await this.prisma.userType.findUnique({
      where: { name }
    })

    if (existingType) {
      throw new ConflictException(`User type '${name}' already exists`)
    }

    return this.prisma.userType.create({
      data: createUserTypeDto
    })
  }

  findAll() {
    return this.prisma.userType.findMany({
      orderBy: { name: 'asc' }
    })
  }

  async findOne(id: string) {
    const userType = await this.prisma.userType.findUnique({
      where: { id }
    })

    if (!userType) {
      throw new NotFoundException(`User type with ID ${id} not found`)
    }

    return userType
  }

  async findByName(name: string) {
    const userType = await this.prisma.userType.findUnique({
      where: { name }
    })

    if (!userType) {
      throw new NotFoundException(`User type '${name}' not found`)
    }

    return userType
  }

  async update(id: string, updateUserTypeDto: UpdateUserTypeDto) {
    // Check if user type exists
    await this.findOne(id)

    // If changing name, check if new name already exists
    if (updateUserTypeDto.name) {
      const existingType = await this.prisma.userType.findUnique({
        where: { name: updateUserTypeDto.name }
      })

      if (existingType && existingType.id !== id) {
        throw new ConflictException(
          `User type '${updateUserTypeDto.name}' already exists`
        )
      }
    }

    return this.prisma.userType.update({
      where: { id },
      data: updateUserTypeDto
    })
  }

  async remove(id: string) {
    // Check if user type exists
    await this.findOne(id)

    // Check if user type is in use
    const userCount = await this.prisma.user.count({
      where: { userTypeId: id }
    })

    if (userCount > 0) {
      throw new ConflictException(
        `Cannot delete user type with ${userCount} associated users`
      )
    }

    return this.prisma.userType.delete({
      where: { id }
    })
  }
}
