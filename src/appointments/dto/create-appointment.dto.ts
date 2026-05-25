import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateAppointmentDto {
    @IsUUID()
    @IsNotEmpty()
    patientId!: string;

    @IsUUID()
    @IsNotEmpty()
    doctorId!: string;

    @IsUUID()
    @IsNotEmpty()
    scheduleId!: string;

    @IsDateString()
    @IsNotEmpty()
    appointmentDate!: string;

    @IsDateString()
    @IsNotEmpty()
    startTime!: string;

    @IsDateString()
    @IsNotEmpty()
    endTime!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    reason!: string;
    @IsOptional()
    notes?: string;
}
