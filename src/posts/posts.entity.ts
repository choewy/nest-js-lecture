import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column('text')
  content: string;

  @Column('varchar')
  image_url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: null;

  @JoinColumn()
  user: { user_id: string };

  @JoinColumn()
  likes: [];
}
