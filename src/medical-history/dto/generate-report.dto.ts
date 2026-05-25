import { IsEnum, IsOptional, IsUUID } from 'class-validator';

const REPORT_TYPES = [
  'CLINICAL_SUMMARY',
  'ANTECEDENTS',
  'ENCOUNTER_HISTORY',
  'CHRONIC_DISEASES',
] as const;

export class GenerateMedicalHistoryReportDto {
  @IsEnum(REPORT_TYPES)
  reportType!: (typeof REPORT_TYPES)[number];

  @IsUUID()
  @IsOptional()
  requestedByDoctorId?: string;
}
