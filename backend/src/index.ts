import express from "express";
import transactionRouter from "./routers/transaction";
import { errorHandler } from "./middlewares/error";
import { logger } from "./middlewares/logger";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/transactions", transactionRouter);
app.use(errorHandler);

app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);

export default app;
