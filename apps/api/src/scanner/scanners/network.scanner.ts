import { exec as execCallback } from 'node:child_process'
import * as util from 'node:util'
import { Injectable } from '@nestjs/common'
import { VulnerabilitySeverity } from '@prisma/client'
import { BaseScanner, ScanResult, Vulnerability } from './base.scanner'

const exec = util.promisify(execCallback)
const PORT_MATCH_REGEX = /\[(.+)\] (\d+) \((.+)\) open/

@Injectable()
export class NetworkScanner extends BaseScanner {
  async scan(target: string): Promise<ScanResult> {
    const vulnerabilities: Vulnerability[] = []

    try {
      const openPorts = await this.scanOpenPorts(target)
      if (openPorts.length > 0) {
        // Check for commonly insecure ports
        const insecurePorts = [
          21, 23, 53, 135, 137, 139, 445, 1433, 1434, 3306, 3389
        ]
        const foundInsecurePorts = openPorts.filter(port =>
          insecurePorts.includes(port)
        )

        if (foundInsecurePorts.length > 0) {
          vulnerabilities.push({
            type: 'Insecure Open Ports',
            severity: VulnerabilitySeverity.HIGH,
            description: `Potentially insecure ports are open: ${foundInsecurePorts.join(', ')}`,
            remediation:
              'Close unnecessary ports or restrict access with a firewall'
          })
        }

        // Check for too many open ports
        if (openPorts.length > 15) {
          vulnerabilities.push({
            type: 'Excessive Open Ports',
            severity: VulnerabilitySeverity.MEDIUM,
            description: `Large number of open ports (${openPorts.length}) increases attack surface`,
            remediation: 'Review and close unnecessary ports'
          })
        }
      }

      // Check SSL/TLS if applicable (port 443 open)
      if (openPorts.includes(443)) {
        const sslVulns = await this.checkSSLSecurity(target)
        vulnerabilities.push(...sslVulns)
      }
    } catch (error) {
      vulnerabilities.push({
        type: 'Scan Error',
        severity: VulnerabilitySeverity.LOW,
        description: `Error during network scan: ${error.message}`,
        remediation: 'Check target network accessibility and firewall rules'
      })
    }

    return {
      vulnerabilities,
      riskScore: this.calculateRiskScore(vulnerabilities)
    }
  }

  private async scanOpenPorts(target: string): Promise<number[]> {
    try {
      // In production, you would use a proper port scanner like nmap
      // This is a simplified example using netcat for basic port scanning
      const commonPorts =
        '21,22,23,25,53,80,110,135,139,143,443,445,993,995,1433,1434,3306,3389,5432,8080'
      const { stdout } = await exec(`nc -zv -w 1 ${target} ${commonPorts} 2>&1`)

      const openPorts: number[] = []
      const lines = stdout.split('\n')
      for (const line of lines) {
        const match = line.match(PORT_MATCH_REGEX)
        if (match) {
          openPorts.push(Number.parseInt(match[2], 10))
        }
      }

      return openPorts
    } catch {
      return []
    }
  }

  private async checkSSLSecurity(target: string): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = []

    try {
      // In production, use proper SSL checking tools like sslyze or OpenSSL
      const { stdout } = await exec(
        `openssl s_client -connect ${target}:443 -tls1_2 -status -tlsextdebug 2>&1`
      )

      // Check for weak ciphers
      if (
        stdout.includes('RC4') ||
        stdout.includes('DES') ||
        stdout.includes('MD5')
      ) {
        vulnerabilities.push({
          type: 'Weak SSL/TLS Ciphers',
          severity: VulnerabilitySeverity.HIGH,
          description: 'Server supports weak encryption ciphers',
          remediation:
            'Configure server to use only strong ciphers and disable weak protocols'
        })
      }

      // Check for outdated TLS versions
      if (
        stdout.includes('Protocol  : TLSv1') ||
        stdout.includes('Protocol  : SSLv3')
      ) {
        vulnerabilities.push({
          type: 'Outdated TLS Version',
          severity: VulnerabilitySeverity.MEDIUM,
          description: 'Server supports outdated TLS/SSL protocols',
          remediation:
            'Disable TLS 1.0 and 1.1, and enable only TLS 1.2 and above'
        })
      }

      // Check certificate validity
      if (
        stdout.includes('certificate has expired') ||
        stdout.includes('self signed certificate')
      ) {
        vulnerabilities.push({
          type: 'Invalid SSL Certificate',
          severity: VulnerabilitySeverity.MEDIUM,
          description:
            'Server uses an invalid, expired, or self-signed certificate',
          remediation:
            'Install a valid certificate from a trusted Certificate Authority'
        })
      }
    } catch (error) {
      vulnerabilities.push({
        type: 'SSL Scan Error',
        severity: VulnerabilitySeverity.LOW,
        description: `Error during SSL scan: ${error.message}`,
        remediation: 'Check target server accessibility'
      })
    }

    return vulnerabilities
  }
}
