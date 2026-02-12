import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}  
 
  async make(createUserDto: CreateUserDto):Promise<User>{
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const user=this.userRepository.create({...createUserDto, password: hashedPassword});
    return this.userRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(name: string): Promise<User | null> {
    return this.userRepository.findOneBy({name});
  }

  async update(name: string, data: Partial<User>) {
    const user = await this.userRepository.findOneBy({name});
    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }
    if(data.password){
      const saltOrRounds = 10;
      data.password = await bcrypt.hash(data.password, saltOrRounds);
    }
    Object.assign(user, data);
    return this.userRepository.save(user); 
  }
 async delete(name: string){
  return await this.userRepository.delete({name});
 }

}
