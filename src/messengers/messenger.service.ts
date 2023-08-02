import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(8002, { cors: true })
export class MessengerService
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  @SubscribeMessage('send-message')
  sendMessage(@MessageBody() message: string): void {
    this.server.emit('send-message', message);
  }

  handleConnection() {
    console.log('on connect messenger');
    this.server.emit('message', 'test');
  }

  handleDisconnect() {
    console.log('on disconnect messenger');
  }
}
