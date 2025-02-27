import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { LogsModule } from './logs/logs.module'
import { PrismaModule } from './prisma/prisma.module'
import { ReportModule } from './report/report.module'
import { ScannerModule } from './scanner/scanner.module'
import { TargetsModule } from './targets/targets.module'
import { UserTypesModule } from './user-types/user-types.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10
      }
    ]),
    PrismaModule,
    PrismaModule,
    UserTypesModule,
    UsersModule,
    AuthModule,
    ScannerModule,
    TargetsModule,
    ReportModule,
    LogsModule
    // ApiKeysModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
