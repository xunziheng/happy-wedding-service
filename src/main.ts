import { NestFactory } from '@nestjs/core';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { AppModule } from './app.module';

export const getConfig = () => {
  delete require.cache[require.resolve('config')];
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require('config');
  return config;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // web漏洞保护
  app.use(helmet());
  // 限制访问频率
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 500, // 限制15分钟内最多只能访问300次
    }),
  );
  await app.listen(5173);
}
bootstrap();
