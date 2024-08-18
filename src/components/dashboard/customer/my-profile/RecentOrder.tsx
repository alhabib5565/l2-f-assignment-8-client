import { useGetAllOrdersForUserQuery } from "@/redux/api/orders.api";
import { TOrder } from "@/type/order.type";
import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

const RecentOrder = () => {
  //query
  const { data, isLoading } = useGetAllOrdersForUserQuery({ query: "limit=5" });
  const orders = data?.data as TOrder[];

  // const products = orders
  //   ?.map((orderProducts) => orderProducts.products)
  //   .flat();

  const columns: GridColDef[] = [
    {
      field: "orderId",
      headerName: "Order ID",
      width: 130,
      valueGetter: (value) => `#${value}`,
    },
    {
      field: "products",
      headerName: "Products",
      flex: 1,
      minWidth: 200,
      renderCell: (row) => {
        console.log(row.row?.products);
        return (
          <Stack direction="column" gap={1} py={1}>
            {row.row?.products?.map((product: any) => (
              <Box
                key={product?.productId}
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Avatar
                  src={product?.thumbnail}
                  sx={{ width: 40, height: 40, bgcolor: "lightgray" }}
                  variant="rounded"
                />
                <Typography fontSize={14}>{product?.productName}</Typography>
              </Box>
            ))}
          </Stack>
        );
      },
    },
    {
      field: "paymentInfo",
      headerName: "Payment Method",
      width: 200,
      valueGetter: (value: any) => `${value?.method} Item`,
      // renderCell: (row) => <Rating value={row.row.rating} readOnly />,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
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
        getRowHeight={() => "auto"}
        getRowId={(row) => row._id}
        rows={orders ?? []}
        columns={columns}
        autoHeight
      />
    </Box>
  );
};

export default RecentOrder;
