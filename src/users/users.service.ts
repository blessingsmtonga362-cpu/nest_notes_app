import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}  
 
  async make(createUserDto: CreateUserDto):Promise<User>{
    const user=this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(name: string): Promise<User | null> {
    return this.userRepository.findOneBy({name});
  }

  async update(name: string, data: Partial<User>) {
    await this.userRepository.update({name},data);
    return this.userRepository.findBy({name});  
  }
 async delete(name: string){
  return await this.userRepository.delete({name});
 }

}
