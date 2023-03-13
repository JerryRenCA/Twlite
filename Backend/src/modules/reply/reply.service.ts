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

import type { ReplyDto } from './dtos/reply.dto';
import type { ReplysPageOptionsDto } from './dtos/replys-page-options.dto';
import { ReplyEntity } from './reply.entity';
import { ReplyNewDto } from './dtos/reply-new.dto';
import { TopicEntity } from '../topic/topic.entity';
import { TopicService } from '../topic/topic.service';
import { CommentService } from '../comment/comment.service';


@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(ReplyEntity)
    private replyRepository: Repository<ReplyEntity>,
    private topicService: TopicService,
    private commentService: CommentService,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
    private commandBus: CommandBus,
  ) {}

  async createReply(    replyNewDto: ReplyNewDto,userId:Uuid,
    file?: IFile): Promise<ReplyEntity>{
      const comment_id=replyNewDto.commentId;
      const comment= await this.topicService.getTopic(comment_id)

      if(comment==null){
        throw new Error();
      }

      const reply = this.replyRepository.create({...replyNewDto,userId});

      await this.replyRepository.save(reply);
      console.info('dto',reply.topic)
      console.info('dto',reply.user)
      return reply;
  }
  /**
   * Find single reply
   */
  findOne(findData: FindOptionsWhere<ReplyEntity>): Promise<ReplyEntity | null> {
    return this.replyRepository.findOneBy(findData);
  }

  async getReplys(
    pageOptionsDto: ReplysPageOptionsDto,
  ): Promise<PageDto<ReplyDto>> {
    console.log('all replys:',JSON.stringify(pageOptionsDto))
    const queryBuilder = this.replyRepository.createQueryBuilder('reply');
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }
  async getTopicReplys(
    pageOptionsDto: ReplysPageOptionsDto,
    topicId:Uuid
  ): Promise<PageDto<ReplyDto>> {
    console.log('topic replys:', JSON.stringify(pageOptionsDto),topicId)
    const queryBuilder = this.replyRepository.createQueryBuilder('reply');
    queryBuilder.where('reply.topic_id=:topicId',{topicId})
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }
  async getReply(replyId: Uuid): Promise<ReplyDto> {
    const queryBuilder = this.replyRepository.createQueryBuilder('reply');

    queryBuilder.where('reply.id = :replyId', { replyId });

    const replyEntity = await queryBuilder.getOne();

    if (!replyEntity) {
      throw new Error();
    }

    return replyEntity.toDto();
  }
}
