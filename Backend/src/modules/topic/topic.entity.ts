import { UserEntity } from '../user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../constants';
import { UseDto, VirtualColumn } from '../../decorators';
import { PostEntity } from '../post/post.entity';

import type { TopicDtoOptions } from './dtos/topic.dto';

import { TopicDto } from './dtos/topic.dto';
import { ReplyEntity } from '../reply/reply.entity';

export interface ITopicEntity extends IAbstractEntity<TopicDto> {
  title: string;

  content: string;

}

@Entity({ name: 'topics' })
@UseDto(TopicDto)
export class TopicEntity
  extends AbstractEntity<TopicDto, TopicDtoOptions>
  implements ITopicEntity
{
  @Column({ type: 'uuid' })
  userId: Uuid;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.topics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => ReplyEntity, (replyEntity) => replyEntity.topic)
  replys: ReplyEntity[];

}
