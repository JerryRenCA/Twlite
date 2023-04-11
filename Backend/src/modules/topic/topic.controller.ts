import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
// eslint-disable-next-line unicorn/import-style
import { extname } from 'path';

// eslint-disable-next-line import/no-unresolved
import { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants';
import { ApiPageOkResponse, Auth, AuthUser, UUIDParam } from '../../decorators';
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

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get children topics list',
    type: PageDto,
  })
  getChildTopic(
    @UUIDParam('id') parentId: Uuid, //if parentId=="", return the top level topic.
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: TopicPageOptionsDto,
  ): Promise<PageDto<TopicDto>> {
    return this.topicService.getChildTopics(parentId, pageOptionsDto);
  }

  @Post('new')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TopicDto, description: 'Successfully Post new topic' })
  // @ApiFile({ name: 'picfile' })
  @UseInterceptors(
    FileInterceptor('picfile', {
      // here 'picfile' must be lower case
      storage: diskStorage({
        destination: './public/uploads/pic', // This is where you define the upload directory
        filename: (req, file, cb) => {
          const uniqueSuffix =
            // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
    }),
  )
  async topicNew(
    @Body() topicNewDto: TopicNewDto,
    @AuthUser() user: UserEntity,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<TopicDto> {
    console.info('topicNewDto::', topicNewDto);
    console.info('file:', file);
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
