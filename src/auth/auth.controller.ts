import { Controller, Get, Post, Body,Request, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Public } from './auth.decorator';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly usersService:UsersService) {}
  @Public()
  @Post('login')
  signIn(@Body() login:Record<string, any>) {
    return this.authService.signIn(login.name, login.password);
  }
 
 











}
