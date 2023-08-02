import { Module } from '@nestjs/common';
import { SocketResolver } from './socket.resolver';
import { SocketService } from './socket.service';

@Module({
  providers: [SocketResolver, SocketService],
  exports: [SocketService],
})
export class SocketModule {}
