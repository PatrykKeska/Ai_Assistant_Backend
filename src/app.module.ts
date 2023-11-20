import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './Chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { ConversationModule } from './Conversation/conversation.module';

@Module({
  imports: [ChatModule, ConversationModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
