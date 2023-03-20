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

import type { TopicDto } from './dtos/topic.dto';
import type { TopicsPageOptionsDto } from './dtos/topics-page-options.dto';
import { TopicEntity } from './topic.entity';
import { TopicNewDto } from './dtos/topic-new.dto';


@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
    private commandBus: CommandBus,
  ) {}

  async createTopic(    topicNewDto: TopicNewDto,userId:Uuid,
    file?: IFile): Promise<TopicEntity>{
      const topic = this.topicRepository.create({...topicNewDto,userId});
      console.info('topic',topic)
      await this.topicRepository.save(topic);
      return topic;
  }
  /**
   * Find single topic
   */
  findOne(findData: FindOptionsWhere<TopicEntity>): Promise<TopicEntity | null> {
    return this.topicRepository.findOneBy(findData);
  }

  async getTopics(
    pageOptionsDto: TopicsPageOptionsDto,
  ): Promise<PageDto<TopicDto>> {
    const queryBuilder = this.topicRepository.createQueryBuilder('topic');
    queryBuilder.addOrderBy('created_at',"DESC");
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

    return items.toPageDto(pageMetaDto);
  }

  async getTopic(topicId: Uuid): Promise<TopicDto> {
    const queryBuilder = this.topicRepository.createQueryBuilder('topic');

    queryBuilder.where('topic.id = :topicId', { topicId });

    const topicEntity = await queryBuilder.getOne();

    if (!topicEntity) {
      throw new Error();
    }

    return topicEntity.toDto();
  }
}
