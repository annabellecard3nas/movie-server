import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Movie, User } from './index';

@Entity() //bookmark entity
export class BookmarkSaw {
  @PrimaryGeneratedColumn()
  id: number;


  // Many bookmarks belong to ONE user
  @ManyToOne(() => User, (user) => user.bookmarkSaw, { onDelete: 'CASCADE' })
  user: User;

  // Many bookmarks can belong to ONE movie
  @ManyToOne(() => Movie, (movie) => movie.bookmarkSaw, { onDelete: 'CASCADE' }) 
  movie: Movie;
}
