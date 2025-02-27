import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ScanStatus,
  Target,
  Vulnerability,
  VulnerabilitySeverity
} from '@prisma/client'

import { LogsService } from '../logs/logs.service'
import { PrismaService } from '../prisma/prisma.service'
import { ScanResultDto } from './dto/scan-result.dto'
import { StartScanDto } from './dto/start-scan.dto'

@Injectable()
export class SecurityScannerService {
  private readonly prisma: PrismaService
  private readonly logsService: LogsService

  constructor(prisma: PrismaService, logsService: LogsService) {
    this.prisma = prisma
    this.logsService = logsService
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

      // Simulate scan process
      // In a real implementation, this would integrate with actual scanning tools
      await new Promise(resolve => setTimeout(resolve, 5000))

      // Generate mock vulnerabilities based on target type
      const vulnerabilities = await this.generateMockVulnerabilities(
        scanId,
        target.type
      )

      // Calculate risk score based on vulnerabilities
      const riskScore = this.calculateRiskScore(vulnerabilities)

      // Update scan with results
      await this.prisma.scan.update({
        where: { id: scanId },
        data: {
          status: ScanStatus.COMPLETED,
          endTime: new Date(),
          riskScore
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
        details: `Scan completed for target: ${target.name} with risk score: ${riskScore}`
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

      if (!scan) {
        throw new NotFoundException(`Scan with ID ${scanId} not found`)
      }

      await this.logsService.createLog({
        userId: scan.userId,
        scanId: scan.id,
        action: 'SCAN_FAILED',
        details: `Scan failed for target: ${target.name}. Error: ${error.message}`
      })
    }
  }

  private async generateMockVulnerabilities(
    scanId: string,
    targetType: string
  ) {
    // This would be replaced with actual vulnerability detection logic
    const vulnerabilityTypes = {
      NETWORK: [
        {
          type: 'Open Ports',
          description: 'Unnecessary open ports detected',
          remediation: 'Close unused ports and implement firewall rules'
        },
        {
          type: 'Weak Encryption',
          description: 'Weak encryption protocols in use',
          remediation: 'Upgrade to modern encryption standards'
        }
      ],
      WEB_APPLICATION: [
        {
          type: 'SQL Injection',
          description: 'SQL injection vulnerability in login form',
          remediation: 'Implement parameterized queries'
        },
        {
          type: 'XSS',
          description: 'Cross-site scripting vulnerability in comments',
          remediation:
            'Implement input sanitization and Content-Security-Policy'
        },
        {
          type: 'CSRF',
          description: 'Cross-site request forgery in user settings',
          remediation: 'Implement anti-CSRF tokens'
        }
      ],
      DATABASE: [
        {
          type: 'Default Credentials',
          description: 'Database using default credentials',
          remediation:
            'Change default passwords and implement strong authentication'
        },
        {
          type: 'Excessive Privileges',
          description: 'User accounts have excessive privileges',
          remediation: 'Implement principle of least privilege'
        }
      ],
      SERVER: [
        {
          type: 'Outdated Software',
          description:
            'Server running outdated software with known vulnerabilities',
          remediation: 'Update to latest secure versions'
        },
        {
          type: 'Misconfigured Services',
          description: 'Services misconfigured exposing sensitive information',
          remediation: 'Review and secure service configurations'
        }
      ]
    }

    const selectedVulnerabilities =
      vulnerabilityTypes[targetType] || vulnerabilityTypes.NETWORK
    const severities = Object.values(VulnerabilitySeverity)

    const vulnerabilities: Vulnerability[] = []

    // Create 1-4 vulnerabilities with random severities
    const numVulnerabilities = Math.floor(Math.random() * 4) + 1

    for (let i = 0; i < numVulnerabilities; i++) {
      const vulnTemplate =
        selectedVulnerabilities[i % selectedVulnerabilities.length]
      const severity = severities[Math.floor(Math.random() * severities.length)]

      const vulnerability = await this.prisma.vulnerability.create({
        data: {
          scanId,
          type: vulnTemplate.type,
          severity,
          description: vulnTemplate.description,
          remediation: vulnTemplate.remediation
        }
      })

      vulnerabilities.push(vulnerability)
    }

    return vulnerabilities
  }

  private calculateRiskScore(vulnerabilities: Vulnerability[]): number {
    // Weight factors for different severity levels
    const severityWeights = {
      [VulnerabilitySeverity.CRITICAL]: 10,
      [VulnerabilitySeverity.HIGH]: 7,
      [VulnerabilitySeverity.MEDIUM]: 4,
      [VulnerabilitySeverity.LOW]: 1
    }

    // Calculate weighted sum of vulnerabilities
    let weightedSum = 0
    let totalWeight = 0

    for (const vuln of vulnerabilities) {
      const weight = severityWeights[vuln.severity]
      weightedSum += weight
      totalWeight += 10 // Maximum weight (CRITICAL)
    }

    // Return normalized score from 0-100
    if (totalWeight === 0) {
      return 0
    }
    return Math.round((weightedSum / totalWeight) * 100)
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
