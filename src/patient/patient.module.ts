import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [PatientController],
  imports: [
    NatsModule
  ],
})
export class PatientModule { }
