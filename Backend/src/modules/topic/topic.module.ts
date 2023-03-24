import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { TopicController } from './topic.controller';
import { TopicEntity } from './topic.entity';
import { TopicService } from './topic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TopicEntity]),
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [TopicController],
  exports: [TopicService],
  providers: [TopicService],
})
export class TopicModule {}
