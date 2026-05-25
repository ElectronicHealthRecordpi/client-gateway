import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import type { Request, Response } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { NATS_SERVICE } from 'src/config/services';
import {
  AddAllergyDto,
  AddChronicConditionDto,
  AddFamilyHistoryDto,
  AddMedicalAntecedentDto,
  AddSurgeryDto,
  CreatePatientConditionDto,
  GenerateMedicalHistoryReportDto,
  UpdateMedicalHistoryRecordDto,
  UpdatePatientConditionDto,
} from './dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('medical-history')
export class MedicalHistoryController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  private getUserId(req: Request): string {
    const user = req['user'] as { id?: string; sub?: string };
    return user?.id ?? user?.sub ?? '';
  }

  private getUserRole(req: Request): string {
    const user = req['user'] as { role?: string };
    return user?.role ?? '';
  }

  private enforcePatientScope(req: Request, patientId: string) {
    const role = this.getUserRole(req);
    const userId = this.getUserId(req);
    if (role === 'PATIENT' && userId !== patientId) {
      throw new ForbiddenException('No tienes permiso para consultar o modificar este historial');
    }
  }

  @Roles('ADMIN', 'DOCTOR')
  @Post('patient-conditions')
  createPatientCondition(@Body() body: CreatePatientConditionDto) {
    return this.client
      .send({ cmd: 'create-patient-condition' }, body)
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR')
  @Patch('patient-conditions/:id')
  updatePatientCondition(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdatePatientConditionDto,
  ) {
    return this.client
      .send({ cmd: 'update-patient-condition' }, { id, ...body })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR')
  @Patch('records/:id')
  updateMedicalHistoryRecord(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdateMedicalHistoryRecordDto,
  ) {
    return this.client
      .send({ cmd: 'update-medical-history-record' }, { id, ...body })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get('patients/:patientId')
  getPatientMedicalHistory(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Req() req: Request,
  ) {
    this.enforcePatientScope(req, patientId);

    return this.client
      .send({ cmd: 'get-patient-medical-history' }, { patientId })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get('patients/:patientId/chronic-conditions')
  getChronicConditions(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Req() req: Request,
  ) {
    this.enforcePatientScope(req, patientId);

    return this.client
      .send({ cmd: 'get-patient-chronic-conditions' }, { patientId })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR')
  @Post('patients/:patientId/allergies')
  addAllergy(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Body() body: AddAllergyDto,
  ) {
    return this.client
      .send({ cmd: 'add-patient-allergy' }, { patientId, ...body })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR')
  @Post('patients/:patientId/surgeries')
  addSurgery(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Body() body: AddSurgeryDto,
  ) {
    return this.client
      .send({ cmd: 'add-patient-surgery' }, { patientId, ...body })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR')
  @Post('patients/:patientId/family-history')
  addFamilyHistory(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Body() body: AddFamilyHistoryDto,
  ) {
    return this.client
      .send({ cmd: 'add-patient-family-history' }, { patientId, ...body })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR')
  @Post('patients/:patientId/medical-antecedents')
  addMedicalAntecedent(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Body() body: AddMedicalAntecedentDto,
  ) {
    return this.client
      .send({ cmd: 'add-patient-medical-antecedent' }, { patientId, ...body })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR')
  @Post('patients/:patientId/chronic-conditions')
  addChronicCondition(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Body() body: AddChronicConditionDto,
  ) {
    return this.client
      .send({ cmd: 'add-patient-chronic-condition' }, { patientId, ...body })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get('patients/:patientId/antecedents')
  getAntecedents(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Req() req: Request,
  ) {
    this.enforcePatientScope(req, patientId);

    return this.client
      .send({ cmd: 'get-patient-full-antecedents' }, { patientId })
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Post('patients/:patientId/reports/pdf')
  async generatePdfReport(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Body() body: GenerateMedicalHistoryReportDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.enforcePatientScope(req, patientId);

    const userId = this.getUserId(req);
    const role = this.getUserRole(req);

    const report = await firstValueFrom(
      this.client
        .send(
          { cmd: 'generate-medical-history-report' },
          {
            patientId,
            reportType: body.reportType,
            requestedByDoctorId: role === 'DOCTOR' ? userId : body.requestedByDoctorId,
          },
        )
        .pipe(catchError((err) => { throw new RpcException(err); })),
    );

    const content = Buffer.from(report.contentBase64, 'base64');

    res.setHeader('Content-Type', report.mimeType || 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=\"${report.fileName}\"`);
    return res.send(content);
  }

  @Roles('ADMIN', 'DOCTOR')
  @Get('diseases')
  searchDiseases(@Query('q') q: string, @Query('limit') limit?: string) {
    return this.client
      .send(
        { cmd: 'search-diseases' },
        { query: q ?? '', limit: limit ? parseInt(limit, 10) : 20 },
      )
      .pipe(catchError((err) => { throw new RpcException(err); }));
  }
}
