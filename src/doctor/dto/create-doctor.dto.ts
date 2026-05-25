import { IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDoctorDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @Transform(({ value }) => value?.trim())
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    @Transform(({ value }) => value?.trim())
    lastName: string;

    @IsDateString()
    dateOfBirth: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(30)
    @Transform(({ value }) => value?.trim())
    licenseNumber: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}
