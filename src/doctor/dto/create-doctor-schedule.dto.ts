import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export enum DaysOfWeek {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday',
}

export class CreateDoctorScheduleDto {
    @IsUUID()
    @IsNotEmpty()
    doctorId: string;

    @IsUUID()
    @IsNotEmpty()
    officeId: string;

    @IsEnum(DaysOfWeek)
    dayOfWeek: DaysOfWeek;

    @IsDateString()
    startTime: string;

    @IsDateString()
    endTime: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
