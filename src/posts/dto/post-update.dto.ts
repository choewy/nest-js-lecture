import { IsNotEmpty, IsString } from 'class-validator';

export class PostUpdateDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
