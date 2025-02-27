import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class StartScanDto {
  @IsNotEmpty()
  @IsString()
  targetId: string

  @IsOptional()
  @IsString()
  apiKeyId?: string
}
