import { Controller, Get } from '@nestjs/common';
import { ChatService } from '../services/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private questionService: ChatService) {}
  @Get()
  async findAll(): Promise<any> {
    const response = await this.questionService.httpPost();
    console.log('response', response);
    console.log('check env', process.env.TEST);
    return response.choices[0].message;
  }
}
