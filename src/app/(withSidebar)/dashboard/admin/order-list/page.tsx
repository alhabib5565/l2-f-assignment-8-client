"use client";
import OrderOverviewCard from "@/components/dashboard/admin/orders/OrderOverviewCard";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import { useGetAllOrdersQuery } from "@/redux/api/orders.api";
import {
  Delete,
  Edit,
  LocalShipping,
  Pending,
  RemoveCircle,
  ShoppingBag,
} from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { TOrder, TOrderStatus } from "@/type/order.type";
import Image from "next/image";
import { months, ORDER_STATUS } from "@/constent";

const OrderList = () => {
  const [status, setStatus] = useState<TOrderStatus | "">("Pending");
  console.log(status);

  const { data, isLoading } = useGetAllOrdersQuery({});
  const columns = useMemo<GridColDef<TOrder>[]>(
    () => [
      { field: "orderId", headerName: "OrdereId", type: "string", width: 100 },
      {
        field: "user",
        headerName: "User",
        type: "custom",
        flex: 1,
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
            <Image
              height={40}
              width={40}
              src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
              alt=""
              style={{
                borderRadius: "500%",
              }}
            />
            <Typography>MD Al-Habib</Typography>
          </Box>
        ),
      },
      {
        field: "products",
        headerName: "Products",
        type: "string",
        width: 150,
        renderCell: (row) => (
          <Typography
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            ({row.row.products.length}) items
          </Typography>
        ),
      },
      {
        field: "orderStatus",
        headerName: "Order Status",
        type: "singleSelect",
        width: 150,

        renderCell: (row) => (
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={row.row.orderStatus}
                onChange={(e) => setStatus(e.target.value as typeof status)}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {Object.keys(ORDER_STATUS).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ),
      },
      {
        field: "createdAt",
        headerName: "Created Time",
        type: "number",
        width: 200,
        valueGetter: (value) => {
          const date = new Date(value);

          const day = date.getDate();
          const month = months[date.getMonth()];
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");

          return `${day} ${month} ${year} ${hours}:${minutes}`;
        },
      },
      {
        field: "totalPrice",
        headerName: "Total Price",
        type: "number",
        width: 100,
        valueGetter: (value) => {
          return `TK ${value}`;
        },
      },
      {
        field: "action",
        headerName: "Action",
        width: 200,
        type: "number",
        renderCell: () => {
          return (
            <Stack
              height="100%"
              direction="row"
              alignItems="center"
              justifyContent="end"
              gap={1}
            >
              <Button
                variant="outlined"
                sx={{ height: 40, width: 40, px: 0 }}
                color="error"
              >
                <Delete />
              </Button>
              <Button
                variant="outlined"
                sx={{ height: 40, width: 40, px: 0 }}
                color="info"
              >
                <Edit />
              </Button>
            </Stack>
          );
        },
      },
    ],
    []
  );

  return (
    <Box>
      <PageHeader pageName="Orders" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Pending Orders"
            count={234}
            Icon={<Pending sx={{ color: "#f3a0ff", fontSize: "50px" }} />}
            gradientStartColor="#be0ee1"
            gradientEndColor="#ed68ff"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Shipped Orders"
            count={534}
            Icon={<LocalShipping sx={{ color: "#96cefa", fontSize: "50px" }} />}
            gradientStartColor="#2b77e5"
            gradientEndColor="#64b3f6"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Accepted Orders"
            count={6}
            Icon={<ShoppingBag sx={{ color: "#89ecb3", fontSize: "50px" }} />}
            gradientStartColor="#1a9f53"
            gradientEndColor="#4eda89"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Cancelled Orders"
            count={2344}
            Icon={<RemoveCircle sx={{ color: "#ff9baa", fontSize: "50px" }} />}
            gradientStartColor="#f11133"
            gradientEndColor="#ff6179"
          />
        </Grid>
      </Grid>

      <Box sx={{ height: 300, width: "100%", mt: 3 }}>
        <DataGrid
          columns={columns}
          rows={data?.data || []}
          loading={isLoading}
          autoHeight
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default OrderList;
