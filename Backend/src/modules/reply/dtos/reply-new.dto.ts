import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class ReplyNewDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly topicId: Uuid;
}
