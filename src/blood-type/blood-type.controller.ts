import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { CreateBloodTypeDto } from './dto/create-blood-type.dto';
import { UpdateBloodTypeDto } from './dto/update-blood-type.dto';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('blood-type')
export class BloodTypeController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Roles('ADMIN')
  @Post()
  create(@Body() body: CreateBloodTypeDto) {
    return this.client.send({ cmd: 'create-blood-type' }, body).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get()
  findAll() {
    return this.client.send({ cmd: 'find-all-blood-types' }, {}).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find-one-blood-type' }, { id }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateBloodTypeDto) {
    return this.client.send({ cmd: 'update-blood-type' }, { id: Number(id), ...body }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }
}
