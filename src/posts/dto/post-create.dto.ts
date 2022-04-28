import { IsNotEmpty, IsString } from 'class-validator';

export class PostCreateDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  image: File;
}
