import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Trim } from '../../../decorators/transform.decorators';
import type { UserDto } from "./user.dto";

export class UserUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly key: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Trim()
  readonly value: string;
}
