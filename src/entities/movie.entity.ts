import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookmarkSaw, BookmarkToSee, Comments } from './index';

@Entity() //bookmark entity
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image: string;

  @Column()
  genre: string;

  //un  film peu appartenir a plusieur bookmark
  //en d'autres mots plusieurs bookmarks de divers utilisateur peuvent joindre un seul film
  // Un film peut être ajouté à plusieurs listes de films à voir (bookmarks)
  @OneToMany(() => BookmarkToSee, (bookmarkToSee) => bookmarkToSee.movie)
  bookmarkToSee: BookmarkToSee[];

  // Un film peut avoir plusieurs commentaires
  @OneToMany(() => Comments, (comment) => comment.movie)
  comments: Comments[];

  // Un film peut être ajouté à plusieurs listes de films vus (bookmarks)
  @OneToMany(() => BookmarkSaw, (bookmarkSaw) => bookmarkSaw.movie)
  bookmarkSaw: BookmarkSaw[];
}
