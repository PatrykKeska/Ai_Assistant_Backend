import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ChatService } from '../services/chat.service';
import { Response } from 'express';

type RequestBodyType = {
  question: string;
};

@Controller('chat')
export class ChatController {
  constructor(private questionService: ChatService) {}

  @Post()
  async getQuestion(
    @Body() getQuestion: RequestBodyType,
    @Res() res: Response,
  ): Promise<any> {
    console.log(getQuestion.question);
    const aiResponse = await this.questionService.httpPost(
      getQuestion.question,
    );
    res
      .status(HttpStatus.OK)
      .json({ reply: aiResponse.choices[0].message.content });
  }
}
