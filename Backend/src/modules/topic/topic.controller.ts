import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants';
import {
  ApiFile,
  ApiPageOkResponse,
  Auth,
  AuthUser,
  UUIDParam,
} from '../../decorators';
import { TranslationService } from '../../shared/services/translation.service';
import { UserEntity } from '../user/user.entity';
import { TopicDto } from './dtos/topic.dto';
import { TopicNewDto } from './dtos/topic-new.dto';
import { TopicPageOptionsDto } from './dtos/topics-page-options.dto';
import { TopicService } from './topic.service';

@Controller('topics')
@ApiTags('topics')
export class TopicController {
  constructor(
    private topicService: TopicService,
    private readonly translationService: TranslationService,
  ) {}

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    type: PageDto,
  })
  async getTopics(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: TopicPageOptionsDto,
  ): Promise<PageDto<TopicDto>> {
    return this.topicService.getTopics(pageOptionsDto);
  }

  // @Get('PP')
  // @Auth([RoleType.USER])
  // @UseLanguageInterceptor()
  // // @ApiPageOkResponse({ type: PageDto })
  // async getPosts(@Query() pageOptionsDto: PostPageOptionsDto) {
  //   return null;
  // }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get topics list',
    type: TopicDto,
  })
  getTopic(@UUIDParam('id') topicId: Uuid): Promise<TopicDto> {
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
    // @UploadedFile() file?: IFile,
  ): Promise<TopicDto> {
    const createdTopic = await this.topicService.createTopic(
      topicNewDto,
      user.id,
    );

    return createdTopic.toDto({
      isActive: true,
    });
  }
}
