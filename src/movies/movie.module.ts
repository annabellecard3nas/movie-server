import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule],
  controllers: [MovieController], ///fichier module //les controleur servent a definir les routes donc https:// get post ou  put
  providers: [MovieService], /////c'est le fichier service /// les controllers l'utiliser pour gerer le cote logic
})

//important d'exporter sinon il sera accessible que dans ce module et dans ce fichier
export class MovieModule {}
