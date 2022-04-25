import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity('User')
@Unique(['email'])
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ length: 60 })
  signupVerifyToken: string;
}
