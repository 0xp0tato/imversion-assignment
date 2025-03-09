import { NextFunction, Request, Response } from "express";
import { InvalidInput } from "../exceptions/invalidInput";
import { TransactionNotFound } from "../exceptions/transactionNotFound";

/**
 * Middleware function to handle errors in an Express application.
 *
 * This function is designed to catch errors that occur during the processing of requests.
 * It checks the type of error and sends an appropriate HTTP response to the client.
 *
 * @param {Error} err - The error object that was thrown or passed to the `next` function.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof InvalidInput || err instanceof TransactionNotFound) {
    /**
     * If the error is a known custom error, use the error's methods to set the HTTP status code
     * and send a JSON response with the error details.
     *
     * - `err.getStatusCode()`: Retrieves the appropriate HTTP status code for the error.
     * - `err.errorResponse()`: Returns the error details formatted as a JSON object.
     */
    res.status(err.getStatusCode()).json(err.errorResponse());
  } else {
    /**
     * If the error is not a known custom error, log the error to the console for debugging purposes.
     * Send a generic 500 Internal Server Error response to the client.
     */
    console.log(err);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
