import { Module } from '@nestjs/common'
import { UserTypesController } from './user-types.controller'
import { UserTypesService } from './user-types.service'

@Module({
  providers: [UserTypesService],
  controllers: [UserTypesController],
  exports: [UserTypesService]
})
export class UserTypesModule {}
