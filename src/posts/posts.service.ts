import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCreateDto } from './dto/post-create.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { PostsEntity } from './posts.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsRepository)
    private readonly postsRepository: PostsRepository,
  ) {}

  async getPosts(): Promise<PostsEntity[]> {
    return await this.postsRepository.getPosts();
  }

  async getPost(postId: number): Promise<PostsEntity> {
    return await this.postsRepository.getPost(postId);
  }

  async createPost(postCreateDto: PostCreateDto): Promise<void> {
    await this.postsRepository.createPost(postCreateDto);
  }

  async updatePost(
    postId: number,
    postUpdateDto: PostUpdateDto,
  ): Promise<void> {
    await this.updatePost(postId, postUpdateDto);
  }

  async deletePost(postId: number): Promise<void> {
    await this.deletePost(postId);
  }
}
