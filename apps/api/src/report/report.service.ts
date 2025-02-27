import { Injectable, NotFoundException } from '@nestjs/common'
import { VulnerabilitySeverity } from '@prisma/client'

import { LogsService } from '../logs/logs.service'
import { PrismaService } from '../prisma/prisma.service'
import { GenerateReportDto } from './dto/generate-report.dto'

@Injectable()
export class ReportGeneratorService {
  private readonly prisma: PrismaService
  private readonly logsService: LogsService

  constructor(prisma: PrismaService, logsService: LogsService) {
    this.prisma = prisma
    this.logsService = logsService
  }

  async generateReport(generateReportDto: GenerateReportDto, userId: string) {
    const { scanId } = generateReportDto

    // Check if scan exists and is completed
    const scan = await this.prisma.scan.findUnique({
      where: { id: scanId },
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
      throw new NotFoundException(`Scan with ID ${scanId} not found`)
    }

    if (scan.status !== 'COMPLETED') {
      throw new Error(
        `Cannot generate report for scan with status ${scan.status}`
      )
    }

    // Check if report already exists
    if (scan.report) {
      // If regenerating, delete existing report
      await this.prisma.report.delete({
        where: { id: scan.report.id }
      })
    }

    // Generate summary based on vulnerabilities
    const summary = this.generateSummary(scan)
    const riskAssessment = this.generateRiskAssessment(scan)
    const recommendations = this.generateRecommendations(scan)
    const complianceStatus = this.generateComplianceStatus(scan)

    // Create report
    const report = await this.prisma.report.create({
      data: {
        scanId,
        summary,
        riskAssessment,
        recommendations,
        complianceStatus
      }
    })

    await this.logsService.createLog({
      userId,
      scanId,
      action: 'REPORT_GENERATED',
      details: `Report generated for scan ID: ${scanId}`
    })

    return report
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private generateSummary(scan: any): string {
    const { target, vulnerabilities } = scan

    const criticalCount = vulnerabilities.filter(
      v => v.severity === VulnerabilitySeverity.CRITICAL
    ).length
    const highCount = vulnerabilities.filter(
      v => v.severity === VulnerabilitySeverity.HIGH
    ).length
    const mediumCount = vulnerabilities.filter(
      v => v.severity === VulnerabilitySeverity.MEDIUM
    ).length
    const lowCount = vulnerabilities.filter(
      v => v.severity === VulnerabilitySeverity.LOW
    ).length

    return `
Security scan performed on ${target.name} (${target.url}) identified a total of ${vulnerabilities.length} vulnerabilities:
- Critical: ${criticalCount}
- High: ${highCount}
- Medium: ${mediumCount}
- Low: ${lowCount}

The overall risk score is ${scan.riskScore}/100.
    `.trim()
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private generateRiskAssessment(scan: any): string {
    const { riskScore, vulnerabilities, target } = scan

    let riskLevel = 'Low'
    if (riskScore >= 75) {
      riskLevel = 'Critical'
    } else if (riskScore >= 50) {
      riskLevel = 'High'
    } else if (riskScore >= 25) {
      riskLevel = 'Medium'
    }

    const criticalVulns = vulnerabilities.filter(
      v => v.severity === VulnerabilitySeverity.CRITICAL
    )
    const highVulns = vulnerabilities.filter(
      v => v.severity === VulnerabilitySeverity.HIGH
    )

    let assessment = `Risk Assessment: ${riskLevel} (${riskScore}/100)\n\n`

    if (criticalVulns.length > 0) {
      assessment += 'Critical vulnerabilities require immediate attention:\n'
      for (const v of criticalVulns) {
        assessment += `- ${v.type}: ${v.description}\n`
      }
      assessment += '\n'
    }

    if (highVulns.length > 0) {
      assessment += 'High severity vulnerabilities:\n'
      for (const v of highVulns) {
        assessment += `- ${v.type}: ${v.description}\n`
      }
      assessment += '\n'
    }

    assessment += `The system's attack surface is primarily focused on its ${target.type.toLowerCase()} components.`

    return assessment
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private generateRecommendations(scan: any): string {
    const { vulnerabilities } = scan

    let recommendations = 'Remediation Recommendations:\n\n'

    const prioritizedVulns = [...vulnerabilities].sort((a, b) => {
      const severityOrder = {
        [VulnerabilitySeverity.CRITICAL]: 0,
        [VulnerabilitySeverity.HIGH]: 1,
        [VulnerabilitySeverity.MEDIUM]: 2,
        [VulnerabilitySeverity.LOW]: 3
      }

      return severityOrder[a.severity] - severityOrder[b.severity]
    })

    for (const v of prioritizedVulns) {
      recommendations += `${v.severity} - ${v.type}:\n`
      recommendations += `${v.description}\n`
      recommendations += `Recommendation: ${v.remediation}\n\n`
    }

    recommendations += `
General Recommendations:
1. Implement regular security scanning
2. Keep all software and dependencies updated
3. Follow security best practices for ${scan.target.type.toLowerCase()} security
4. Conduct security awareness training for development team
    `.trim()

    return recommendations
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private generateComplianceStatus(scan: any): string {
    // This would be expanded with actual compliance checks
    const hasHighSeverity = scan.vulnerabilities.some(
      v =>
        v.severity === VulnerabilitySeverity.CRITICAL ||
        v.severity === VulnerabilitySeverity.HIGH
    )

    if (hasHighSeverity) {
      return 'NON-COMPLIANT: Critical or high severity vulnerabilities found'
    }
    if (scan.vulnerabilities.length > 0) {
      return 'PARTIALLY COMPLIANT: Low or medium severity vulnerabilities detected'
    }
    return 'COMPLIANT: No vulnerabilities detected'
  }

  async getReportById(id: string) {
    const report = await this.prisma.report.findUnique({
      where: { id },
      include: {
        scan: {
          include: {
            target: true,
            vulnerabilities: true,
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                userType: true
              }
            }
          }
        }
      }
    })

    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`)
    }

    return report
  }

  async getReportByScanId(scanId: string) {
    const report = await this.prisma.report.findUnique({
      where: { scanId },
      include: {
        scan: {
          include: {
            target: true,
            vulnerabilities: true,
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                userType: true
              }
            }
          }
        }
      }
    })

    if (!report) {
      throw new NotFoundException(`Report for scan ID ${scanId} not found`)
    }

    return report
  }

  async deleteReport(id: string, userId: string) {
    const report = await this.getReportById(id)

    await this.prisma.report.delete({
      where: { id }
    })

    await this.logsService.createLog({
      userId,
      scanId: report.scanId,
      action: 'REPORT_DELETED',
      details: `Report ${id} deleted`
    })
  }
}
