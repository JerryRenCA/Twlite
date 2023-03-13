import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import type { CommentEntity } from '../comment.entity';

// TODO, remove this class and use constructor's second argument's type
export type CommentDtoOptions = Partial<{ isActive: boolean }>;

export class CommentDto extends AbstractDto {

  @ApiPropertyOptional()
  content?: string;

  constructor(comment: CommentEntity, options?: CommentDtoOptions) {
    super(comment);
    this.content = comment.content;
  }
}
