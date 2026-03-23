import { Module } from '@nestjs/common';
import { BloodTypeController } from './blood-type.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [BloodTypeController],
  imports: [
    NatsModule
  ],
})
export class BloodTypeModule { }
