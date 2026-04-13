import { Catch, ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception instanceof RpcException) {
            const rpcError = exception.getError() as { status?: number; message?: string } | string;

            const statusCode =
                typeof rpcError === 'object' && rpcError?.status
                    ? rpcError.status
                    : HttpStatus.INTERNAL_SERVER_ERROR;

            const message =
                typeof rpcError === 'object' && rpcError?.message
                    ? rpcError.message
                    : rpcError;

            return response.status(statusCode).json({
                statusCode,
                message,
            });
        }

        if (
            typeof exception === 'object' &&
            !(exception instanceof HttpException) &&
            exception?.status &&
            exception?.message
        ) {
            return response.status(exception.status).json({
                statusCode: exception.status,
                message: exception.message,
            });
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const res = exception.getResponse();

            return response.status(status).json(res);
        }

        return response.status(500).json({
            statusCode: 500,
            message: 'Internal server error',
        });
    }
}