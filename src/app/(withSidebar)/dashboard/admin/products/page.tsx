"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllProductsQuery } from "@/redux/api/product.api";
import { Button, Stack, Typography } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import Link from "next/link";

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", flex: 1 },
  {
    field: "brand",
    headerName: "Brand",
    width: 150,
    editable: true,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
    editable: true,
  },
  {
    field: "weight",
    headerName: "Weight",
    width: 110,
    editable: true,
  },

  {
    field: "price",
    headerName: "Price",
    type: "number",
    renderCell: (row) => {
      return <Typography>{row.row.price} $</Typography>;
    },
    width: 110,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: () => {
      return (
        <Stack height="100%" direction="row" alignItems="center" gap={1}>
          <Button color="error">
            <Delete />
          </Button>
          <Button>
            <Edit />
          </Button>
        </Stack>
      );
    },
  },
];

const ProductsPage = () => {
  const { data, isLoading } = useGetAllProductsQuery({});
  const products = data?.data;
  return (
    <Box
      sx={{
        my: 3,
      }}
      bgcolor="white"
      padding={2}
      borderRadius={2}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography fontWeight={600} variant="h4" component="h4">
          Products
        </Typography>
        <Link href="/dashboard/admin/products/add-product">
          <Button>
            Add Product <Add />
          </Button>
        </Link>
      </Stack>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          loading={isLoading}
          pageSizeOptions={[10, 20, { value: 30, label: "30" }]}
          getRowId={(row) => row._id}
          rows={products ?? []}
          columns={columns}
          autoHeight
        />
      </Box>
    </Box>
  );
};

export default ProductsPage;
