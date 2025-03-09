import { StatusCodes } from "http-status-codes";
import { BaseCustomError } from "./baseCustomError";

export class InvalidInput extends BaseCustomError {
  protected statusCode: number;
  protected description: string;
  protected errors: Array<Object>;

  constructor(errors: any) {
    super("Invalid Input");
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    this.description = "Invalid Input";
    this.errors = errors;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  getDescription(): string {
    return this.description;
  }

  getErrors() {
    return this.errors;
  }

  errorResponse() {
    return {
      status: this.getStatusCode(),
      message: this.getDescription(),
      errors: this.getErrors(),
    };
  }
}
