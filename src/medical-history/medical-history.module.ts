import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { MedicalHistoryController } from './medical-history.controller';

@Module({
  imports: [NatsModule],
  controllers: [MedicalHistoryController],
})
export class MedicalHistoryModule {}
