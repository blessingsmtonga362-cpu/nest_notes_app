import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './roles/role.guard';
import { DatabaseSeedModule } from './database.seed/database.seed.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [DatabaseSeedModule,UsersModule, TypeOrmModule.forRoot({
    type: 'postgres', 
    host: 'localhost',  
    port: 5432,
    username: 'bimto_gazza',
    password: '2745',
    database: 'program_1',
    autoLoadEntities: true,
    synchronize: true}), AuthModule, PostsModule

  ],
  controllers: [AppController],
  providers: [AppService,{provide:APP_GUARD,useClass:AuthGuard},{provide:APP_GUARD,useClass:RolesGuard}],
})
export class AppModule {
  constructor(private readonly dataSource:DataSource){}
}
