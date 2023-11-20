import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ConversationService } from './conversation.service';

type RequestBodyType = {
  question: string;
};

@Controller('conversation')
export class ConversationController {
  constructor(private questionService: ConversationService) {}

  @Post()
  async getQuestion(
    @Body() getQuestion: RequestBodyType,
    @Res() res: Response,
  ): Promise<any> {
    this.questionService.handleMemmoryResset();
    console.log(getQuestion.question);
    const aiResponse = await this.questionService.httpPost(
      getQuestion.question,
      JSON.stringify(this.questionService.getMemmory()),
    );
    const chunk = {
      question: getQuestion.question,
      answer: aiResponse.choices[0].message.content,
    };
    this.questionService.pushToMemmory(chunk);
    res
      .status(HttpStatus.OK)
      .json({ reply: aiResponse.choices[0].message.content });
  }
}
