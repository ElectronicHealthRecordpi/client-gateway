import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { catchError } from 'rxjs';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@UseGuards(AuthGuard, RoleGuard)
@Controller('specialty')
export class SpecialtyController {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }

    @Roles('ADMIN')
    @Post()
    create(@Body() body: CreateSpecialtyDto) {
        return this.client.send({ cmd: 'create-specialty' }, body).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get()
    findAll() {
        return this.client.send({ cmd: 'find-all-specialties' }, {}).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN', 'DOCTOR', 'PATIENT')
    @Get(':id')
    findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client.send({ cmd: 'find-one-specialty' }, { id }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN')
    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
        @Body() body: UpdateSpecialtyDto,
    ) {
        return this.client.send({ cmd: 'update-specialty' }, { id, ...body }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }

    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.client.send({ cmd: 'remove-specialty' }, { id }).pipe(
            catchError(err => { throw new RpcException(err) }),
        );
    }
}

