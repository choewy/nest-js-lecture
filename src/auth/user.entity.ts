import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
}
