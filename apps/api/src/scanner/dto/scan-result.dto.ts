import { Scan, ScanStatus } from '@prisma/client'

export class ScanResultDto implements Partial<Scan> {
  id: string
  targetId: string
  userId: string
  apiKeyId?: string
  status: ScanStatus
  startTime: Date
  endTime?: Date
  riskScore?: number
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  vulnerabilities?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  target?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  report?: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  user?: any
}
