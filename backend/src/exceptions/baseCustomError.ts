export abstract class BaseCustomError extends Error {
  protected abstract statusCode: number;
  protected abstract description: string;
  protected abstract errors: Array<Object>;

  constructor(message?: string) {
    super(message);
  }

  abstract getStatusCode(): number;

  abstract getDescription(): string;

  abstract getErrors(): Array<Object>;

  abstract errorResponse(): Record<string, Object>;
}
