import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddSurgeryDto {
  @IsString()
  @IsNotEmpty()
  procedureName!: string;

  @IsDateString()
  @IsOptional()
  surgeryDate?: string;

  @IsString()
  @IsOptional()
  outcome?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
