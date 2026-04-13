import { Controller, Get, Post, Body, Param, Inject, UseGuards } from '@nestjs/common';
import { CreateGenderDto } from './dto/create-gender.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(AuthGuard, RoleGuard)
@Controller('gender')
export class GenderController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Roles('ADMIN')
  @Post()
  create(@Body() body: CreateGenderDto) {
    return this.client.send({ cmd: 'create-gender' }, body).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get()
  findAll() {
    return this.client.send({ cmd: 'find-all-genders' }, {}).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send({ cmd: 'find-one-gender' }, { id }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }
}
