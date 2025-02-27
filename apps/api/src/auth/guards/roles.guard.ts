import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly reflector: Reflector

  constructor(reflector: Reflector) {
    this.reflector = reflector
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredUserTypes = this.reflector.getAllAndOverride<string[]>(
      'userTypes',
      [context.getHandler(), context.getClass()]
    )

    if (!requiredUserTypes) {
      return true
    }

    const { user } = context.switchToHttp().getRequest()
    return requiredUserTypes.some(type => user.userType === type)
  }
}
