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
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('appointments')
export class AppointmentsController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    // POST /api/appointments — PATIENT, DOCTOR or ADMIN creates an appointment
    @Roles('PATIENT', 'DOCTOR', 'ADMIN')
    @Post()
    create(@Body() body: CreateAppointmentDto, @Req() req: Request) {
        const user = req['user'] as { id: string; role: string };
        return this.client
            .send({ cmd: 'create-appointment' }, { ...body, userId: user.id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/appointments — ADMIN sees all appointments (paginated)
    @Roles('ADMIN')
    @Get()
    findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
        return this.client
            .send({ cmd: 'find-all-appointments' }, { page: Number(page) || 1, limit: Number(limit) || 10 })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/appointments/patient/:patientId
    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get('patient/:patientId')
    findByPatient(
        @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.client
            .send(
                { cmd: 'find-appointments-by-patient' },
                { patientId, page: Number(page) || 1, limit: Number(limit) || 10 },
            )
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/appointments/doctor/:doctorId
    @Roles('ADMIN', 'DOCTOR')
    @Get('doctor/:doctorId')
    findByDoctor(
        @Param('doctorId', new ParseUUIDPipe({ version: '4' })) doctorId: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.client
            .send(
                { cmd: 'find-appointments-by-doctor' },
                { doctorId, page: Number(page) || 1, limit: Number(limit) || 10 },
            )
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/appointments/:id
    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client
            .send({ cmd: 'find-one-appointment' }, { id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // PATCH /api/appointments/:id
    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: UpdateAppointmentDto,
    ) {
        return this.client
            .send({ cmd: 'update-appointment' }, { id, ...body })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // DELETE /api/appointments/:id — ADMIN hard delete
    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client
            .send({ cmd: 'remove-appointment' }, { id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // PATCH /api/appointments/:id/confirm — ADMIN, DOCTOR
    @Roles('ADMIN', 'DOCTOR')
    @Patch(':id/confirm')
    confirm(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client
            .send({ cmd: 'confirm-appointment' }, { id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // PATCH /api/appointments/:id/cancel — ADMIN, DOCTOR, PATIENT (own only)
    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Patch(':id/cancel')
    cancel(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body('reason') reason: string,
        @Req() req: Request,
    ) {
        const user = req['user'] as { id: string; role: string };
        return this.client
            .send(
                { cmd: 'cancel-appointment' },
                {
                    id,
                    reason: reason ?? 'Sin motivo especificado',
                    cancelledBy: user.id,
                    requestingUserId: user.id,
                    userRole: user.role,
                },
            )
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // PATCH /api/appointments/:id/complete — ADMIN, DOCTOR
    @Roles('ADMIN', 'DOCTOR')
    @Patch(':id/complete')
    complete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client
            .send({ cmd: 'complete-appointment' }, { id })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }

    // GET /api/appointments/availability?doctorId=X&scheduleId=Y&date=Z
    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get('schedule/availability')
    checkAvailability(
        @Query('doctorId') doctorId: string,
        @Query('scheduleId') scheduleId: string,
        @Query('date') date: string,
    ) {
        return this.client
            .send({ cmd: 'check-schedule-availability' }, { doctorId, scheduleId, date })
            .pipe(catchError((err) => { throw new RpcException(err); }));
    }
}
