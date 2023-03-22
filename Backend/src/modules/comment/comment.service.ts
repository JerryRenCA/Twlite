import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import type { FindOptionsWhere } from 'typeorm';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

import type { PageDto } from '../../common/dto/page.dto';
import { FileNotImageException } from '../../exceptions';
import { IFile } from '../../interfaces';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { ValidatorService } from '../../shared/services/validator.service';

import type { CommentDto } from './dtos/comment.dto';
import type { CommentsPageOptionsDto } from './dtos/comments-page-options.dto';
import { CommentEntity } from './comment.entity';
import { CommentNewDto } from './dtos/comment-new.dto';
import { TopicEntity } from '../topic/topic.entity';
import { TopicService } from '../topic/topic.service';


@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    private topicService: TopicService,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
    private commandBus: CommandBus,
  ) {}

  async createComment(    commentNewDto: CommentNewDto,userId:Uuid,
    file?: IFile): Promise<CommentEntity>{
      const topic_id=commentNewDto.topicId;
      const topic= await this.topicService.getTopic(topic_id)

      if(topic==null){
        throw new Error();
      }

      const comment = this.commentRepository.create({...commentNewDto,userId});

      await this.commentRepository.save(comment);
      return comment;
  }
  /**
   * Find single comment
   */
  findOne(findData: FindOptionsWhere<CommentEntity>): Promise<CommentEntity | null> {
    return this.commentRepository.findOneBy(findData);
  }

  async getComments(
    pageOptionsDto: CommentsPageOptionsDto,
  ): Promise<PageDto<CommentDto>> {
    console.log('all comments:',JSON.stringify(pageOptionsDto))
    const queryBuilder = this.commentRepository.createQueryBuilder('comment');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }
  async getTopicComments(
    pageOptionsDto: CommentsPageOptionsDto,
    topicId:Uuid
  ): Promise<PageDto<CommentDto>> {
    console.log('topic comments:', JSON.stringify(pageOptionsDto),topicId)
    const queryBuilder = this.commentRepository.createQueryBuilder('comment');
    queryBuilder.where('comment.topic_id=:topicId',{topicId})
    queryBuilder.addOrderBy("created_at",'DESC')
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }
  async getComment(commentId: Uuid): Promise<CommentDto> {
    const queryBuilder = this.commentRepository.createQueryBuilder('comment');

    queryBuilder.where('comment.id = :commentId', { commentId });

    const commentEntity = await queryBuilder.getOne();

    if (!commentEntity) {
      throw new Error();
    }

    return commentEntity.toDto();
  }
}
