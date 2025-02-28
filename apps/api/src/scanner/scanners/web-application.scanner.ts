import * as url from 'node:url'
import { Injectable } from '@nestjs/common'
import { VulnerabilitySeverity } from '@prisma/client'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { BaseScanner, ScanResult, Vulnerability } from './base.scanner'

const DISALLOW_REGEX =
  /Disallow:\s*\/(admin|backup|config|user|private|assets\/config)/i
const SERVER_VERSION_REGEX = /[0-9]+\.[0-9]+\.[0-9]+/
const ENV_REGEX = /[A-Z_]+=.*password|secret|key|token/i

@Injectable()
export class WebApplicationScanner extends BaseScanner {
  async scan(target: string): Promise<ScanResult> {
    const vulnerabilities: Vulnerability[] = []

    try {
      // Basic web application scanning
      // In a production environment, you would use a more sophisticated scanner like OWASP ZAP, Burp Suite, etc.

      // 1. Basic security headers check
      const headerVulns = await this.checkSecurityHeaders(target)
      vulnerabilities.push(...headerVulns)

      // 2. Check for common web vulnerabilities
      // 2.1 XSS reflection test
      const xssVulns = await this.checkXSSVulnerability(target)
      vulnerabilities.push(...xssVulns)

      // 2.2 SQL Injection test
      const sqlVulns = await this.checkSQLInjection(target)
      vulnerabilities.push(...sqlVulns)

      // 2.3 Check for sensitive information exposure
      const infoVulns = await this.checkInfoExposure(target)
      vulnerabilities.push(...infoVulns)

      // 2.4 Check for security misconfigurations
      const misconfigVulns = await this.checkMisconfigurations(target)
      vulnerabilities.push(...misconfigVulns)

      // Additional checks can be added here
    } catch (error) {
      vulnerabilities.push({
        type: 'Scan Error',
        severity: VulnerabilitySeverity.LOW,
        description: `Error during web application scan: ${error.message}`,
        remediation:
          'Check if the web application is accessible and properly configured'
      })
    }

    return {
      vulnerabilities,
      riskScore: this.calculateRiskScore(vulnerabilities)
    }
  }

  private async checkSecurityHeaders(target: string): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = []

    try {
      const response = await axios.get(target, {
        validateStatus: () => true, // Accept any status code
        timeout: 5000,
        headers: {
          'User-Agent': 'BlackheadSecurityScanner/1.0'
        }
      })

      const headers = response.headers

      // Check for missing security headers
      if (!headers['strict-transport-security']) {
        vulnerabilities.push({
          type: 'Missing HSTS Header',
          severity: VulnerabilitySeverity.MEDIUM,
          description: 'HTTP Strict Transport Security header is missing',
          remediation:
            'Add the Strict-Transport-Security header with appropriate values'
        })
      }

      if (!headers['content-security-policy']) {
        vulnerabilities.push({
          type: 'Missing CSP Header',
          severity: VulnerabilitySeverity.MEDIUM,
          description: 'Content Security Policy header is missing',
          remediation:
            'Implement a Content Security Policy to prevent XSS attacks'
        })
      }

      if (!headers['x-content-type-options']) {
        vulnerabilities.push({
          type: 'Missing X-Content-Type-Options',
          severity: VulnerabilitySeverity.LOW,
          description: 'X-Content-Type-Options header is missing',
          remediation: 'Add X-Content-Type-Options: nosniff header'
        })
      }

      if (!headers['x-frame-options']) {
        vulnerabilities.push({
          type: 'Missing X-Frame-Options',
          severity: VulnerabilitySeverity.MEDIUM,
          description: 'X-Frame-Options header is missing (clickjacking risk)',
          remediation: 'Add X-Frame-Options header (DENY or SAMEORIGIN)'
        })
      }

      // Check for cookie security
      const cookies = headers['set-cookie'] || []
      for (const cookie of cookies) {
        if (!cookie.includes('HttpOnly')) {
          vulnerabilities.push({
            type: 'Insecure Cookies',
            severity: VulnerabilitySeverity.MEDIUM,
            description: 'Cookies are set without the HttpOnly flag',
            remediation:
              'Set the HttpOnly flag on cookies to prevent client-side access'
          })
          break
        }

        if (!cookie.includes('Secure') && target.startsWith('https')) {
          vulnerabilities.push({
            type: 'Insecure Cookies',
            severity: VulnerabilitySeverity.MEDIUM,
            description: 'Cookies are set without the Secure flag on HTTPS',
            remediation: 'Set the Secure flag on cookies for HTTPS sites'
          })
          break
        }

        if (!cookie.includes('SameSite')) {
          vulnerabilities.push({
            type: 'Insecure Cookies',
            severity: VulnerabilitySeverity.LOW,
            description: 'Cookies are set without the SameSite attribute',
            remediation:
              'Set the SameSite attribute on cookies to prevent CSRF attacks'
          })
          break
        }
      }
    } catch {
      return vulnerabilities
    }

    return vulnerabilities
  }

  private async checkXSSVulnerability(
    target: string
  ): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = []

    try {
      // Find forms and input fields to test for XSS
      const response = await axios.get(target, {
        validateStatus: () => true,
        timeout: 5000,
        headers: {
          'User-Agent': 'BlackheadSecurityScanner/1.0'
        }
      })

      if (
        response.status === 200 &&
        response.headers['content-type']?.includes('text/html')
      ) {
        const $ = cheerio.load(response.data)
        const forms = $('form')

        if (forms.length > 0) {
          // Test for reflection of input values
          const testPayload = `blackhead_test_${Date.now()}`

          // Get form action URLs
          const formUrls: string[] = []
          forms.each((_, form) => {
            const action = $(form).attr('action') || ''
            if (action) {
              const formUrl = action.startsWith('http')
                ? action
                : url.resolve(target, action)
              formUrls.push(formUrl)
            }
          })

          // Test a few form URLs with GET parameters
          for (const formUrl of formUrls.slice(0, 3)) {
            const testUrl = new URL(formUrl)
            // Add our payload to every possible parameter
            $('input').each((_, input) => {
              const name = $(input).attr('name')
              if (name) {
                testUrl.searchParams.append(name, testPayload)
              }
            })

            const xssResponse = await axios.get(testUrl.toString(), {
              validateStatus: () => true,
              timeout: 5000
            })

            if (
              xssResponse.status === 200 &&
              xssResponse.data.includes(testPayload) &&
              !xssResponse.headers['content-security-policy']
            ) {
              vulnerabilities.push({
                type: 'Potential XSS Vulnerability',
                severity: VulnerabilitySeverity.HIGH,
                description:
                  'Input values are reflected in the response without proper encoding',
                remediation:
                  'Implement proper output encoding and a Content Security Policy'
              })
              break
            }
          }
        }
      }
    } catch {
      return vulnerabilities
    }

    return vulnerabilities
  }

  private async checkSQLInjection(target: string): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = []

    try {
      // Test common entry points for SQL injection
      const testUrls = [
        `${target}?id=1'`,
        `${target}?page=1'`,
        `${target}?user=1'`,
        `${target}?search=1'`
      ]

      for (const testUrl of testUrls) {
        const response = await axios.get(testUrl, {
          validateStatus: () => true,
          timeout: 5000,
          headers: {
            'User-Agent': 'BlackheadSecurityScanner/1.0'
          }
        })

        const errorKeywords = [
          'SQL syntax',
          'mysql_fetch',
          'ORA-',
          'syntax error',
          'PostgreSQL',
          'sqlite3',
          'Microsoft SQL Server',
          'unclosed quotation mark'
        ]

        const responseData = response.data.toString()

        for (const keyword of errorKeywords) {
          if (responseData.includes(keyword)) {
            vulnerabilities.push({
              type: 'Potential SQL Injection',
              severity: VulnerabilitySeverity.CRITICAL,
              description:
                'The application may be vulnerable to SQL injection attacks',
              remediation:
                'Use parameterized queries or prepared statements for all database operations'
            })
            return vulnerabilities // Return on first detection
          }
        }
      }
    } catch {
      return vulnerabilities
    }

    return vulnerabilities
  }

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  private async checkInfoExposure(target: string): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = []

    try {
      // Check common paths for sensitive information
      const sensitivePaths = [
        '/robots.txt',
        '/.git/',
        '/.env',
        '/config',
        '/backup',
        '/phpinfo.php',
        '/server-status',
        '/wp-config.php',
        '/web.config',
        '/info.php'
      ]

      for (const path of sensitivePaths) {
        const checkUrl = new URL(path, target).toString()

        const response = await axios.get(checkUrl, {
          validateStatus: () => true,
          timeout: 3000,
          headers: {
            'User-Agent': 'BlackheadSecurityScanner/1.0'
          }
        })

        if (response.status === 200) {
          // Check if content looks like sensitive information
          const responseData = response.data.toString()

          if (path === '/robots.txt' && responseData.includes(DISALLOW_REGEX)) {
            // Not a vulnerability by itself, but check for sensitive paths
            if (responseData.match()) {
              vulnerabilities.push({
                type: 'Sensitive Information in robots.txt',
                severity: VulnerabilitySeverity.LOW,
                description:
                  'robots.txt file contains references to sensitive directories',
                remediation:
                  'Review robots.txt and ensure it does not disclose sensitive paths'
              })
            }
          } else if (
            path === '/.git/' &&
            (response.headers['content-type']?.includes('text/plain') ||
              responseData.includes('ref:'))
          ) {
            vulnerabilities.push({
              type: 'Git Repository Exposure',
              severity: VulnerabilitySeverity.HIGH,
              description:
                'Git repository files are accessible, potentially exposing source code and sensitive information',
              remediation:
                'Block access to .git directory in web server configuration'
            })
          } else if (path === '/.env' && responseData.match(ENV_REGEX)) {
            vulnerabilities.push({
              type: 'Environment File Exposure',
              severity: VulnerabilitySeverity.CRITICAL,
              description:
                '.env file is publicly accessible, exposing configuration and secrets',
              remediation:
                'Block access to .env files and ensure they are stored outside the web root'
            })
          } else if (
            (path === '/phpinfo.php' || path === '/info.php') &&
            responseData.includes('PHP Version')
          ) {
            vulnerabilities.push({
              type: 'PHP Information Exposure',
              severity: VulnerabilitySeverity.MEDIUM,
              description:
                'phpinfo() output is publicly accessible, revealing server configuration details',
              remediation:
                'Remove or restrict access to phpinfo files in production environments'
            })
          } else if (
            path === '/server-status' &&
            responseData.includes('Apache Server Status')
          ) {
            vulnerabilities.push({
              type: 'Server Status Exposure',
              severity: VulnerabilitySeverity.MEDIUM,
              description: 'Apache server status page is publicly accessible',
              remediation:
                'Restrict access to server-status page to trusted IPs only'
            })
          }
        }
      }
    } catch {
      return vulnerabilities
    }

    return vulnerabilities
  }

  private async checkMisconfigurations(
    target: string
  ): Promise<Vulnerability[]> {
    const vulnerabilities: Vulnerability[] = []

    try {
      // Check for directory listing
      const commonDirs = [
        '/images',
        '/css',
        '/js',
        '/uploads',
        '/assets',
        '/inc',
        '/includes'
      ]

      for (const dir of commonDirs) {
        const checkUrl = new URL(dir, target).toString()

        const response = await axios.get(checkUrl, {
          validateStatus: () => true,
          timeout: 3000,
          headers: {
            'User-Agent': 'BlackheadSecurityScanner/1.0'
          }
        })

        const responseData = response.data.toString()

        if (
          response.status === 200 &&
          response.headers['content-type']?.includes('text/html') &&
          (responseData.includes('Index of /') ||
            responseData.includes('Directory Listing'))
        ) {
          vulnerabilities.push({
            type: 'Directory Listing Enabled',
            severity: VulnerabilitySeverity.MEDIUM,
            description: `Directory listing is enabled for ${dir}`,
            remediation: 'Disable directory listing in web server configuration'
          })
          break // One finding is enough
        }
      }

      // Check for debug mode or error details
      const errorUrl = new URL(
        `/nonexistent_page_${Date.now()}`,
        target
      ).toString()

      const errorResponse = await axios.get(errorUrl, {
        validateStatus: () => true,
        timeout: 3000,
        headers: {
          'User-Agent': 'BlackheadSecurityScanner/1.0'
        }
      })

      const errorData = errorResponse.data.toString()

      if (errorResponse.status === 500 || errorResponse.status === 404) {
        const errorKeywords = [
          'stack trace',
          'Exception in',
          'Debug info',
          'SQL syntax',
          'Fatal error',
          'Warning:',
          'line [0-9]+ of file',
          'Call to undefined function'
        ]

        for (const keyword of errorKeywords) {
          if (errorData.match(new RegExp(keyword, 'i'))) {
            vulnerabilities.push({
              type: 'Detailed Error Messages',
              severity: VulnerabilitySeverity.MEDIUM,
              description:
                'Application reveals detailed error messages that could expose implementation details',
              remediation:
                'Disable debug mode and implement proper error handling in production'
            })
            break
          }
        }
      }

      // Check for server version information
      const serverHeader = (
        await axios.head(target, {
          validateStatus: () => true,
          timeout: 3000
        })
      ).headers.server

      if (serverHeader?.match(SERVER_VERSION_REGEX)) {
        vulnerabilities.push({
          type: 'Server Version Disclosure',
          severity: VulnerabilitySeverity.LOW,
          description: 'Web server reveals detailed version information',
          remediation:
            'Configure web server to hide version details in HTTP headers'
        })
      }
    } catch {
      return vulnerabilities
    }

    return vulnerabilities
  }
}
