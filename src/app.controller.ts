import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { WeChatService } from 'nest-wechat';
import weixinConfig from './config/weixin';
import { MessageCrypto } from 'nest-wechat';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly weChatService: WeChatService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('weixinCheck')
  weixinCheck(
    @Query('signature') signature: string,
    @Query('timestamp') timestamp: string,
    @Query('nonce') nonce: string,
    @Query('echostr') echostr: string,
  ): string {
    const token = weixinConfig.token;
    const arr = [];
    arr.push(token, timestamp, nonce);
    arr.sort();
    const str = arr.join('');
    const sha1 = MessageCrypto.sha1(str);
    if (sha1 === signature) {
      return echostr;
    }
    return;
  }
}
