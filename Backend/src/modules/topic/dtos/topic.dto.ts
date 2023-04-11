import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
// import { UserEntity } from '../../user/user.entity';
import { AbstractDto } from "../../../common/dto/abstract.dto";
import { RoleType } from "../../../constants";
import type { TopicEntity } from "../topic.entity";

// TODO, remove this class and use constructor's second argument's type
export type TopicDtoOptions = Partial<{ isActive: boolean }>;

export class TopicDto extends AbstractDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  content?: string;

  @ApiPropertyOptional()
  contentType?: string;

  @ApiPropertyOptional()
  picFile?: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  parentId?: string|null;

  @ApiPropertyOptional()
  userName?: string;

  @ApiPropertyOptional()
  avatar?: string;

  constructor(topic: TopicEntity, options?: TopicDtoOptions) {
    super(topic);
    this.title = topic.title;
    this.content = topic.content;
    this.picFile = topic.picFile;
    this.contentType = topic.contentType;
    this.parentId = topic.parentId;
    if (topic.user) {
      this.avatar = topic.user.avatar;
      this.userName = topic.user.firstName + ":" + topic.user.lastName;
      this.userId=topic.user.id
    }
  }
}
