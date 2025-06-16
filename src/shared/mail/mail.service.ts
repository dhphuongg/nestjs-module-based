import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';

import { EnvironmentConfig } from '../configs/environment.config';
import { IMailService } from './mail.interface';

@Injectable()
export class MailService implements IMailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService<EnvironmentConfig, true>) {
    const mailConfig = this.configService.get('mail', { infer: true });

    this.transporter = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.password,
      },
    });
  }

  async sendMail(options: {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    from?: string;
  }): Promise<void> {
    const mailConfig = this.configService.get('mail', { infer: true });

    await this.transporter.sendMail({
      from: options.from || mailConfig.defaultFrom,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });
  }

  async sendTemplatedMail(options: {
    to: string | string[];
    subject: string;
    template: string;
    context: Record<string, any>;
    from?: string;
  }): Promise<void> {
    const templatePath = path.join(process.cwd(), options.template);

    try {
      const template = fs.readFileSync(templatePath, 'utf-8');
      const html = ejs.render(template, options.context);

      await this.sendMail({
        ...options,
        html,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Failed to send templated email: ${error.message}`);
      }
      throw new Error('Failed to send templated email: Unknown error occurred');
    }
  }
}
