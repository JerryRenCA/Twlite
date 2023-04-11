import { UserEntity } from '../user/user.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../constants';
import { UseDto, VirtualColumn } from '../../decorators';
import { PostEntity } from '../post/post.entity';

import type { TopicDtoOptions } from './dtos/topic.dto';

import { TopicDto } from './dtos/topic.dto';
import { ReplyEntity } from '../reply/reply.entity';
import { CommentEntity } from '../comment/comment.entity';

export interface ITopicEntity extends IAbstractEntity<TopicDto> {
  title: string;
  content?: string;

}

@Entity({ name: 'topics' })
@UseDto(TopicDto)
export class TopicEntity
  extends AbstractEntity<TopicDto, TopicDtoOptions>
  implements ITopicEntity
{

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  content?: string;

  @Column({ nullable: false })
  contentType: string;

  @Column({ nullable: true })
  picFile?: string;

  @Column({ type: 'uuid' })
  userId: Uuid;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.topics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'uuid',nullable: true  })
  parentId?: Uuid;
  @ManyToOne(() => TopicEntity, (topicEntity) => topicEntity.children)
  @JoinColumn({ name: 'parent_id' })
  parent: TopicEntity[];

  @OneToMany(() => TopicEntity, (topicEntity) => topicEntity.parent)
  children: TopicEntity[];

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.topic)
  comments: CommentEntity[];

}
