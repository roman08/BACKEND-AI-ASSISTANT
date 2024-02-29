import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthograpyDto, ProsConsDiscusserDto } from './dtos';
import { Response } from 'express';
import { log } from 'console';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  orthographyCheck(@Body() orthograpyDto: OrthograpyDto) {
    return this.gptService.orthographyCheck(orthograpyDto);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(@Body() prosConsDiscusserDto: ProsConsDiscusserDto) {
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto: ProsConsDiscusserDto,
    @Res() res: Response
    ) {
    const stream =
      await this.gptService.prosConsDicusserStream(prosConsDiscusserDto);
    res.setHeader('Content-type', 'application/json');
    res.status( HttpStatus.OK);

    for await( const chunk of stream){
      const piece = chunk.choices[0].delta.content || '';
      // console.log(piece);
      res.write(piece);
      
    }

    res.end();
  }
}
