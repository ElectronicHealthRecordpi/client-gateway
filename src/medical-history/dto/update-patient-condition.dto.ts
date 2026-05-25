import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

const CONDITION_STATUS = ['ACTIVE', 'RESOLVED', 'CHRONIC'] as const;
const SEVERITY_LEVEL = ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'] as const;

export class UpdatePatientConditionDto {
  @IsUUID()
  @IsOptional()
  diseaseId?: string;

  @IsString()
  @IsOptional()
  customConditionName?: string;

  @IsEnum(CONDITION_STATUS)
  @IsOptional()
  status?: (typeof CONDITION_STATUS)[number];

  @IsDateString()
  @IsOptional()
  diagnosisDate?: string;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsEnum(SEVERITY_LEVEL)
  @IsOptional()
  severity?: (typeof SEVERITY_LEVEL)[number];
}
