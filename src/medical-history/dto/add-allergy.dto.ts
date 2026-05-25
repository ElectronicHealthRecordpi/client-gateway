import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const SEVERITY_LEVEL = ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'] as const;

export class AddAllergyDto {
  @IsString()
  @IsNotEmpty()
  allergen!: string;

  @IsString()
  @IsOptional()
  reaction?: string;

  @IsEnum(SEVERITY_LEVEL)
  @IsOptional()
  severity?: (typeof SEVERITY_LEVEL)[number];

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  @IsOptional()
  diagnosedAt?: string;
}
