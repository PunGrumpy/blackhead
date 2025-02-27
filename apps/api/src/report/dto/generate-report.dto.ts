import { IsNotEmpty, IsString } from 'class-validator'

export class GenerateReportDto {
  @IsNotEmpty()
  @IsString()
  scanId: string
}
