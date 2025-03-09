import express, { NextFunction, Request, Response } from "express";
import {
  getTransactions,
  getTransactionsById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  calculateSummary,
} from "../services/transaction";
import { validationResult } from "express-validator";
import { InvalidInput } from "../exceptions/invalidInput";
import {
  summaryValidator,
  transactionIdValidator,
  transactionQueryValidator,
  transactionUpdateValidator,
  transactionValidator,
} from "../validators/inputValidators";

const transactionRouter = express.Router();

transactionRouter.get(
  "/",
  transactionQueryValidator,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return next(new InvalidInput(errors));
    return getTransactions(req, res);
  }
);

transactionRouter.get(
  "/summary",
  summaryValidator,
  (req: Request, res: Response, next: NextFunction) => {
    return calculateSummary(req, res);
  }
);

transactionRouter.get(
  "/:id",
  transactionIdValidator,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return next(new InvalidInput(errors));
    return getTransactionsById(req, res);
  }
);

transactionRouter.post(
  "/",
  transactionValidator,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return next(new InvalidInput(errors));
    return createTransaction(req, res);
  }
);

transactionRouter.put(
  "/:id",
  [...transactionIdValidator, ...transactionUpdateValidator],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return next(new InvalidInput(errors));

    return updateTransaction(req, res);
  }
);

transactionRouter.delete(
  "/:id",
  transactionIdValidator,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return next(new InvalidInput(errors));

    return deleteTransaction(req, res);
  }
);

export default transactionRouter;
