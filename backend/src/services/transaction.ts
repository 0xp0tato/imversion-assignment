import { Request, Response } from "express";
import { prismaClient } from "../../prisma/client";
import { createObject } from "../utils/createObject";
import { StatusCodes } from "http-status-codes";
import { TransactionType } from "@prisma/client";
import { toString } from "express-validator/lib/utils";
import { TransactionNotFound } from "../exceptions/transactionNotFound";

export async function getTransactions(req: Request, res: Response) {
  const { type, from, to, category } = req.query;

  const filter = createObject({ type, from, to, category });

  const transactions = await prismaClient.transaction.findMany({
    where: filter,
  });

  if (!transactions.length) throw new TransactionNotFound();

  res.json(transactions);
}

export async function getTransactionsById(req: Request, res: Response) {
  const { id } = req.params;
  const transactions = await prismaClient.transaction.findUnique({
    where: { id },
  });

  if (!transactions) throw new TransactionNotFound();

  res.json(transactions);
}

export async function createTransaction(req: Request, res: Response) {
  const { type, amount, category, date, description } = req.body;
  const transaction = await prismaClient.transaction.create({
    data: {
      type,
      amount,
      category,
      date,
      description,
    },
  });
  res.status(StatusCodes.CREATED).send(transaction);
}

export async function updateTransaction(req: Request, res: Response) {
  const { id } = req.params;
  const { type, amount, category, date, description } = req.body;

  const data = createObject({ type, amount, category, date, description });

  const transaction = await prismaClient.transaction.update({
    where: { id },
    data,
  });
  res.json(transaction);
}

export async function deleteTransaction(req: Request, res: Response) {
  const { id } = req.params;

  await prismaClient.transaction.delete({
    where: { id },
  });

  res.json({ message: "Transaction deleted successfully" });
}

export async function calculateSummary(req: Request, res: Response) {
  const { from, to } = req.query;

  const filters: any = {
    type: {
      in: [TransactionType.income, TransactionType.expense],
    },
  };

  if (from || to) {
    filters.date = {};
    if (from) filters.date.gte = from;
    if (to) filters.date.lte = to;
  }

  const transactions = await prismaClient.transaction.groupBy({
    by: ["type"],
    _sum: {
      amount: true,
    },
    where: filters,
  });

  if (!transactions.length) throw new TransactionNotFound();

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === TransactionType.income) {
      totalIncome = transaction._sum.amount || 0;
    } else if (transaction.type === TransactionType.expense) {
      totalExpense = transaction._sum.amount || 0;
    }
  });

  const netBalance = totalIncome - totalExpense;

  res.json({
    message: "Total Summary",
    totalIncome,
    totalExpense,
    netBalance,
  });
}
