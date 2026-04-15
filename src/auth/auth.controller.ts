import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) { }

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    return this.client.send({ cmd: 'auth.register' }, body).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.client.send({ cmd: 'auth.login' }, body).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }

  @Post('verify-ci')
  verifyCi(@Body('ci') ci: string) {
    return this.client.send({ cmd: 'find-patient-by-ci' }, { ci }).pipe(
      catchError(err => { throw new RpcException(err) }),
    );
  }
}
