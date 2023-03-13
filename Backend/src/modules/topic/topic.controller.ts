import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IFile } from "interfaces";

import { PageDto } from "../../common/dto/page.dto";
import { RoleType } from "../../constants";
import { ApiFile, ApiPageOkResponse, Auth, AuthUser, UUIDParam } from "../../decorators";
import { UseLanguageInterceptor } from "../../interceptors/language-interceptor.service";
import { TranslationService } from "../../shared/services/translation.service";
import { TopicEntity } from "./topic.entity";
import { TopicService } from "./topic.service";
import { TopicDto } from "./dtos/topic.dto";
import { TopicNewDto } from "./dtos/topic-new.dto";
import type { TopicsPageOptionsDto } from "./dtos/topics-page-options.dto";
import { UserEntity } from "../user/user.entity";

@Controller("topics")
@ApiTags("topics")
export class TopicController {
  constructor(
    private topicService: TopicService,
    private readonly translationService: TranslationService
  ) {}

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: "Get topics list",
    type: PageDto,
  })
  getTopics(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: TopicsPageOptionsDto
  ): Promise<PageDto<TopicDto>> {
    return this.topicService.getTopics(pageOptionsDto);
  }

  @Get(":id")
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get topics list",
    type: TopicDto,
  })
  getTopic(@UUIDParam("id") topicId: Uuid): Promise<TopicDto> {
    return this.topicService.getTopic(topicId);
  }

  @Post('new')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TopicDto, description: 'Successfully Post new topic' })
  @ApiFile({ name: 'avatar' })
  async topicNew(
    @Body() topicNewDto: TopicNewDto,
    @AuthUser() user: UserEntity,
    @UploadedFile() file?: IFile,
  ): Promise<TopicDto> {
    const createdTopic = await this.topicService.createTopic(
      topicNewDto,
      user.id,
      file,
    );

    return createdTopic.toDto({
      isActive: true,
    });
  }
}
