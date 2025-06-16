import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MailService } from 'src/shared/mail/mail.service';
import { MAIL_SERVICE } from 'src/shared/mail/mail.interface';
import { EventName } from '../../events.interface';
import { SendMailEvent } from '../send-mail.event';

@Injectable()
export class SendMailListener {
  private readonly logger: Logger = new Logger(SendMailListener.name);

  constructor(
    @Inject(MAIL_SERVICE) private readonly mailService: MailService,
  ) {}

  @OnEvent(EventName.SEND_MAIL)
  async handleSendMailEvent(event: SendMailEvent) {
    this.logger.log(`Sending mail to ${event.to}`);
    await this.mailService.sendTemplatedMail({
      to: event.to,
      subject: event.subject,
      template: event.template,
      context: event.context,
      from: event.from,
    });
  }
}
