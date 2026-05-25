import {
    IsBoolean,
    IsDateString,
    IsEnum,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

const CONDITION_STATUS = ['ACTIVE', 'RESOLVED', 'CHRONIC'] as const;
const SEVERITY_LEVEL = ['LOW', 'MODERATE', 'HIGH', 'CRITICAL'] as const;
const ANTECEDENT_TYPE = [
    'PERSONAL_PATHOLOGICAL',
    'SURGICAL',
    'ALLERGIC',
    'FAMILY',
    'CHRONIC',
    'OTHER',
] as const;
const RECORD_TYPES = [
    'PATIENT_CONDITION',
    'ALLERGY',
    'SURGERY',
    'FAMILY_HISTORY',
    'MEDICAL_ANTECEDENT',
    'CHRONIC_CONDITION',
] as const;

export class UpdateMedicalHistoryRecordDto {
    @IsEnum(RECORD_TYPES)
    recordType!: (typeof RECORD_TYPES)[number];

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

    @IsString()
    @IsOptional()
    allergen?: string;

    @IsString()
    @IsOptional()
    reaction?: string;

    @IsString()
    @IsOptional()
    notes?: string;

    @IsDateString()
    @IsOptional()
    diagnosedAt?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsString()
    @IsOptional()
    procedureName?: string;

    @IsDateString()
    @IsOptional()
    surgeryDate?: string;

    @IsString()
    @IsOptional()
    outcome?: string;

    @IsString()
    @IsOptional()
    conditionName?: string;

    @IsString()
    @IsOptional()
    relationship?: string;

    @IsString()
    @IsOptional()
    details?: string;

    @IsEnum(ANTECEDENT_TYPE)
    @IsOptional()
    type?: (typeof ANTECEDENT_TYPE)[number];

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    observation?: string;

    @IsDateString()
    @IsOptional()
    recordedAt?: string;

    @IsString()
    @IsOptional()
    treatmentPlan?: string;

    @IsString()
    @IsOptional()
    monitoringNotes?: string;
}
