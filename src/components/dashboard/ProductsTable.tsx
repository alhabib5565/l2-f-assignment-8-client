import { TProduct } from "@/type";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "name" | "type" | "brand" | "weight" | "price";
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name" },
  { id: "type", label: "Type", minWidth: 150 },
  {
    id: "brand",
    label: "Brand",
    minWidth: 150,
  },
  {
    id: "weight",
    label: "Weight",
    minWidth: 100,
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
  },
];

export default async function ProductsTable() {
  const res = await fetch(`${process.env.SERVER_URL}/products`, {
    next: {
      revalidate: 30,
    },
  });
  const products = await res.json();

  return (
    <Paper sx={{ width: "100%", overflow: "auto" }}>
      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.data.map((product: TProduct) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={product._id}>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {product.title}
                  </TableCell>
                  <TableCell>{product.type}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.weight}</TableCell>
                  <TableCell sx={{ color: "primary.main", fontWeight: 600 }}>
                    ${product.price}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
