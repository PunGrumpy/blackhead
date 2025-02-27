import { PartialType } from '@nestjs/swagger'
import { CreateUserTypeDto } from './create-user-type.dto'

export class UpdateUserTypeDto extends PartialType(CreateUserTypeDto) {}
