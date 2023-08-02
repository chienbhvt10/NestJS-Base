import { Module } from '@nestjs/common';
import { SocketResolver } from './resolvers/socket.resolver';
import { SocketService } from './services/socket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './entities/message';
import { Notification, NotificationSchema } from './entities/notification';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
  providers: [SocketResolver, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
