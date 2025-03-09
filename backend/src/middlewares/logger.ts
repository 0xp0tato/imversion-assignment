import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  const hostname = req.hostname;
  const path = req.path;
  const time = new Date(Date.now()).toString();

  console.log(method, hostname, path, time);

  next();
};
