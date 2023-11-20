import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { ChatResponseType } from '../chat.type';
import { ConfigModule } from '@nestjs/config';
import { OPEN_AI_KEY } from 'src/config/secret';

export type ResponseType = {
  question: string;
};

@Injectable()
export class ChatService {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  async httpPost(): Promise<ChatResponseType> {
    await ConfigModule.envVariablesLoaded;
    const response = await lastValueFrom(
      this.httpService
        .post<ChatResponseType>(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: 'Tell me what is nest js? as short as possible',
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + OPEN_AI_KEY,
            },
          },
        )
        .pipe(
          catchError((e) => {
            throw e;
          }),
        ),
    );
    return response.data;
  }
}
