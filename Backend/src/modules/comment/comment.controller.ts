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
import { CommentService } from './comment.service';
import { CommentDto } from './dtos/comment.dto';
import { CommentNewDto } from './dtos/comment-new.dto';
import { CommentsPageOptionsDto } from './dtos/comments-page-options.dto';

@Controller('comments')
@ApiTags('comments')
export class CommentController {
  constructor(
    private commentService: CommentService,
    private readonly translationService: TranslationService,
  ) {}

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: 'Get comments list',
    type: PageDto,
  })
  getComments(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: CommentsPageOptionsDto,
  ): Promise<PageDto<CommentDto>> {
    return this.commentService.getComments(pageOptionsDto);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get comments list',
    type: CommentDto,
  })
  getComment(@UUIDParam('id') commentId: Uuid): Promise<CommentDto> {
    return this.commentService.getComment(commentId);
  }

  @Get('ByTopic/:id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get a Topic's comments list",
    type: CommentDto,
  })
  getTopicComments(
    @UUIDParam('id') topicId: Uuid,
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: CommentsPageOptionsDto,
  ): Promise<PageDto<CommentDto>> {
    return this.commentService.getTopicComments(pageOptionsDto, topicId);
  }

  @Post('new')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: CommentDto,
    description: 'Successfully Post new comment',
  })
  @ApiFile({ name: 'avatar' })
  async commentNew(
    @Body() commentNewDto: CommentNewDto,
    @AuthUser() user: UserEntity,
    @UploadedFile() file?: IFile,
  ): Promise<CommentDto> {
    const createdComment = await this.commentService.createComment(
      commentNewDto,
      user.id,
      file,
    );

    return createdComment.toDto({
      isActive: true,
    });
  }
}
