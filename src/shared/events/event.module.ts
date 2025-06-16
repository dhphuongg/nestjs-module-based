import { Module } from '@nestjs/common';

import { SendMailListener } from './send-mail/listeners/send-mail.listener';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule],
  providers: [SendMailListener],
})
export class EventModule {}
