import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import type { ReplyEntity } from '../reply.entity';

// TODO, remove this class and use constructor's second argument's type
export type ReplyDtoOptions = Partial<{ isActive: boolean }>;

export class ReplyDto extends AbstractDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  content?: string;

  constructor(reply: ReplyEntity, options?: ReplyDtoOptions) {
    super(reply);
    this.title = reply.title;
    this.content = reply.content;
  }
}
