import { Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { NATS_SERVICE } from 'src/config/services';

@UseGuards(AuthGuard, RoleGuard)
@Controller('doctor/:doctorId/specialty')
export class DoctorSpecialtyController {
    constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

    /** GET /api/doctor/:doctorId/specialty */
    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get()
    findAll(@Param('doctorId', new ParseUUIDPipe({ version: '4' })) doctorId: string) {
        return this.client
            .send({ cmd: 'find-doctor-specialties' }, { doctorId })
            .pipe(catchError(err => { throw new RpcException(err); }));
    }

    /** POST /api/doctor/:doctorId/specialty/:specialtyId */
    @Roles('ADMIN', 'DOCTOR')
    @Post(':specialtyId')
    assign(
        @Param('doctorId', new ParseUUIDPipe({ version: '4' })) doctorId: string,
        @Param('specialtyId', new ParseUUIDPipe({ version: '4' })) specialtyId: string,
    ) {
        return this.client
            .send({ cmd: 'assign-doctor-specialty' }, { doctorId, specialtyId })
            .pipe(catchError(err => { throw new RpcException(err); }));
    }

    /** DELETE /api/doctor/:doctorId/specialty/:specialtyId */
    @Roles('ADMIN', 'DOCTOR')
    @Delete(':specialtyId')
    remove(
        @Param('doctorId', new ParseUUIDPipe({ version: '4' })) doctorId: string,
        @Param('specialtyId', new ParseUUIDPipe({ version: '4' })) specialtyId: string,
    ) {
        return this.client
            .send({ cmd: 'remove-doctor-specialty' }, { doctorId, specialtyId })
            .pipe(catchError(err => { throw new RpcException(err); }));
    }
}
