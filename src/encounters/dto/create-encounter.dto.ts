import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MinLength,
} from 'class-validator';

export enum EncounterType {
    CONSULTATION = 'CONSULTATION',
    EMERGENCY = 'EMERGENCY',
    FOLLOW_UP = 'FOLLOW_UP',
    PREVENTIVE = 'PREVENTIVE',
    PRENATAL_CONTROL = 'PRENATAL_CONTROL',
    VACCINATION = 'VACCINATION',
}

export class CreateEncounterDto {
    @IsUUID()
    @IsNotEmpty()
    patientId!: string;

    @IsUUID()
    @IsNotEmpty()
    doctorId!: string;

    @IsDateString()
    @IsNotEmpty()
    encounterDate!: string;

    @IsEnum(EncounterType)
    @IsOptional()
    type?: EncounterType;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    reason!: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsUUID()
    @IsOptional()
    appointmentId?: string;
}
