import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';

@WebSocketGateway({ cors: true })
export class SocketResolver
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('send-message')
  sendMessage(@MessageBody() message: string): void {
    this.server.emit('send-message', message);
  }

  @SubscribeMessage('get-all-messages')
  getAllMessages(): void {
    return;
  }

  @SubscribeMessage('typing')
  typing(): void {
    return;
  }

  @SubscribeMessage('send-notification')
  sendNotification(@MessageBody() message: string): void {
    this.server.emit('send-notification', message);
  }

  handleConnection() {
    console.log('socket connected');
    this.server.emit('connect-socket', { message: 'socket connected' });
  }

  handleDisconnect() {
    console.log('socket disconnected');
    this.server.emit('disconnect-socket', { message: 'socket disconnected' });
  }
}
