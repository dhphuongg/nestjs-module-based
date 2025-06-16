export type SendTemplateMailOptions = {
  to: string | string[];
  subject: string;
  template: string;
  context: Record<string, any>;
  from?: string;
};

export interface IMailService {
  sendMail(options: {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    from?: string;
  }): Promise<void>;

  sendTemplatedMail(options: SendTemplateMailOptions): Promise<void>;
}

export const MAIL_SERVICE = 'MAIL_SERVICE';
