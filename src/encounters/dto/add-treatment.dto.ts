import { IsDateString, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class AddTreatmentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    description!: string;

    @IsString()
    @IsOptional()
    instructions?: string;

    @IsDateString()
    @IsOptional()
    startDate?: string;

    @IsDateString()
    @IsOptional()
    endDate?: string;
}
