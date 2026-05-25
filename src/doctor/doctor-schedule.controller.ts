import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { catchError } from 'rxjs';
import { CreateDoctorScheduleDto } from './dto/create-doctor-schedule.dto';
import { UpdateDoctorScheduleDto } from './dto/update-doctor-schedule.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('doctor-schedule')
export class DoctorScheduleController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }

    @Roles('ADMIN')
    @Post()
    create(@Body() body: CreateDoctorScheduleDto) {
        return this.client.send({ cmd: 'create-doctor-schedule' }, body).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get()
    findAll() {
        return this.client.send({ cmd: 'find-all-doctor-schedules' }, {}).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client.send({ cmd: 'find-one-doctor-schedule' }, { id }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN')
    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: UpdateDoctorScheduleDto,
    ) {
        return this.client.send({ cmd: 'update-doctor-schedule' }, { id, ...body }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client.send({ cmd: 'remove-doctor-schedule' }, { id }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }
}
