import { Paper } from "@mui/material";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader";
import ErrorDisplay from "./ErrorDisplay";
import Filters from "./Filters";

function Summary() {
  const [filters, setFilters] = useState({ to: "", from: "" });

  const summaryUrl = import.meta.env.VITE_BACKEND_URL + "/summary";

  const { isLoading, apiData, serverError } = useFetch(summaryUrl, filters);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : serverError ? (
        <ErrorDisplay error={serverError} />
      ) : apiData ? (
        <Paper sx={{ marginTop: 10 }}>
          {apiData.message}
          <br />
          Total Income : {apiData.totalIncome}
          <br />
          Total Expense : {apiData.totalExpense}
          <br />
          Net Balance: {apiData.netBalance}
        </Paper>
      ) : null}
    </>
  );
}
export default Summary;
