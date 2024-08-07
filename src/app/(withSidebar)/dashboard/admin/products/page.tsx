"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetAllProductsQuery } from "@/redux/api/product.api";
import {
  Avatar,
  Button,
  FormControl,
  Input,
  MenuItem,
  Rating,
  Select,
  SelectChangeEvent,
  Stack,
  TablePagination,
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
import { TMeta } from "@/type";
import PaginationForTable from "@/components/shared/PaginationForTable";
import useDebounce from "@/hooks/common/useDebounce";

const ProductsPage = () => {
  //state
  const [open, setOpen] = React.useState(false);
  const [productId, setProductId] = React.useState("");
  const [queryInfo, setQueryInfo] = React.useState({
    rowsPerPage: 10,
    page: 0,
    searchTerm: "",
    sortOrder: "",
  });

  const debouncedValue = useDebounce(queryInfo.searchTerm, 500);

  //query
  const { data, isLoading } = useGetAllProductsQuery({
    query: `page=${queryInfo.page + 1}&limit=${
      queryInfo.rowsPerPage
    }&searchTerm=${debouncedValue}&sort=${queryInfo.sortOrder}`,
  });

  const products = data?.data;
  const meta = data?.meta as TMeta;

  const handleAddToFlashSaleModalOpen = (productId: string) => {
    setProductId(productId);
    setOpen((prev) => !prev);
  };

  const handleSearchInputChage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryInfo((prev) => ({ ...prev, searchTerm: event.target.value }));
  };

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setQueryInfo((prev) => ({ ...prev, sortOrder: event.target.value }));
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
              onClick={() => handleAddToFlashSaleModalOpen(row.row?.productId)}
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
          <Input placeholder="Search..." onChange={handleSearchInputChage} />
          <Box display="flex" gap={1}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={queryInfo.sortOrder}
                onChange={handleSortOrderChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Short by date</em>
                </MenuItem>
                <MenuItem value="-createAt">Newest</MenuItem>
                <MenuItem value="createAt">Lowest</MenuItem>
              </Select>
            </FormControl>
            <Link href="/dashboard/admin/products/add-product">
              <Button>
                Add Product <Add />
              </Button>
            </Link>
          </Box>
        </Stack>
        <Box sx={{ width: "100%" }}>
          <DataGrid
            sx={{
              border: "none",
              borderTop: "1px solid lightgray",
              borderBottom: "1px solid lightgray",
              borderRadius: 0,
            }}
            loading={isLoading}
            // pagination={false}
            hideFooter
            getRowId={(row) => row._id}
            rows={products ?? []}
            columns={columns}
            autoHeight
          />
        </Box>

        <PaginationForTable
          meta={meta}
          paginationInfo={queryInfo}
          setPaginationInfo={setQueryInfo}
        />
        {open && (
          <AddToFlashSaleModal
            productId={productId}
            open={open}
            setOpen={setOpen}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProductsPage;
