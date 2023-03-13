import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IFile } from 'interfaces';

import type { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants';
import {
  ApiFile,
  ApiPageOkResponse,
  Auth,
  AuthUser,
  UUIDParam,
} from '../../decorators';
import { UseLanguageInterceptor } from '../../interceptors/language-interceptor.service';
import { TranslationService } from '../../shared/services/translation.service';
import { PostDto } from '../post/dtos/post.dto';
import { PostPageOptionsDto } from '../post/dtos/post-page-options.dto';
import { PostService } from '../post/post.service';
import { UserEntity } from '../user/user.entity';
import { BlogEntity } from './blog.entity';
import { BlogService } from './blog.service';
import { BlogDto } from './dtos/blog.dto';
import { BlogNewDto } from './dtos/blog-new.dto';
import  { BlogPageOptionsDto } from './dtos/blogs-page-options.dto';

@Controller('blogs')
@ApiTags('blogs')
export class BlogController {
  constructor(
    private blogService: BlogService,

    private readonly translationService: TranslationService
  ) {}

  @Get()
  @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    type: BlogDto,
  })
  getBlogs(
    @Query()
    pageOptionsDto: BlogPageOptionsDto
  ): Promise<PageDto<BlogDto>> {
    return this.blogService.getBlogs(pageOptionsDto);
  }
  // @Get()
  // @Auth([RoleType.USER])
  // @UseLanguageInterceptor()
  // @ApiPageOkResponse({ type: PostDto })
  // async getblogs(
  //   @Query() postsPageOptionsDto: BlogPageOptionsDto,
  // ): Promise<PageDto<PostDto>|null> {
  //   return null;
  // }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get blogs list',
    type: BlogDto,
  })
  getBlog(@UUIDParam('id') blogId: Uuid): Promise<BlogDto> {
    return this.blogService.getBlog(blogId);
  }

  @Post('new')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BlogDto, description: 'Successfully Post new blog' })
  @ApiFile({ name: 'avatar' })
  async blogNew(
    @Body() blogNewDto: BlogNewDto,
    @AuthUser() user: UserEntity,
    @UploadedFile() file?: IFile
  ): Promise<BlogDto> {
    const createdBlog = await this.blogService.createBlog(
      blogNewDto,
      user.id,
      file
    );

    return createdBlog.toDto({
      isActive: true,
    });
  }
}
