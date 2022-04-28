import { EntityRepository, Repository } from 'typeorm';
import { PostCreateDto } from './dto/post-create.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { PostsEntity } from './posts.entity';

@EntityRepository(PostsEntity)
export class PostsRepository extends Repository<PostsEntity> {
  async getPosts(): Promise<PostsEntity[]> {
    return await this.find();
  }

  async getPost(postId: number): Promise<PostsEntity> {
    return await this.findOne({ post_id: postId });
  }

  async createPost(postCreateDto: PostCreateDto): Promise<PostsEntity> {
    const { content } = postCreateDto;
    const post = this.create({
      content,
      image_url: '',
    });
    await this.save(post);
    return post;
  }

  async updatePost(
    postId: number,
    postUpdateDto: PostUpdateDto,
  ): Promise<PostsEntity> {
    const { content } = postUpdateDto;
    const { raw } = await this.update({ post_id: postId }, { content });
    return raw;
  }

  async deletePost(postId: number): Promise<void> {
    await this.update({ post_id: postId }, { deletedAt: Date });
  }
}
