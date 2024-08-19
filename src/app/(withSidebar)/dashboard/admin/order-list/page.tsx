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
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { TOrder } from "@/type/order.type";
import { ORDER_STATUS } from "@/constent";
import Link from "next/link";
import { formatOrderDate } from "@/utils/formatOrderData";
import { toast } from "sonner";
import { useGetOrderStatusOverviewQuery } from "@/redux/api/analytics.api";
import useDebounce from "@/hooks/common/useDebounce";
import PaginationForTable from "@/components/shared/PaginationForTable";

const OrderList = () => {
  const [sortInfo, setSortInfo] = useState({
    orderStatus: "",
  });

  const [queryInfo, setQueryInfo] = useState({
    rowsPerPage: 10,
    page: 0,
    searchTerm: "",
    sortOrder: "",
  });

  const debouncedValue = useDebounce(queryInfo.searchTerm, 500);

  const [updateStatus, { isLoading: updateStatusLoading }] =
    useUpdateOrderMutation();
  const { data: orderStatusOverview } = useGetOrderStatusOverviewQuery({});

  const handleStatusUpdate = useCallback(
    async (event: SelectChangeEvent, id: string) => {
      const response = (await updateStatus({
        id,
        data: { orderStatus: event.target.value },
      })) as any;

      if (response.data?.success) {
        toast.success(response.data?.message);
      } else {
        toast.error(response.error.message);
      }
    },
    [updateStatus]
  );

  const { data, isLoading } = useGetAllOrdersQuery({
    query: `page=${queryInfo.page + 1}&limit=${
      queryInfo.rowsPerPage
    }&searchTerm=${debouncedValue}&sort=${queryInfo.sortOrder}${
      sortInfo.orderStatus && "&orderStatus=" + sortInfo.orderStatus
    }
    `,
  });
  const orders = data?.data;
  const meta = data?.meta;

  //handler

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setQueryInfo((prev) => ({ ...prev, sortOrder: event.target.value }));
  };

  const handleSortOrderStatusChange = (event: SelectChangeEvent) => {
    setSortInfo((prev) => ({ ...prev, orderStatus: event.target.value }));
  };

  const handleSearchInputChage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryInfo((prev) => ({ ...prev, searchTerm: event.target.value }));
  };

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
        field: "paymentInfo",
        headerName: "Payment Method",
        width: 200,
        valueGetter: (value: any) => `${value?.method}`,
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
        type: "number",
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
            count={orderStatusOverview?.data[3]?.total || 0}
            Icon={<Pending sx={{ color: "#f3a0ff", fontSize: "50px" }} />}
            gradientStartColor="#be0ee1"
            gradientEndColor="#ed68ff"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Shipped Orders"
            count={orderStatusOverview?.data[5]?.total || 0}
            Icon={<LocalShipping sx={{ color: "#96cefa", fontSize: "50px" }} />}
            gradientStartColor="#2b77e5"
            gradientEndColor="#64b3f6"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Accepted Orders"
            count={orderStatusOverview?.data[0]?.total || 0}
            Icon={<ShoppingBag sx={{ color: "#89ecb3", fontSize: "50px" }} />}
            gradientStartColor="#1a9f53"
            gradientEndColor="#4eda89"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Cancelled Orders"
            count={orderStatusOverview?.data[1]?.total || 0}
            Icon={<RemoveCircle sx={{ color: "#ff9baa", fontSize: "50px" }} />}
            gradientStartColor="#f11133"
            gradientEndColor="#ff6179"
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          border: "1px solid lightgray",
        }}
        bgcolor="white"
        borderRadius={2}
        mt={3}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mx={1}
          my={2}
        >
          <TextField
            onChange={handleSearchInputChage}
            placeholder="Search..."
            size="small"
            type="search"
          />{" "}
          <Box display="flex" gap={1}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={sortInfo.orderStatus}
                onChange={handleSortOrderStatusChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Short by status</em>
                </MenuItem>
                {Object.keys(ORDER_STATUS).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                <MenuItem value="-createdAt">Newest</MenuItem>
                <MenuItem value="createdAt">Lowest</MenuItem>
              </Select>
            </FormControl>
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
            rows={orders ?? []}
            columns={columns}
            autoHeight
          />
        </Box>

        <PaginationForTable
          meta={meta}
          paginationInfo={queryInfo}
          setPaginationInfo={setQueryInfo}
        />
      </Box>
    </Box>
  );
};

export default OrderList;
