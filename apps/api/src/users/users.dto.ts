import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsStrongPassword, Matches } from 'class-validator'

const NAME_PATTERN = /^[a-zA-Z\s]*$/

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
    required: true
  })
  @IsString()
  @Matches(NAME_PATTERN, {
    message: 'Name should contain only alphabets and spaces'
  })
  name: string

  @ApiProperty({
    description: 'Email of the user',
    example: 'john@doe.com',
    required: true
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
    required: true
  })
  @IsStrongPassword()
  password: string
}
