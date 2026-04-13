import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    private readonly UNAUTHORIZED_ERROR = 'No autenticado';
    private readonly FORBIDDEN_ERROR = 'No tienes permisos para acceder a este recurso';

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!roles) return true;

        const { user } = context.switchToHttp().getRequest();
        if (!user) throw new UnauthorizedException(this.UNAUTHORIZED_ERROR);

        const hasRoles = roles.includes(user.role);
        if (!hasRoles) throw new ForbiddenException(this.FORBIDDEN_ERROR);
        return true;
    }
}
