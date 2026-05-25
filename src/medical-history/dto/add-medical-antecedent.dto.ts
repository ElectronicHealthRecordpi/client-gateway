import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

const ANTECEDENT_TYPE = [
  'PERSONAL_PATHOLOGICAL',
  'SURGICAL',
  'ALLERGIC',
  'FAMILY',
  'CHRONIC',
  'OTHER',
] as const;

export class AddMedicalAntecedentDto {
  @IsEnum(ANTECEDENT_TYPE)
  type!: (typeof ANTECEDENT_TYPE)[number];

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  details!: string;

  @IsString()
  @IsOptional()
  observation?: string;

  @IsDateString()
  @IsOptional()
  recordedAt?: string;
}
