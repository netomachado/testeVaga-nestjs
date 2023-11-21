import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;
    //TODO - implementar a checagem do token, se se refere ao usuario
    return authToken;
  }
}
