import { Injectable } from '@nestjs/common';
import { Post } from './posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.dto';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private authorsService: AuthorsService,
  ) {}
  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  async findPostById(id: number): Promise<Post> {
    return await this.postsRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAuthor(id: number): Promise<Author> {
    return await this.authorsService.findOne(id);
  }
  async createPost(post: CreatePostInput): Promise<Post> {
    const newPost = await this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }
}
