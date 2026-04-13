import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom, catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    ) { }

    private readonly GENERIC_ERROR = 'No autorizado';

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException(this.GENERIC_ERROR);
        }

        try {
            const user = await firstValueFrom(
                this.client.send({ cmd: 'auth.verify.token' }, { token }).pipe(
                    catchError(() => {
                        throw new UnauthorizedException(this.GENERIC_ERROR);
                    }),
                ),
            );
            request['user'] = user;
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error;
            throw new UnauthorizedException(this.GENERIC_ERROR);
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
