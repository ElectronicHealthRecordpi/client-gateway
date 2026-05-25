import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { EpidemiologyController } from './epidemiology.controller';

@Module({
    imports: [NatsModule],
    controllers: [EpidemiologyController],
})
export class EpidemiologyModule { }
