import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { catchError } from 'rxjs';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('doctor')
export class DoctorController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }

    @Roles('ADMIN')
    @Post()
    create(@Body() body: CreateDoctorDto) {
        return this.client.send({ cmd: 'create-doctor' }, body).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get()
    findAll() {
        return this.client.send({ cmd: 'find-all-doctors' }, {}).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client.send({ cmd: 'find-one-doctor' }, { id }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN', 'DOCTOR')
    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: UpdateDoctorDto,
    ) {
        return this.client.send({ cmd: 'update-doctor' }, { id, ...body }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client.send({ cmd: 'remove-doctor' }, { id }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }
}
