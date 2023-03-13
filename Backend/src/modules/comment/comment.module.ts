import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicModule } from '../topic/topic.module';
import { CommentController } from './comment.controller';
import { CommentEntity } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), TopicModule],
  controllers: [CommentController],
  exports: [CommentService],
  providers: [CommentService],
})
export class CommentModule {}
