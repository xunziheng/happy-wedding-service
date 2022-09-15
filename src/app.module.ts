import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusMonitorModule } from 'nest-status-monitor';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import statusMonitorConfig from './config/monitor';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UserModule,
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
