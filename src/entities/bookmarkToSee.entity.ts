import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Movie, User } from './index';


@Entity() //bookmark entity
export class BookmarkToSee {
  @PrimaryGeneratedColumn()
  id: number;

  // Many bookmarks belong to ONE user
  @ManyToOne(() => User, (user) => user.bookmarkToSee, { onDelete: 'CASCADE' })
  user: User;

  //Many bookmarks can belong to ONE movie
  @ManyToOne(() => Movie, (movie) => movie.bookmarkToSee, { onDelete: 'CASCADE' })//Si un film est supprimé, tous ses bookmarks seront aussi supprimés.
  movie: Movie; 


}

