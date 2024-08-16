import { useGetAllOrdersForUserQuery } from "@/redux/api/orders.api";
import { TOrder } from "@/type/order.type";
import { Avatar, Box, Rating, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const RecentOrder = () => {
  //query
  const { data, isLoading } = useGetAllOrdersForUserQuery({ query: "limit=5" });
  const orders = data?.data as TOrder[];

  const products = orders
    ?.map((orderProducts) => orderProducts.products)
    .flat();

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
      field: "price",
      headerName: "Price",
      type: "number",
      valueGetter: (value) => `TK ${value}`,
      width: 110,
    },
  ];
  return (
    <Box sx={{ width: "100%", bgcolor: "white" }}>
      <Typography padding={1} variant="body1" fontWeight={600} fontSize={14}>
        Recent Order
      </Typography>
      <DataGrid
        sx={{
          border: "none",
          borderTop: "1px solid lightgray",
          // borderRadius: 0,
        }}
        loading={isLoading}
        hideFooter
        disableColumnResize
        disableColumnSelector
        disableColumnSorting
        getRowId={(row) => row._id}
        rows={products ?? []}
        columns={columns}
        autoHeight
      />
    </Box>
  );
};

export default RecentOrder;
