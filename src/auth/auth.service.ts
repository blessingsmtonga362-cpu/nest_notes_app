import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}


  async signIn(name:string, password:string) {
    const user = await this.usersService.findOne(name);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    } 
    const payload = { name: user.name, id: user.id, role: user.role ,password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }}