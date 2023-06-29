import { NestFactory } from '@nestjs/core';
import * as os from 'os';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  await app.listen(config().port);
  try {
    const networkInterfaces = os.networkInterfaces();
    let address = 'localhost';

    for (const name of Object.keys(networkInterfaces)) {
      for (const net of networkInterfaces[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
          address = net.address;
          break;
        }
      }
    }

    console.log(
      `🚀🚀 🚀  Server ready and listening at ==> http://${address}:${
        config().port
      }/graphql 🚀 🚀 🚀 `,
    );
  } catch (_) {}
}

bootstrap();
