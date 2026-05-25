import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { DoctorController } from './doctor.controller';
import { SpecialtyController } from './specialty.controller';
import { OfficeController } from './office.controller';
import { DoctorScheduleController } from './doctor-schedule.controller';
import { DoctorSpecialtyController } from './doctor-specialty.controller';

@Module({
    imports: [NatsModule],
    controllers: [DoctorController, SpecialtyController, OfficeController, DoctorScheduleController, DoctorSpecialtyController],
})
export class DoctorModule { }
