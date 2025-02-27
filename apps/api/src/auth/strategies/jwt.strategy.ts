import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { UsersService } from '../../users/users.service'
import { JwtPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly usersService: UsersService
  private readonly configService: ConfigService

  constructor(usersService: UsersService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    })

    this.usersService = usersService
    this.configService = configService
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findOne(payload.sub)

    if (!user) {
      throw new UnauthorizedException('User no longer exists')
    }

    return {
      id: user.id,
      email: user.email,
      userType: user.userType.name
    }
  }
}
