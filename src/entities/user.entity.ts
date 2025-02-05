import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookmarkSaw, BookmarkToSee } from './index';

@Entity() // represente la section user de ta base de donnees
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) //il peu que en  avoir un dans la database
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;



  // @CreateDateColumn({type:'timestamp',default: ()=> 'CURRENT_TIMESTAMP'})
  // createdAt: Date;

  @OneToMany(() => BookmarkSaw, (BookmarkSaw) => BookmarkSaw.user, {
    cascade: true,
  }) //Added @OneToMany() to define a one-to-many relationship. a user can have many movies with this bookmark
  bookmarkSaw: BookmarkSaw[]; //cascade: true ensures that if a User is deleted, their Bookmarks are also deleted.

  @OneToMany(() => BookmarkToSee, (BookmarkToSee) => BookmarkToSee.user, {
    cascade: true,
  })
  bookmarkToSee: BookmarkToSee[];
  comments: any;
}
