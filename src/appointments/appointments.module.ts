import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { AppointmentsController } from './appointments.controller';

@Module({
    imports: [NatsModule],
    controllers: [AppointmentsController],
})
export class AppointmentsModule { }
