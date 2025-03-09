import { NextFunction, Request, Response } from "express";
import { InvalidInput } from "../exceptions/invalidInput";
import { TransactionNotFound } from "../exceptions/transactionNotFound";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof InvalidInput || err instanceof TransactionNotFound) {
    res.status(err.getStatusCode()).json(err.errorResponse());
  } else {
    console.log(err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
