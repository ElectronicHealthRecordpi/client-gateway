import { Catch, ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch()
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        console.log('EXCEPTION:', exception);

        // Caso: error estructurado desde microservicio
        if (
            typeof exception === 'object' &&
            exception?.status &&
            exception?.message
        ) {
            return response.status(exception.status).json({
                statusCode: exception.status,
                message: exception.message,
            });
        }

        // Caso: HttpException normal
        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const res = exception.getResponse();

            return response.status(status).json(res);
        }

        // Fallback
        return response.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
        });
    }
}