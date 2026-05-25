import { Module } from '@nestjs/common';
import { NatsModule } from 'src/transports/nats.module';
import { EncountersController } from './encounters.controller';

@Module({
    imports: [NatsModule],
    controllers: [EncountersController],
})
export class EncountersModule {}
