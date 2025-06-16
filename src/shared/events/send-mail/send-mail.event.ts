export class SendMailEvent {
  constructor(
    public readonly to: string,
    public readonly subject: string,
    public readonly template: string,
    public readonly context: Record<string, any>,
    public readonly from?: string,
  ) {}
}
