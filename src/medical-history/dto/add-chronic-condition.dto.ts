import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

const CONDITION_STATUS = ['ACTIVE', 'RESOLVED', 'CHRONIC'] as const;
const SEVERITY_LEVEL = ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'] as const;

export class AddChronicConditionDto {
  @IsUUID()
  @IsOptional()
  diseaseId?: string;

  @IsString()
  @IsOptional()
  conditionName?: string;

  @IsDateString()
  @IsOptional()
  diagnosisDate?: string;

  @IsString()
  @IsOptional()
  treatmentPlan?: string;

  @IsString()
  @IsOptional()
  monitoringNotes?: string;

  @IsEnum(CONDITION_STATUS)
  @IsOptional()
  status?: (typeof CONDITION_STATUS)[number];

  @IsEnum(SEVERITY_LEVEL)
  @IsOptional()
  severity?: (typeof SEVERITY_LEVEL)[number];
}
