import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFetch } from "../hooks/useFetch";
import { useState } from "react";
import Loader from "./Loader";
import Filters from "./Filters";
import ErrorDisplay from "./ErrorDisplay";

function BasicTable() {
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    from: "",
    to: "",
  });

  const transactionUrl = import.meta.env.VITE_BACKEND_URL;

  const { isLoading, apiData, serverError } = useFetch(transactionUrl, filters);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : serverError ? (
        <ErrorDisplay error={serverError} />
      ) : apiData ? (
        <TableContainer component={Paper} sx={{ marginTop: 2, width: "100vw" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{formatDate(row.date)}</TableCell>
                  <TableCell>
                    {row.description ? row.description : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <Filters filters={filters} setFilters={setFilters} />
    </>
  );
}

export default BasicTable;
