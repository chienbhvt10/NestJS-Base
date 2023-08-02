import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8001, { cors: true })
export class NotificationService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  @SubscribeMessage('send-notification')
  sendMessage(@MessageBody() message: string): void {
    this.server.emit('send-notification', message);
  }

  handleConnection() {
    console.log('on connect notification');
    this.server.emit('notification', 'test');
  }

  handleDisconnect() {
    console.log('on disconnect notification');
  }
}
