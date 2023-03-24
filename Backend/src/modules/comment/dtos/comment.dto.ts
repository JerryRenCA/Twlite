import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import type { CommentEntity } from '../comment.entity';

// TODO, remove this class and use constructor's second argument's type
export type CommentDtoOptions = Partial<{ isActive: boolean }>;

export class CommentDto extends AbstractDto {

  @ApiPropertyOptional()
  content?: string;

  @ApiPropertyOptional()
  topicId?: string;
  @ApiPropertyOptional()
  userName?: string;
  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  avatar?: string;

  constructor(comment: CommentEntity, options?: CommentDtoOptions) {
    super(comment);
    this.content = comment.content;
    this.topicId=comment.topicId;
    if (comment.user) {
      this.avatar = comment.user.avatar;
      this.userId = comment.user.id;
      this.userName = comment.user.firstName + ":" + comment.user.lastName;
    }
  }
}
