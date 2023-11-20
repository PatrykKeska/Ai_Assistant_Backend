import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { catchError, lastValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
import { OPEN_AI_KEY } from 'src/config/secret';
import { ChatResponseType } from './Conversation.type';

export type ResponseType = {
  question: string;
};

type ChunkType = {
  question: string;
  answer: string;
};

@Injectable()
export class ConversationService {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}
  private started: boolean = false;
  private memmory: ChunkType[] = [];
  async httpPost(question: string, memmory: string): Promise<ChatResponseType> {
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
                content: `${question}`,
              },
              {
                role: 'system',
                content: `Chat with user. Use Context memmory to answer the question about user. Answer shortly and precisely. If question provided not enough information, ask user to provide more information. Keep conversation going.
                 HERE CONTEXT MEMMORY: ${memmory}`,
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

  handleMemmoryResset() {
    if (!this.started) {
      this.started = true;
      setTimeout(() => {
        this.started = false;
        console.log('clear conversation memmory');
        this.memmory.length = 0;
      }, 60000);
    }
  }

  pushToMemmory(chunk: ChunkType) {
    this.memmory.push(chunk);
  }

  getMemmory(): ChunkType[] {
    return this.memmory;
  }
}
