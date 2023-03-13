import { UserEntity } from '../user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../constants';
import { UseDto, VirtualColumn } from '../../decorators';
import { PostEntity } from '../post/post.entity';

import type { ReplyDtoOptions } from './dtos/reply.dto';

import { ReplyDto } from './dtos/reply.dto';
import { TopicEntity } from '../topic/topic.entity';

export interface IReplyEntity extends IAbstractEntity<ReplyDto> {
  title: string;

  content: string;

}

@Entity({ name: 'replys' })
@UseDto(ReplyDto)
export class ReplyEntity
  extends AbstractEntity<ReplyDto, ReplyDtoOptions>
  implements IReplyEntity
{
  @Column({ type: 'uuid' })
  userId: Uuid;
  @Column({ type: 'uuid' })
  topicId: Uuid;
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;



  
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.replys, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => TopicEntity, (topicEntity) => topicEntity.replys, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'topic_id' })
  topic: TopicEntity;
}
