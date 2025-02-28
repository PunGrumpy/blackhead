import { Injectable } from '@nestjs/common'
import { TargetType } from '@prisma/client'
import { NetworkScanner } from './network.scanner'
import { WebApplicationScanner } from './web-application.scanner'

@Injectable()
export class ScannerFactory {
  private readonly networkScanner: NetworkScanner
  private readonly webAppScanner: WebApplicationScanner

  constructor(
    networkScanner: NetworkScanner,
    webAppScanner: WebApplicationScanner
  ) {
    this.networkScanner = networkScanner
    this.webAppScanner = webAppScanner
  }

  getScanner(targetType: TargetType) {
    switch (targetType) {
      case TargetType.NETWORK:
        return this.networkScanner
      case TargetType.WEB_APPLICATION:
        return this.webAppScanner
      default:
        throw new Error(`Unsupported target type: ${targetType}`)
    }
  }
}

export * from './base.scanner'
export * from './network.scanner'
export * from './web-application.scanner'
