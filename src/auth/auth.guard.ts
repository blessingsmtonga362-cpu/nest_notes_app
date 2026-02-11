import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService,private reflector:Reflector){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const access_token=this.extractTokenFromHeader(request);
        if(!access_token){
            throw new UnauthorizedException();
        }
        try {
            const payload = this.jwtService.verify(access_token);
            request['user'] = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }}