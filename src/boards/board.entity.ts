import { User } from 'src/auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board-status.enum';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: BoardStatus.PUBLIC })
  status: BoardStatus;

  @ManyToOne(() => User, (user) => user.boards, { eager: false })
  user: User;
}
