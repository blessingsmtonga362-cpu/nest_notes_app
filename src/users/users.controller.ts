import { Controller, Get, Post, Body, Patch, Param, Delete ,Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/auth.decorator';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/role.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.make(createUserDto);
  }
 //@Public() // was testing if the function is working before adding the auth and roles
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }
  
  @Get('name')
  findOne(@Request() req) {
    return this.usersService.findOne(req.user.name);
  }

  @Patch()
  update(@Request()req,@Body() updateUserDto: UpdateUserDto){
    return this.usersService.update(req.user.name,updateUserDto);
  }
 
  @Delete()
  delete(@Request() req){
    return this.usersService.delete(req.user.name);
  }
}
  

