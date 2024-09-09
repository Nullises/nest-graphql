import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength, IsInt } from 'class-validator';

@InputType()
export class CreatePostInput {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Title must be at least 3 characters long',
  })
  @MaxLength(100)
  @Field()
  title: string;

  @Field({ nullable: true })
  content: string;

  @IsInt()
  @Field()
  authorId: number;
}
