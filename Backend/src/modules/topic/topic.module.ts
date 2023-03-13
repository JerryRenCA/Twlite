import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicController } from './topic.controller';
import { TopicEntity } from './topic.entity';
import { TopicService } from './topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity])],
  controllers: [TopicController],
  exports: [TopicService],
  providers: [TopicService],
})
export class TopicModule {}
