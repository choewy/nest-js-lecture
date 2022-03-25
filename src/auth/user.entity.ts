import { Board } from 'src/boards/board.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['userid'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: string;

  @Column()
  passwd: string;

  @Column()
  name: string;

  @OneToMany(() => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
