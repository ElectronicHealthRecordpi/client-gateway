import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import type { Request } from 'express';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { NATS_SERVICE } from 'src/config/services';
import { CreateEncounterDto } from './dto/create-encounter.dto';
import { UpdateEncounterDto } from './dto/update-encounter.dto';
import { SetVitalSignsDto } from './dto/set-vital-signs.dto';
import { AddDiagnosisDto } from './dto/add-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { AddTreatmentDto } from './dto/add-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('encounters')
export class EncountersController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

    // POST /api/encounters — DOCTOR or ADMIN creates an encounter
    @Roles('DOCTOR', 'ADMIN')
    @Post()
    create(@Body() body: CreateEncounterDto, @Req() req: Request) {
        const user = req['user'] as { id: string; role: string };
        return this.client
            .send({ cmd: 'create-encounter' }, { ...body, userId: user.id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/encounters — ADMIN sees all encounters (paginated)
    @Roles('ADMIN')
    @Get()
    findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
        return this.client
            .send({ cmd: 'find-all-encounters' }, { page: Number(page) || 1, limit: Number(limit) || 10 })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/encounters/patient/:patientId
    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get('patient/:patientId')
    findByPatient(
        @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.client
            .send(
                { cmd: 'find-encounters-by-patient' },
                { patientId, page: Number(page) || 1, limit: Number(limit) || 10 },
            )
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/encounters/doctor/:doctorId
    @Roles('ADMIN', 'DOCTOR')
    @Get('doctor/:doctorId')
    findByDoctor(
        @Param('doctorId', new ParseUUIDPipe({ version: '4' })) doctorId: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.client
            .send(
                { cmd: 'find-encounters-by-doctor' },
                { doctorId, page: Number(page) || 1, limit: Number(limit) || 10 },
            )
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/encounters/:id
    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client
            .send({ cmd: 'find-one-encounter' }, { id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // PATCH /api/encounters/:id
    @Roles('DOCTOR', 'ADMIN')
    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: UpdateEncounterDto,
    ) {
        return this.client
            .send({ cmd: 'update-encounter' }, { id, ...body })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // DELETE /api/encounters/:id — ADMIN hard delete
    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client
            .send({ cmd: 'remove-encounter' }, { id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // PATCH /api/encounters/:id/complete — DOCTOR or ADMIN
    @Roles('DOCTOR', 'ADMIN')
    @Patch(':id/complete')
    complete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client
            .send({ cmd: 'complete-encounter' }, { id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // PATCH /api/encounters/:id/cancel — DOCTOR or ADMIN
    @Roles('DOCTOR', 'ADMIN')
    @Patch(':id/cancel')
    cancel(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client
            .send({ cmd: 'cancel-encounter' }, { id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // Vital signs
    // ─────────────────────────────────────────────────────────────────────────────

    // POST /api/encounters/:id/vital-signs
    @Roles('DOCTOR', 'ADMIN')
    @Post(':id/vital-signs')
    setVitalSigns(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: SetVitalSignsDto,
    ) {
        return this.client
            .send({ cmd: 'set-vital-signs' }, { encounterId: id, ...body })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // Diagnoses
    // ─────────────────────────────────────────────────────────────────────────────

    // POST /api/encounters/:id/diagnoses
    @Roles('DOCTOR', 'ADMIN')
    @Post(':id/diagnoses')
    addDiagnosis(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: AddDiagnosisDto,
    ) {
        return this.client
            .send({ cmd: 'add-diagnosis' }, { encounterId: id, ...body })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // PATCH /api/encounters/:id/diagnoses/:diagnosisId
    @Roles('DOCTOR', 'ADMIN')
    @Patch(':id/diagnoses/:diagnosisId')
    updateDiagnosis(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Param('diagnosisId', new ParseUUIDPipe({ version: '4' })) diagnosisId: string,
        @Body() body: UpdateDiagnosisDto,
    ) {
        return this.client
            .send({ cmd: 'update-diagnosis' }, { encounterId: id, diagnosisId, ...body })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // DELETE /api/encounters/:id/diagnoses/:diagnosisId
    @Roles('DOCTOR', 'ADMIN')
    @Delete(':id/diagnoses/:diagnosisId')
    removeDiagnosis(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Param('diagnosisId', new ParseUUIDPipe({ version: '4' })) diagnosisId: string,
    ) {
        return this.client
            .send({ cmd: 'remove-diagnosis' }, { encounterId: id, diagnosisId })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // Treatments
    // ─────────────────────────────────────────────────────────────────────────────

    // POST /api/encounters/:id/treatments
    @Roles('DOCTOR', 'ADMIN')
    @Post(':id/treatments')
    addTreatment(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: AddTreatmentDto,
    ) {
        return this.client
            .send({ cmd: 'add-treatment' }, { encounterId: id, ...body })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // PATCH /api/encounters/:id/treatments/:treatmentId
    @Roles('DOCTOR', 'ADMIN')
    @Patch(':id/treatments/:treatmentId')
    updateTreatment(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Param('treatmentId', new ParseUUIDPipe({ version: '4' })) treatmentId: string,
        @Body() body: UpdateTreatmentDto,
    ) {
        return this.client
            .send({ cmd: 'update-treatment' }, { encounterId: id, treatmentId, ...body })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // DELETE /api/encounters/:id/treatments/:treatmentId
    @Roles('DOCTOR', 'ADMIN')
    @Delete(':id/treatments/:treatmentId')
    removeTreatment(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Param('treatmentId', new ParseUUIDPipe({ version: '4' })) treatmentId: string,
    ) {
        return this.client
            .send({ cmd: 'remove-treatment' }, { encounterId: id, treatmentId })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }
}
