// apps/api/src/scanner/scanner.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { ScanStatus, Target } from '@prisma/client'

import { LogsService } from '../logs/logs.service'
import { PrismaService } from '../prisma/prisma.service'
import { ScanResultDto } from './dto/scan-result.dto'
import { StartScanDto } from './dto/start-scan.dto'
import { ScannerFactory } from './scanners'
import { Vulnerability } from './scanners/base.scanner'

@Injectable()
export class SecurityScannerService {
  private readonly prisma: PrismaService
  private readonly logsService: LogsService
  private readonly scannerFactory: ScannerFactory

  constructor(
    prisma: PrismaService,
    logsService: LogsService,
    scannerFactory: ScannerFactory
  ) {
    this.prisma = prisma
    this.logsService = logsService
    this.scannerFactory = scannerFactory
  }

  async startScan(startScanDto: StartScanDto, userId: string) {
    const { targetId, apiKeyId } = startScanDto

    // Verify target exists
    const target = await this.prisma.target.findUnique({
      where: { id: targetId }
    })

    if (!target) {
      throw new NotFoundException(`Target with ID ${targetId} not found`)
    }

    // Create scan record
    const scan = await this.prisma.scan.create({
      data: {
        targetId,
        userId,
        apiKeyId,
        status: ScanStatus.PENDING
      }
    })

    // Log scan initiation
    await this.logsService.createLog({
      userId,
      scanId: scan.id,
      action: 'SCAN_STARTED',
      details: `Scan initiated for target: ${target.name}`
    })

    // Start scan process asynchronously
    this.runScan(scan.id, target)

    return scan
  }

  private async runScan(scanId: string, target: Target) {
    try {
      // Update scan status to running
      await this.prisma.scan.update({
        where: { id: scanId },
        data: { status: ScanStatus.RUNNING }
      })

      // Get appropriate scanner for target type
      const scanner = this.scannerFactory.getScanner(target.type)

      // Perform actual scan
      const scanResult = await scanner.scan(target.url)

      // Store vulnerabilities in database
      await this.saveVulnerabilities(scanId, scanResult.vulnerabilities)

      // Update scan with results
      await this.prisma.scan.update({
        where: { id: scanId },
        data: {
          status: ScanStatus.COMPLETED,
          endTime: new Date(),
          riskScore: scanResult.riskScore
        }
      })

      // Log scan completion
      const scan = await this.prisma.scan.findUnique({
        where: { id: scanId },
        include: { user: true }
      })

      if (!scan) {
        throw new NotFoundException(`Scan with ID ${scanId} not found`)
      }

      await this.logsService.createLog({
        userId: scan.userId,
        scanId: scan.id,
        action: 'SCAN_COMPLETED',
        details: `Scan completed for target: ${target.name} with risk score: ${scanResult.riskScore}`
      })
    } catch (error) {
      // Update scan status to failed
      await this.prisma.scan.update({
        where: { id: scanId },
        data: {
          status: ScanStatus.FAILED,
          endTime: new Date()
        }
      })

      // Log scan failure
      const scan = await this.prisma.scan.findUnique({
        where: { id: scanId },
        include: { user: true }
      })

      if (scan) {
        await this.logsService.createLog({
          userId: scan.userId,
          scanId: scan.id,
          action: 'SCAN_FAILED',
          details: `Scan failed for target: ${target.name}. Error: ${error.message}`
        })
      }
    }
  }

  private async saveVulnerabilities(
    scanId: string,
    vulnerabilities: Vulnerability[]
  ) {
    // Store vulnerabilities in database
    for (const vuln of vulnerabilities) {
      await this.prisma.vulnerability.create({
        data: {
          scanId,
          type: vuln.type,
          severity: vuln.severity,
          description: vuln.description,
          remediation: vuln.remediation
        }
      })
    }
  }

  async getScanById(id: string) {
    const scan = await this.prisma.scan.findUnique({
      where: { id },
      include: {
        target: true,
        vulnerabilities: true,
        report: true,
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

    if (!scan) {
      throw new NotFoundException(`Scan with ID ${id} not found`)
    }

    return scan as ScanResultDto
  }

  async getUserScans(userId: string) {
    const scans = await this.prisma.scan.findMany({
      where: { userId },
      include: {
        target: true,
        vulnerabilities: true,
        report: {
          select: {
            id: true,
            summary: true,
            generatedAt: true
          }
        }
      },
      orderBy: {
        startTime: 'desc'
      }
    })

    return scans as ScanResultDto[]
  }

  async cancelScan(id: string, userId: string) {
    const scan = await this.prisma.scan.findUnique({
      where: { id },
      include: { target: true }
    })

    if (!scan) {
      throw new NotFoundException(`Scan with ID ${id} not found`)
    }

    if (
      scan.status !== ScanStatus.PENDING &&
      scan.status !== ScanStatus.RUNNING
    ) {
      throw new Error('Cannot cancel a scan that is not pending or running')
    }

    const updatedScan = await this.prisma.scan.update({
      where: { id },
      data: {
        status: ScanStatus.FAILED,
        endTime: new Date()
      }
    })

    await this.logsService.createLog({
      userId,
      scanId: id,
      action: 'SCAN_CANCELLED',
      details: `Scan cancelled for target: ${scan.target.name}`
    })

    return updatedScan
  }
}
