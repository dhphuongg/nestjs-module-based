import { Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { MAIL_SERVICE } from './mail.interface';

@Module({
  providers: [{ provide: MAIL_SERVICE, useClass: MailService }],
  exports: [MAIL_SERVICE],
})
export class MailModule {}
