"use client";
import OrderOverviewCard from "@/components/dashboard/admin/orders/OrderOverviewCard";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import {
  useGetAllOrdersForUserQuery,
  useGetAllOrdersQuery,
  useGetUserOrderStatusOverviewQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orders.api";
import {
  Cancel,
  LocalShipping,
  Pending,
  RemoveCircle,
  ShoppingBag,
  Visibility,
} from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import {
  Avatar,
  Box,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { TOrder } from "@/type/order.type";
import { ORDER_STATUS } from "@/constent";
import Link from "next/link";
import { formatOrderDate } from "@/utils/formatOrderData";
import { toast } from "sonner";
import { getOrderStatus } from "@/utils/orderStatusWithIcon";

const YourOrdersPage = () => {
  const [updateStatus, { isLoading: updating }] = useUpdateOrderMutation();

  const handleUpdateOrderInfo = useCallback(
    async (data: any, id: string) => {
      const response = (await updateStatus({ id, data })) as any;

      if (response.data?.success) {
        toast.success("Order Canceled" || response.data?.message);
      } else {
        toast.error(response.error.message);
      }
    },
    [updateStatus]
  );

  const { data, isLoading } = useGetAllOrdersForUserQuery({});
  const { data: userOrderStatusOverview } = useGetUserOrderStatusOverviewQuery(
    {}
  );

  const columns = useMemo<GridColDef<TOrder>[]>(
    () => [
      {
        field: "orderId",
        headerName: "OrdereId",
        type: "string",
        width: 100,
        valueGetter: (value) => {
          return `#${value}`;
        },
      },
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
            <Avatar
              // src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
              sx={{ width: 40, height: 40, bgcolor: "lightgray" }}
              variant="rounded"
            >
              {(row.row?.user?.name as string).slice(0, 2)}
            </Avatar>
            <Typography fontSize={14}>{row.row?.user?.name}</Typography>
          </Box>
        ),
      },
      {
        field: "products",
        headerName: "Products",
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
            <Chip
              // @ts-ignore
              icon={getOrderStatus(row.row.orderStatus, "20px")}
              label={row.row.orderStatus}
            />
          </Box>
        ),
      },
      {
        field: "createdAt",
        headerName: "Created Time",
        type: "string",
        width: 200,
        valueGetter: (value) => formatOrderDate(value),
      },
      {
        field: "paymentInfo",
        headerName: "Payment Method",
        width: 200,
        valueGetter: (value: any) => `${value?.method}`,
        // renderCell: (row) => <Rating value={row.row.rating} readOnly />,
      },
      {
        field: "totalPrice",
        headerName: "Total Price",
        width: 150,
        valueGetter: (value) => `TK ${value}`,
      },
      {
        field: "action",
        headerName: "Action",
        type: "number",
        width: 150,
        renderCell: (row) => {
          return (
            <Stack
              height="100%"
              direction="row"
              alignItems="center"
              justifyContent="end"
              gap={1}
            >
              <Link href={`my-orders/${row.row.orderId}`}>
                <IconButton color="success">
                  <Visibility />
                </IconButton>
              </Link>
              <IconButton
                onClick={() =>
                  handleUpdateOrderInfo(
                    {
                      orderStatus: ORDER_STATUS.Cancelled,
                    },
                    row.row.orderId
                  )
                }
                color="error"
              >
                <Cancel />
              </IconButton>
            </Stack>
          );
        },
      },
    ],
    [handleUpdateOrderInfo]
  );

  return (
    <Box>
      <PageHeader pageName="Orders" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Pending Orders"
            count={userOrderStatusOverview?.data[3]?.total || 0}
            Icon={<Pending sx={{ color: "#f3a0ff", fontSize: "50px" }} />}
            gradientStartColor="#be0ee1"
            gradientEndColor="#ed68ff"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Shipped Orders"
            count={userOrderStatusOverview?.data[4]?.total || 0}
            Icon={<LocalShipping sx={{ color: "#96cefa", fontSize: "50px" }} />}
            gradientStartColor="#2b77e5"
            gradientEndColor="#64b3f6"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Accepted Orders"
            count={userOrderStatusOverview?.data[0]?.total || 0}
            Icon={<ShoppingBag sx={{ color: "#89ecb3", fontSize: "50px" }} />}
            gradientStartColor="#1a9f53"
            gradientEndColor="#4eda89"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Cancelled Orders"
            count={userOrderStatusOverview?.data[1]?.total || 0}
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

export default YourOrdersPage;
