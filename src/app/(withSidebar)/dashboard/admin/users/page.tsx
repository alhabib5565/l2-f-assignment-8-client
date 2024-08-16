"use client";

import OrderOverviewCard from "@/components/dashboard/admin/orders/OrderOverviewCard";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import PaginationForTable from "@/components/shared/PaginationForTable";
import { ACTIVE_STATUS, user_role } from "@/constent";
import useDebounce from "@/hooks/common/useDebounce";
import {
  useUpdateUserMutation,
  useGetAllUserQuery,
} from "@/redux/api/user.api";
import { formatOrderDate } from "@/utils/formatOrderData";
import {
  CheckCircle,
  Delete,
  PeopleAlt,
  RemoveCircle,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { toast } from "sonner";

const UsersList = () => {
  //state
  const [sortInfo, setSortInfo] = useState({
    role: "",
    status: "",
  });

  const [queryInfo, setQueryInfo] = React.useState({
    rowsPerPage: 10,
    page: 0,
    searchTerm: "",
    sortOrder: "",
  });

  const debouncedValue = useDebounce(queryInfo.searchTerm, 500);

  //api hit
  const [updateUserInfo, { isLoading: updating }] = useUpdateUserMutation();
  const { data, isLoading } = useGetAllUserQuery({
    query: `page=${queryInfo.page + 1}&limit=${
      queryInfo.rowsPerPage
    }&searchTerm=${debouncedValue}&sort=${queryInfo.sortOrder}${
      sortInfo.role && "&role=" + sortInfo.role
    }${sortInfo.status && "&status=" + sortInfo.status}
    `,
  });

  const users = data?.data;
  const meta = data?.meta;

  //handler

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setQueryInfo((prev) => ({ ...prev, sortOrder: event.target.value }));
  };

  const handleSortRoleChange = (event: SelectChangeEvent) => {
    setSortInfo((prev) => ({ ...prev, role: event.target.value }));
  };

  const handleSortStatusChange = (event: SelectChangeEvent) => {
    setSortInfo((prev) => ({ ...prev, status: event.target.value }));
  };

  const handleSearchInputChage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryInfo((prev) => ({ ...prev, searchTerm: event.target.value }));
  };

  const updateUser = async (data: any, id: string) => {
    const response = (await updateUserInfo({ data, id })) as any;
    if (response?.data?.success) {
      toast.success(response?.data?.message || "Successful");
    } else {
      toast.error(response?.error?.message || "Failed");
    }
  };

  // table columns
  const columns: GridColDef[] = [
    { field: "userId", headerName: "ID", width: 90 },
    {
      field: "imageURL",
      headerName: "Image",
      renderCell: (row) => (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Avatar
            // src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp"
            sx={{ width: 40, height: 40, bgcolor: "primary.main" }}
            variant="rounded"
          >
            {(row.row.name as string).slice(0, 2)}
          </Avatar>
          {/* <Image height={50} width={50} src={row?.row.imageURL} alt="" /> */}
        </Box>
      ),
    },
    { field: "name", headerName: " Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "createdAt",
      headerName: "Joined",
      // type: "number",
      width: 170,
      valueGetter: (value) => formatOrderDate(value),
    },
    {
      field: "isDeleted",
      headerName: "Status",
      width: 150,
      renderCell: (row) => (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={row.row.status}
              disabled={updating}
              onChange={(e) =>
                updateUser({ status: e.target.value }, row?.row?.userId)
              }
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Blocked"}>Blocked</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "role",
      width: 150,
      renderCell: (row) => (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              disabled={updating}
              value={row.row.role}
              onChange={(e) =>
                updateUser({ role: e.target.value }, row?.row?.userId)
              }
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={user_role.ADMIN}>Admin</MenuItem>
              <MenuItem value={user_role.CUSTOMER}>Customer</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 100,
      headerAlign: "right",
      renderCell: (row) => {
        return (
          <Stack
            height="100%"
            direction="row"
            alignItems="center"
            justifyContent="end"
            flexShrink={"inherit"}
          >
            <IconButton
              onClick={() => updateUser({ isDeleted: true }, row.row?.userId)}
              size="small"
              aria-label="delete"
              disabled={row.row?.isDeleted}
            >
              <Delete color="error" />
            </IconButton>
            {/* <IconButton size="small" aria-label="delete">
              <Block color="error" />
            </IconButton> */}
          </Stack>
        );
      },
    },
  ];

  return (
    <Box>
      <PageHeader pageName="Users" />
      <Stack mb={3} gap={2} direction="row" flexWrap="wrap">
        <Box sx={{ flex: 1 }}>
          <OrderOverviewCard
            title="Total Users"
            count={234}
            Icon={<PeopleAlt sx={{ color: "#f3a0ff", fontSize: "50px" }} />}
            gradientStartColor="#be0ee1"
            gradientEndColor="#ed68ff"
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <OrderOverviewCard
            title="Active Users"
            count={6}
            Icon={<CheckCircle sx={{ color: "#89ecb3", fontSize: "50px" }} />}
            gradientStartColor="#1a9f53"
            gradientEndColor="#4eda89"
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <OrderOverviewCard
            title="Blocked Users"
            count={2344}
            Icon={<RemoveCircle sx={{ color: "#ff9baa", fontSize: "50px" }} />}
            gradientStartColor="#f11133"
            gradientEndColor="#ff6179"
          />
        </Box>
      </Stack>

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
          <TextField
            onChange={handleSearchInputChage}
            placeholder="Search..."
            size="small"
            type="search"
          />{" "}
          <Box display="flex" gap={1}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={sortInfo.role}
                onChange={handleSortRoleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Short by role</em>
                </MenuItem>
                <MenuItem value={user_role.ADMIN}>Admin</MenuItem>
                <MenuItem value={user_role.CUSTOMER}>Customer</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={sortInfo.status}
                onChange={handleSortStatusChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>Short by status</em>
                </MenuItem>
                <MenuItem value={ACTIVE_STATUS.Active}>
                  {ACTIVE_STATUS.Active}
                </MenuItem>
                <MenuItem value={ACTIVE_STATUS.Blocked}>
                  {ACTIVE_STATUS.Blocked}
                </MenuItem>
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
            rows={users ?? []}
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

export default UsersList;
