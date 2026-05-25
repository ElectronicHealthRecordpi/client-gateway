import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddFamilyHistoryDto {
  @IsUUID()
  @IsOptional()
  diseaseId?: string;

  @IsString()
  @IsOptional()
  conditionName?: string;

  @IsString()
  @IsNotEmpty()
  relationship!: string;

  @IsString()
  @IsOptional()
  details?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
