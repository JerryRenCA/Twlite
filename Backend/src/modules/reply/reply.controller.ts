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
import { IFile } from '../../interfaces';
import { TranslationService } from '../../shared/services/translation.service';
import { UserEntity } from '../user/user.entity';
import { ReplyDto } from './dtos/reply.dto';
import { ReplyNewDto } from './dtos/reply-new.dto';
import { ReplysPageOptionsDto } from './dtos/replys-page-options.dto';
import { ReplyService } from './reply.service';

@Controller('replys')
@ApiTags('replys')
export class ReplyController {
  constructor(
    private replyService: ReplyService,
    private readonly translationService: TranslationService,
  ) {}

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: 'Get replys list',
    type: PageDto,
  })
  getReplys(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: ReplysPageOptionsDto,
  ): Promise<PageDto<ReplyDto>> {
    return this.replyService.getReplys(pageOptionsDto);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get replys list',
    type: ReplyDto,
  })
  getReply(@UUIDParam('id') replyId: Uuid): Promise<ReplyDto> {
    return this.replyService.getReply(replyId);
  }

  @Get('ByTopic/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get a Topic's replys list",
    type: ReplyDto,
  })
  getTopicReplys(
    @UUIDParam('id') topicId: Uuid,
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: ReplysPageOptionsDto,
  ): Promise<PageDto<ReplyDto>> {
    return this.replyService.getTopicReplys(pageOptionsDto, topicId);
  }

  @Post('new')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ReplyDto, description: 'Successfully Post new reply' })
  @ApiFile({ name: 'avatar' })
  async replyNew(
    @Body() replyNewDto: ReplyNewDto,
    @AuthUser() user: UserEntity,
    @UploadedFile() file?: IFile,
  ): Promise<ReplyDto> {
    const createdReply = await this.replyService.createReply(
      replyNewDto,
      user.id,
      file,
    );

    return createdReply.toDto({
      isActive: true,
    });
  }
}
