import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { CreateLogDto } from './dto/create-log.dto'

@Injectable()
export class LogsService {
  private readonly prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.prisma = prisma
  }

  createLog(createLogDto: CreateLogDto) {
    return this.prisma.log.create({
      data: createLogDto
    })
  }

  findAll(limit = 100, offset = 0) {
    return this.prisma.log.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        timestamp: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            userType: true
          }
        },
        scan: {
          select: {
            id: true,
            target: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    })
  }

  findByUser(userId: string, limit = 100, offset = 0) {
    return this.prisma.log.findMany({
      where: { userId },
      take: limit,
      skip: offset,
      orderBy: {
        timestamp: 'desc'
      },
      include: {
        scan: {
          select: {
            id: true,
            target: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    })
  }

  findByScan(scanId: string) {
    return this.prisma.log.findMany({
      where: { scanId },
      orderBy: {
        timestamp: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            userType: true
          }
        }
      }
    })
  }

  findByAction(action: string, limit = 100, offset = 0) {
    return this.prisma.log.findMany({
      where: { action },
      take: limit,
      skip: offset,
      orderBy: {
        timestamp: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            userType: true
          }
        },
        scan: {
          select: {
            id: true,
            target: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    })
  }
}
