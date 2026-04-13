import { Controller, Get, Body, Patch, Param, Delete, Inject, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { catchError } from 'rxjs';

@UseGuards(AuthGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.client.send({ cmd: 'user.find.all' }, {}).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'PATIENT', 'DOCTOR')
  @Get(':patientId')
  findOne(@Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string) {
    return this.client.send({ cmd: 'user.find.one' }, { patientId }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'PATIENT')
  @Patch(':patientId')
  update(
    @Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.client.send({ cmd: 'user.update' }, { patientId, ...updateUserDto }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Roles('ADMIN', 'PATIENT')
  @Delete(':patientId')
  remove(@Param('patientId', new ParseUUIDPipe({ version: '4' })) patientId: string) {
    return this.client.send({ cmd: 'user.remove' }, { patientId }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }
}
