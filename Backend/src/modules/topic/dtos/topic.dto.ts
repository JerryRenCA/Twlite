import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';
import type { TopicEntity } from '../topic.entity';

// TODO, remove this class and use constructor's second argument's type
export type TopicDtoOptions = Partial<{ isActive: boolean }>;

export class TopicDto extends AbstractDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  content?: string;

  constructor(topic: TopicEntity, options?: TopicDtoOptions) {
    super(topic);
    this.title = topic.title;
    this.content = topic.content;
  }
}
