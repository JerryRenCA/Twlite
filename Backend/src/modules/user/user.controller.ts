import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
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

import { PageDto } from '../../common/dto/page.dto';
import { RoleType } from '../../constants';
import {
  // ApiFile,
  ApiPageOkResponse,
  Auth,
  AuthUser,
  UUIDParam,
} from '../../decorators';
import { UseLanguageInterceptor } from '../../interceptors/language-interceptor.service';
import { TranslationService } from '../../shared/services/translation.service';
import { UserDto } from './dtos/user.dto';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UsersPageOptionsDto } from './dtos/users-page-options.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly translationService: TranslationService,
  ) {}

  @Get('admin')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @UseLanguageInterceptor()
  async admin(@AuthUser() user: UserEntity) {
    const translation = await this.translationService.translate(
      'admin.keywords.admin',
    );

    return {
      text: `${translation} ${user.firstName}`,
    };
  }

  @Get()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiPageOkResponse({
    description: 'Get users list',
    type: PageDto,
  })
  getUsers(
    @Query(new ValidationPipe({ transform: true }))
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    return this.userService.getUsers(pageOptionsDto);
  }

  @Get(':id')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: UserDto,
  })
  getUser(@UUIDParam('id') userId: Uuid): Promise<UserDto> {
    return this.userService.getUser(userId);
  }

  @Put()
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get users list',
    type: UserDto,
  })
  updateUser(
    @Body() userUpdateDto: UserUpdateDto,
    @AuthUser() user: UserEntity,
  ) {
    console.info(user);
    console.info(userUpdateDto);

    return this.userService.updateUser(user, userUpdateDto);
  }

  @Put('avatar')
  @Auth([RoleType.USER])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Post new topic' })
  // @ApiFile({ name: 'avatar' })
  @UseInterceptors(
    FileInterceptor('avatar', {
      // here 'avatar' must be lower case
      storage: diskStorage({
        destination: './public/uploads/avatar', // This is where you define the upload directory
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
  updateUserAvatar(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateUserAvatar(user, file);
  }
}
