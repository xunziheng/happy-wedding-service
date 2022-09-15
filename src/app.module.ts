import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusMonitorModule } from 'nest-status-monitor';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import statusMonitorConfig from './config/monitor';
import weixinConfig from './config/weixin';
import { HttpModule } from '@nestjs/axios';
import { WeChatModule } from 'nest-wechat';

@Module({
  imports: [
    UserModule,
    WeChatModule.register({
      appId: weixinConfig.appId,
      secret: weixinConfig.secret,
      token: weixinConfig.token,
      encodingAESKey: weixinConfig.encodingAESKey,
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    StatusMonitorModule.setUp(statusMonitorConfig),
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
