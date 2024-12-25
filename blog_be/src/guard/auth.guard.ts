import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('Cookies:', request.cookies);
        
        const token = request.cookies?.['jwt'];// Lấy JWT từ cookie
        if(!token) {
            throw new ForbiddenException('Bạn phải đăng nhập !!');
        } else {
            return true;
        }
    }
}