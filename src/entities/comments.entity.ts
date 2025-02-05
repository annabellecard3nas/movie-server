import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Movie, User } from './index';

@Entity() //bookmark entity
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn() // Ajoute automatiquement la date et l'heure de création
  createdAt: Date;

  @Column()
  comment: string;

  @Column()
  grade: number;

  // Chaque commentaire appartient à UN SEUL film
  @ManyToOne(() => Movie, (movie) => movie.comments, { onDelete: 'CASCADE' })
  movie: Movie;

  // Chaque commentaire appartient à UN SEUL utilisateur
  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;
}
