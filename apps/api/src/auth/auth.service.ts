import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

import { UsersService } from '../users/users.service'
import { LoginDto } from './dto/login.dto'
import { JwtPayload } from './interfaces/jwt-payload.interface'

@Injectable()
export class AuthService {
  private readonly usersService: UsersService
  private readonly jwtService: JwtService

  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService
    this.jwtService = jwtService
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }

    return null
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user = await this.validateUser(email, password)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      userType: user.userType.name
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType.name
      },
      accessToken: this.jwtService.sign(payload)
    }
  }
}
