import {
  Mutation,
  Query,
  Resolver,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';
import { CreatePostInput } from './dto/create-post.dto';
import { Author } from 'src/authors/entities/author.entity';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query((returns) => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Query((returns) => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findPostById(id);
  }

  @ResolveField((returns) => Author)
  author(@Parent() post: Post): Promise<Author> {
    return this.postsService.getAuthor(post.authorId);
  }

  @Mutation((returns) => Post)
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postsService.createPost(postInput);
  }
}
