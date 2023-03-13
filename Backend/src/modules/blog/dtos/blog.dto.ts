import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import type { BlogEntity } from '../blog.entity';

// TODO, remove this class and use constructor's second argument's type
export type BlogDtoOptions = Partial<{ isActive: boolean }>;

export class BlogDto extends AbstractDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  content?: string;

  constructor(blog: BlogEntity, options?: BlogDtoOptions) {
    super(blog);
    this.title = blog.title;
    this.content = blog.content;
  }
}
