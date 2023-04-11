import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { DataSource, FindOptionsWhere } from "typeorm";
import { Repository } from "typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import type { PageDto } from "../../common/dto/page.dto";
import { FileNotImageException } from "../../exceptions";
import { IFile } from "../../interfaces";
import { AwsS3Service } from "../../shared/services/aws-s3.service";
import { ValidatorService } from "../../shared/services/validator.service";

import type { TopicDto } from "./dtos/topic.dto";
import type { TopicPageOptionsDto } from "./dtos/topics-page-options.dto";
import { TopicEntity } from "./topic.entity";
import { TopicNewDto } from "./dtos/topic-new.dto";
import { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { CostExplorer } from "aws-sdk";
import { NIL } from "uuid";

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
    private validatorService: ValidatorService,
    private awsS3Service: AwsS3Service,
    private commandBus: CommandBus
  ) {}

  private TopTopicId = "1e5082d7-fc97-4f9e-bf5c-0a08ce7ed5c8" as Uuid;

  async createTopic(
    topicNewDto: TopicNewDto,
    userId: Uuid,
    file?: Express.Multer.File
  ): Promise<TopicEntity> {
    if (topicNewDto.parentId == "") topicNewDto.parentId = this.TopTopicId;
    const topic = this.topicRepository.create({ ...topicNewDto, userId });
    if(file)
    topic.picFile = file.filename;
    console.info("topic", topic);
    await this.topicRepository.save(topic);
    return topic;
  }

  /**
   * Find single topic
   */
  findOne(
    findData: FindOptionsWhere<TopicEntity>
  ): Promise<TopicEntity | null> {
    return this.topicRepository.findOneBy(findData);
  }

  async getChildTopics(
    parentId: Uuid,
    pageOptionsDto: TopicPageOptionsDto
  ): Promise<PageDto<TopicDto>> {
    if (parentId == "1e5082d7-fc97-4f9e-bf5c-0a08ce7ed5c8")
      parentId = this.TopTopicId;
    const queryBuilder = this.topicRepository.createQueryBuilder("topic");
    queryBuilder.leftJoinAndSelect("topic.user", "user");
    queryBuilder.orderBy("topic_created_at", "DESC");
    queryBuilder.where("topic.parent_id=:parentId", { parentId });
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    return items.toPageDto(pageMetaDto);
  }

  async getTopics(
    pageOptionsDto: TopicPageOptionsDto
  ): Promise<PageDto<TopicDto>> {
    const queryBuilder = this.topicRepository.createQueryBuilder("topic");
    queryBuilder.leftJoinAndSelect("topic.user", "user");
    queryBuilder.orderBy("topic_created_at", "DESC");
    const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);
    return items.toPageDto(pageMetaDto);
  }

  // Keep this comment!!
  // const queryBuilder = this.topicRepository.createQueryBuilder("topic");
  // queryBuilder.leftJoinAndSelect('topic.user','user')
  // queryBuilder.orderBy("topic_created_at", "DESC");
  // const [items, pageMetaDto] = await queryBuilder.paginate(pageOptionsDto);

  async getTopic(topicId: Uuid): Promise<TopicDto> {
    const queryBuilder = this.topicRepository.createQueryBuilder("topic");
    queryBuilder.where("topic.id = :topicId", { topicId });
    const topicEntity = await queryBuilder.getOne();
    if (!topicEntity) {
      throw new Error();
    }
    return topicEntity.toDto();
  }
}
