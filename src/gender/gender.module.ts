import { Module } from '@nestjs/common';
import { GenderController } from './gender.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [GenderController],
  providers: [],
  imports: [
    NatsModule
  ]
})
export class GenderModule { }
