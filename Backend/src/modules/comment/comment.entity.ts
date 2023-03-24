import { UserEntity } from "../user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";

import type { IAbstractEntity } from "../../common/abstract.entity";
import { AbstractEntity } from "../../common/abstract.entity";
import { RoleType } from "../../constants";
import { UseDto, VirtualColumn } from "../../decorators";
import { PostEntity } from "../post/post.entity";

import type { CommentDtoOptions } from "./dtos/comment.dto";

import { CommentDto } from "./dtos/comment.dto";
import { TopicEntity } from "../topic/topic.entity";

export interface ICommentEntity extends IAbstractEntity<CommentDto> {
  content: string;
}

@Entity({ name: "comments" })
@UseDto(CommentDto)
export class CommentEntity
  extends AbstractEntity<CommentDto, CommentDtoOptions>
  implements ICommentEntity
{
  @Column({ nullable: false })
  content: string;

  @Column({ type: "uuid", nullable: false })
  topicId: Uuid;
  @ManyToOne(() => TopicEntity, (topicEntity) => topicEntity.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "topic_id" })
  topic: TopicEntity;

  @Column({ type: "uuid", nullable: false })
  userId: Uuid;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.comments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
