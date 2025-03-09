import { TransactionType } from "@prisma/client";
import { body, param, query } from "express-validator";

export const transactionValidator = [
  body("type")
    .exists()
    .isIn(Object.values(TransactionType))
    .withMessage("Type must be either income or expense"),

  body("amount")
    .exists()
    .isInt({ gt: 0 })
    .withMessage("Amount must be a positive number"),

  body("category").exists().isString().withMessage("Category must be a string"),

  body("date")
    .exists()
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid date"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const transactionQueryValidator = [
  query("type")
    .optional()
    .isIn(Object.values(TransactionType))
    .withMessage("Type must be either income or expense"),

  query("from")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid date"),

  query("to")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid date"),

  query("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),
];

export const transactionIdValidator = [param("id").exists().isUUID()];

export const transactionUpdateValidator = [
  body("type")
    .optional()
    .isIn(Object.values(TransactionType))
    .withMessage("Type must be either income or expense"),

  body("amount")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Amount must be a positive number"),

  body("category")
    .optional()
    .isString()
    .withMessage("Category must be a string"),

  body("date")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid date"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

export const summaryValidator = [
  query("from")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid date"),

  query("to")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Date must be a valid date"),
];
