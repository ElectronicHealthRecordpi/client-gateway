import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { catchError } from 'rxjs';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('office')
export class OfficeController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }

    @Roles('ADMIN')
    @Post()
    create(@Body() body: CreateOfficeDto) {
        return this.client.send({ cmd: 'create-office' }, body).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get()
    findAll() {
        return this.client.send({ cmd: 'find-all-offices' }, {}).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client.send({ cmd: 'find-one-office' }, { id }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN')
    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: UpdateOfficeDto,
    ) {
        return this.client.send({ cmd: 'update-office' }, { id, ...body }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client.send({ cmd: 'remove-office' }, { id }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }
}
