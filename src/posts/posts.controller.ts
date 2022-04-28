import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostCreateDto } from './dto/post-create.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { PostsEntity } from './posts.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(): Promise<PostsEntity[]> {
    return await this.postsService.getPosts();
  }

  @Get(':id')
  async getPost(@Param('id') postId: number): Promise<PostsEntity> {
    return await this.postsService.getPost(postId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @Bind(UploadedFile())
  async createPost(@Body() postCreateDto: PostCreateDto, file): Promise<void> {
    console.log(file);
    await this.postsService.createPost(postCreateDto);
  }

  @Patch(':id')
  async updatePost(
    @Param('id') postId: number,
    @Body() postUpdateDto: PostUpdateDto,
  ): Promise<void> {
    await this.postsService.updatePost(postId, postUpdateDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') postId: number): Promise<void> {
    await this.postsService.deletePost(postId);
  }
}
