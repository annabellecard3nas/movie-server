import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookmarkSaw,BookmarkToSee, Comments, Movie, User } from './entities';
import { UserModule } from './user/user.module';
import { BookmarkModuleSaw } from './bookmarkSaw/bookmarkSaw.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movies/movie.module';

dotenv.config();

@Module({
  imports: [
    //importation des modules pour utiliser TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME, //my MySQL username
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME, // my database name
      entities: [User, BookmarkSaw, BookmarkToSee, Movie, Comments], // mes entities here
      synchronize: true, //synchronise typeorm avec base de donne
    }),

    UserModule,
    AuthModule,
    BookmarkModuleSaw,
    MovieModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
