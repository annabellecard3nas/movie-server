import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Import UserRepository
    JwtModule.register({})], 
    
  controllers: [AuthController], ///fichier module //les controleur servent a definir les routes donc https:// get post ou  put
  providers: [AuthService, JwtStrategy], /////c'est le fichier service /// les controllers l'utiliser pour gerer le cote logic
})

//important d'exporter sinon il sera accessible que dans ce module et dans ce fichier
export class AuthModule {}
