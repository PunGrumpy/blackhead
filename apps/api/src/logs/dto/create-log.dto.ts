import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateLogDto {
  @IsOptional()
  @IsString()
  userId?: string

  @IsOptional()
  @IsString()
  scanId?: string

  @IsNotEmpty()
  @IsString()
  action: string

  @IsOptional()
  @IsString()
  details?: string

  @IsOptional()
  @IsString()
  ipAddress?: string
}
