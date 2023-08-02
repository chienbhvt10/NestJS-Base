import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationService],
  imports: [NotificationService],
})
export class NotificationModule {}
