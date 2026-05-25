import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { NatsModule } from './transports/nats.module';
import { PatientModule } from './patient/patient.module';
import { GenderModule } from './gender/gender.module';
import { BloodTypeModule } from './blood-type/blood-type.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { EncountersModule } from './encounters/encounters.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { EpidemiologyModule } from './epidemiology/epidemiology.module';

@Module({
  imports: [NatsModule, AuthModule, UserModule, PatientModule, GenderModule, BloodTypeModule, DoctorModule, AppointmentsModule, EncountersModule, MedicalHistoryModule, EpidemiologyModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
