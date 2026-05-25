import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { catchError } from 'rxjs';

@UseGuards(AuthGuard, RoleGuard)
@Controller('patient')
export class PatientController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Roles('ADMIN', 'DOCTOR')
  @Post()
  create(@Body() body: CreatePatientDto) {
    return this.client.send({ cmd: 'create-patient' }, body).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get()
  findAll() {
    return this.client.send({ cmd: 'find-all-patients' }, {}).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.client.send({ cmd: 'find-one-patient' }, { id }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'DOCTOR', 'PATIENT')
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdatePatientDto,
  ) {
    return this.client.send({ cmd: 'update-patient' }, { id, ...body }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.client.send({ cmd: 'remove-patient' }, { id }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }
}
