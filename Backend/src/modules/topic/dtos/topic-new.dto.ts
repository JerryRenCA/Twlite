import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

// import { IsNullable } from 'decorators';
import { ToUpperCase, Trim } from '../../../decorators/transform.decorators';

export class TopicNewDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly title: string;

  @ApiPropertyOptional()
  @IsString()
  @Trim()
  readonly content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Length(1)
  @ToUpperCase()
  readonly contentType: string;

  @ApiPropertyOptional()
  @IsString()
  @Trim()
  readonly picFile: string;

  @ApiPropertyOptional() // Could be "" to represent top topics, not replys
  @IsString()
  @Trim()
  parentId: Uuid;
}
