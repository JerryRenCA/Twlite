import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { Trim } from '../../../decorators/transform.decorators';

export class TopicNewDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly title: string;

  @ApiProperty()
  @IsString()
  // @IsNotEmpty()
  @Trim()
  readonly content: string;
}
