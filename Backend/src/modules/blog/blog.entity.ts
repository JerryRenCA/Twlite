import { UserEntity } from '../user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import type { IAbstractEntity } from '../../common/abstract.entity';
import { AbstractEntity } from '../../common/abstract.entity';
import { RoleType } from '../../constants';
import { UseDto, VirtualColumn } from '../../decorators';
import { PostEntity } from '../post/post.entity';

import type { BlogDtoOptions } from './dtos/blog.dto';

import { BlogDto } from './dtos/blog.dto';

export interface IBlogEntity extends IAbstractEntity<BlogDto> {
  title: string;

  content: string;

}

@Entity({ name: 'blogs' })
@UseDto(BlogDto)
export class BlogEntity
  extends AbstractEntity<BlogDto, BlogDtoOptions>
  implements IBlogEntity
{
  @Column({ type: 'uuid' })
  userId: Uuid;
  
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.blogs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

}
