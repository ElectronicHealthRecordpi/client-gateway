import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NatsModule } from './transports/nats.module';
import { PatientModule } from './patient/patient.module';
import { GenderModule } from './gender/gender.module';
import { BloodTypeModule } from './blood-type/blood-type.module';

@Module({
  imports: [NatsModule, PatientModule, GenderModule, BloodTypeModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
