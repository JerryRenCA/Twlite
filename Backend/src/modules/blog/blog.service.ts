import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import type { FindOptionsWhere } from 'typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { PageDto } from '../../common/dto/page.dto';
import { FileNotImageException } from '../../exceptions';
import { IFile } from '../../interfaces';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';

import type { BlogDto } from './dtos/blog.dto';
import type { BlogPageOptionsDto } from './dtos/blogs-page-options.dto';
import { BlogEntity } from './blog.entity';
import { BlogNewDto } from './dtos/blog-new.dto';


@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity)
    private blogRepository: Repository<BlogEntity>,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
    private commandBus: CommandBus,
  ) {}

  async createBlog(    blogNewDto: BlogNewDto,userId:Uuid,
    file?: IFile): Promise<BlogEntity>{
      const blog = this.blogRepository.create({...blogNewDto,userId});
      console.info('blog',blog)
      await this.blogRepository.save(blog);
      return blog;
  }
  /**
   * Find single blog
   */
  findOne(findData: FindOptionsWhere<BlogEntity>): Promise<BlogEntity | null> {
    return this.blogRepository.findOneBy(findData);
  }

  async getBlogs(
    pageOptionsDto: BlogPageOptionsDto,
  ): Promise<PageDto<BlogDto>> {
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getBlog(blogId: Uuid): Promise<BlogDto> {
    const queryBuilder = this.blogRepository.createQueryBuilder('blog');

    queryBuilder.where('blog.id = :blogId', { blogId });

    const blogEntity = await queryBuilder.getOne();

    if (!blogEntity) {
      throw new Error();
    }

    return blogEntity.toDto();
  }
}
