import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { HttpModule } from '@nestjs/axios';
import { ChatService } from './services/chat.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
