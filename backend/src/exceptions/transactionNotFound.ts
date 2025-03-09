import { BaseCustomError } from "./baseCustomError";

export class TransactionNotFound extends BaseCustomError {
  protected statusCode: number;
  protected description: string;
  protected errors: Object[];

  constructor() {
    super("No Records Found");
    this.statusCode = 404;
    this.description = "No Records Found";
    this.errors = [];
  }

  getStatusCode(): number {
    return this.statusCode;
  }
  getDescription(): string {
    return this.description;
  }
  getErrors(): Array<Object> {
    return this.errors;
  }
  errorResponse(): Record<string, Object> {
    return {
      status: this.getStatusCode(),
      message: this.getDescription(),
    };
  }
}
