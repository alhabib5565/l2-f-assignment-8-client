"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllProductsQuery } from "@/redux/api/product.api";
import {
  Avatar,
  Button,
  Input,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import {
  Add,
  AddOutlined,
  Delete,
  Edit,
  Visibility,
} from "@mui/icons-material";
import Link from "next/link";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import AddToFlashSaleModal from "@/components/dashboard/admin/flashSale/AddToFlashSaleModal";

const ProductsPage = () => {
  const [open, setOpen] = React.useState(false);
  const { data, isLoading } = useGetAllProductsQuery({});
  const products = data?.data;

  const handleAddToFlashSaleModalOpen = () => {
    setOpen(!open);
  };

  const columns: GridColDef[] = [
    {
      field: "productId",
      headerName: "Product ID",
      width: 130,
      valueGetter: (value) => `#${value}`,
    },
    {
      field: "productName",
      headerName: "Product",
      flex: 1,
      minWidth: 200,
      renderCell: (row) => (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            src={row.row?.thumbnail}
            sx={{ width: 40, height: 40, bgcolor: "lightgray" }}
            variant="rounded"
          />
          <Typography fontSize={14}>{row.row?.productName}</Typography>
        </Box>
      ),
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
      renderCell: (row) => <Rating value={row.row.rating} readOnly />,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      valueGetter: (value) => `TK ${value}`,
      width: 110,
    },
    {
      field: "action",
      headerName: "Action",
      width: 350,
      headerAlign: "right",
      renderCell: (row) => {
        return (
          <Stack
            height="100%"
            direction="row"
            alignItems="center"
            justifyContent="end"
            flexShrink={"inherit"}
            gap={1}
          >
            <Button
              onClick={handleAddToFlashSaleModalOpen}
              variant="contained"
              color="info"
            >
              Flash <AddOutlined />
            </Button>
            <Link href={`/products/${row.row._id}`}>
              <Button variant="outlined" color="success">
                <Visibility />
              </Button>
            </Link>
            <Button variant="outlined" color="error">
              <Delete />
            </Button>
            <Button variant="outlined" color="info">
              <Edit />
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box>
      <PageHeader pageName="Products" />

      <Box
        sx={{
          border: "1px solid lightgray",
        }}
        bgcolor="white"
        borderRadius={2}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mx={1}
          my={2}
        >
          <Input placeholder="Search..." />
          <Link href="/dashboard/admin/products/add-product">
            <Button>
              Add Product <Add />
            </Button>
          </Link>
        </Stack>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            sx={{
              border: "none",
              borderTop: "1px solid lightgray",
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            }}
            loading={isLoading}
            pageSizeOptions={[10, 20, { value: 30, label: "30" }]}
            getRowId={(row) => row._id}
            rows={products ?? []}
            columns={columns}
            autoHeight
          />
        </Box>
        {open && <AddToFlashSaleModal open={open} setOpen={setOpen} />}
      </Box>
    </Box>
  );
};

export default ProductsPage;
