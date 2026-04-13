import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { NatsModule } from './transports/nats.module';
import { PatientModule } from './patient/patient.module';
import { GenderModule } from './gender/gender.module';
import { BloodTypeModule } from './blood-type/blood-type.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [NatsModule, AuthModule, UserModule, PatientModule, GenderModule, BloodTypeModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
