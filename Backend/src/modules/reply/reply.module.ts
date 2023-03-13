import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicModule } from '../topic/topic.module';
import { ReplyController } from './reply.controller';
import { ReplyEntity } from './reply.entity';
import { ReplyService } from './reply.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReplyEntity]), TopicModule],
  controllers: [ReplyController],
  exports: [ReplyService],
  providers: [ReplyService],
})
export class ReplyModule {}
