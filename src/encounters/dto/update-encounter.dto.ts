import { IsDateString, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { EncounterType } from './create-encounter.dto';

export class UpdateEncounterDto {
    @IsEnum(EncounterType)
    @IsOptional()
    type?: EncounterType;

    @IsString()
    @IsOptional()
    @MinLength(5)
    reason?: string;

    @IsString()
    @IsOptional()
    notes?: string;

    /** ISO date string for when the illness/symptoms started. Must be in the past. */
    @IsDateString()
    @IsOptional()
    illnessStartDate?: string | null;

    /** ISO date string for when the patient recovered. Must be ≥ illnessStartDate and not in the future. */
    @IsDateString()
    @IsOptional()
    illnessEndDate?: string | null;
}
