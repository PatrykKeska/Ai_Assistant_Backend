import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
