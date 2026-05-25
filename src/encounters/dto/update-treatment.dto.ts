import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTreatmentDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    description?: string;

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
