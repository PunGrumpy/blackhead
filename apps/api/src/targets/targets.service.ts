import { Injectable, NotFoundException } from '@nestjs/common'

import { LogsService } from '../logs/logs.service'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTargetDto } from './dto/create-target.dto'
import { UpdateTargetDto } from './dto/update-target.dto'

@Injectable()
export class TargetsService {
  private readonly prisma: PrismaService
  private readonly logsService: LogsService

  constructor(prisma: PrismaService, logsService: LogsService) {
    this.prisma = prisma
    this.logsService = logsService
  }

  async create(createTargetDto: CreateTargetDto, userId: string) {
    const target = await this.prisma.target.create({
      data: createTargetDto
    })

    await this.logsService.createLog({
      userId,
      action: 'TARGET_CREATED',
      details: `Created target: ${target.name}`
    })

    return target
  }

  findAll() {
    return this.prisma.target.findMany({
      orderBy: {
        name: 'asc'
      }
    })
  }

  async findOne(id: string) {
    const target = await this.prisma.target.findUnique({
      where: { id }
    })

    if (!target) {
      throw new NotFoundException(`Target with ID ${id} not found`)
    }

    return target
  }

  async update(id: string, updateTargetDto: UpdateTargetDto, userId: string) {
    const target = await this.findOne(id)

    const updatedTarget = await this.prisma.target.update({
      where: { id },
      data: updateTargetDto
    })

    await this.logsService.createLog({
      userId,
      action: 'TARGET_UPDATED',
      details: `Updated target: ${target.name}`
    })

    return updatedTarget
  }

  async remove(id: string, userId: string) {
    const target = await this.findOne(id)

    // Check if target has associated scans
    const scanCount = await this.prisma.scan.count({
      where: { targetId: id }
    })

    if (scanCount > 0) {
      throw new Error(`Cannot delete target with ${scanCount} associated scans`)
    }

    await this.prisma.target.delete({
      where: { id }
    })

    await this.logsService.createLog({
      userId,
      action: 'TARGET_DELETED',
      details: `Deleted target: ${target.name}`
    })
  }

  async getTargetScans(id: string) {
    const target = await this.findOne(id)
    if (!target) {
      throw new NotFoundException(`Target with ID ${id} not found`)
    }

    const scans = await this.prisma.scan.findMany({
      where: { targetId: id },
      include: {
        vulnerabilities: true,
        report: {
          select: {
            id: true,
            summary: true,
            generatedAt: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            userType: true
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      }
    })

    return scans
  }
}
