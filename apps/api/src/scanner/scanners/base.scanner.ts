import { VulnerabilitySeverity } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'

export interface ScanResult {
  vulnerabilities: Vulnerability[]
  riskScore: number
}

export interface Vulnerability {
  type: string
  severity: VulnerabilitySeverity
  description: string
  remediation: string
}

export abstract class BaseScanner {
  private readonly prisma: PrismaService

  constructor(prisma: PrismaService) {
    this.prisma = prisma
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  abstract scan(target: string, options?: any): Promise<ScanResult>

  protected calculateRiskScore(vulnerabilities: Vulnerability[]): number {
    // Weight factors for different severity levels
    const severityWeights = {
      [VulnerabilitySeverity.CRITICAL]: 10,
      [VulnerabilitySeverity.HIGH]: 7,
      [VulnerabilitySeverity.MEDIUM]: 4,
      [VulnerabilitySeverity.LOW]: 1
    }

    if (vulnerabilities.length === 0) {
      return 0
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
    return Math.round((weightedSum / totalWeight) * 100)
  }
}
