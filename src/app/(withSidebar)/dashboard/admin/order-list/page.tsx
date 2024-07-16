"use client";
import OrderOverviewCard from "@/components/dashboard/admin/orders/OrderOverviewCard";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import {
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orders.api";
import {
  Delete,
  Edit,
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
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { TOrder } from "@/type/order.type";
import Image from "next/image";
import { ORDER_STATUS } from "@/constent";
import Link from "next/link";
import { formatOrderDate } from "@/utils/formatOrderData";
import { toast } from "sonner";

const OrderList = () => {
  const [updateStatus, { isLoading: updateStatusLoading }] =
    useUpdateOrderMutation();
  const handleStatusUpdate = useCallback(
    async (event: SelectChangeEvent, id: string) => {
      const response = (await updateStatus({
        id,
        data: { orderStatus: event.target.value },
      })) as any;

      if (response.data) {
        toast.success(response.data.message);
      } else {
        toast.error("Status update failed");
      }
    },
    [updateStatus]
  );

  const { data, isLoading } = useGetAllOrdersQuery({});
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
              src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
              sx={{ width: 40, height: 40, bgcolor: "lightgray" }}
              variant="rounded"
            />
            <Typography fontSize={14}>MD Al-Habib</Typography>
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
                disabled={updateStatusLoading}
                onChange={(e) => handleStatusUpdate(e, row.row?.orderId)}
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
        valueGetter: (value) => formatOrderDate(value),
      },
      {
        field: "totalPrice",
        headerName: "Total Price",
        type: "number",
        width: 100,
        valueGetter: (value) => `TK ${value}`,
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell: (row) => {
          return (
            <Stack
              height="100%"
              direction="row"
              alignItems="center"
              justifyContent="end"
              gap={1}
            >
              <Link href={`order-list/${row.row.orderId}`}>
                <Button
                  variant="outlined"
                  sx={{ height: 40, width: 40, px: 0 }}
                  color="success"
                >
                  <Visibility />
                </Button>
              </Link>
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
    [handleStatusUpdate, updateStatusLoading]
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
