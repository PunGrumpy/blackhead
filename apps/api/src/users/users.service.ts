import { Injectable } from '@nestjs/common'
import type { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  private readonly prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.prisma = prisma
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  findById(id: string): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id }
    })
  }
}
