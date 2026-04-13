import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [UserController],
  imports: [NatsModule],
})
export class UserModule { }
