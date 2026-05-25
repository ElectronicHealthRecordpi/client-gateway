import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';

enum AppointmentStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
}

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    @IsEnum(AppointmentStatus)
    @IsOptional()
    status?: AppointmentStatus;
}
