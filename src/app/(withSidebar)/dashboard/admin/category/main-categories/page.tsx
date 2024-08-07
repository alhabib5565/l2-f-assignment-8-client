"use client";
import CreateMainCategoryModal from "@/components/dashboard/categories/mainCategory/CreateMainCategoryModal";
import PaginationForTable from "@/components/shared/PaginationForTable";
import useDebounce from "@/hooks/common/useDebounce";
import { useGetMainCategoriesQuery } from "@/redux/api/categories/mainCategory.api";
import { TMeta } from "@/type";
import { TStatus } from "@/type/category.type";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import React, { useState } from "react";
const MainCategorypage = () => {
  //state
  const [queryInfo, setQueryInfo] = React.useState({
    rowsPerPage: 10,
    page: 0,
    searchTerm: "",
    sortOrder: "",
  });
  const [status, setStatus] = useState<TStatus | "">("");
  const [createMainCategoryModalOpen, setCreateMainCategoryModalOpen] =
    useState(false);

  const debouncedValue = useDebounce(queryInfo.searchTerm, 500);

  //query
  const { data, isLoading } = useGetMainCategoriesQuery({
    query: `page=${queryInfo.page + 1}&limit=${
      queryInfo.rowsPerPage
    }&searchTerm=${debouncedValue}&sort=${queryInfo.sortOrder}`,
  });
  const meta = data?.meta as TMeta;

  // handler
  const handleCeateMainCategoryModalOpen = () => {
    setCreateMainCategoryModalOpen(true);
  };

  const handleSearchInputChage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryInfo((prev) => ({ ...prev, searchTerm: event.target.value }));
  };

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setQueryInfo((prev) => ({ ...prev, sortOrder: event.target.value }));
  };

  //columns
  const columns: GridColDef[] = [
    { field: "mainCategoryId", headerName: "Main Category ID", width: 150 },
    {
      field: "imageURL",
      headerName: "Image",
      renderCell: (row) => {
        return (
          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
            }}
          >
            <Image height={50} width={50} src={row?.row.imageURL} alt="" />
          </Box>
        );
      },
    },
    { field: "mainCategoryName", headerName: "Main Category Name", flex: 1 },
    { field: "metaTitle", headerName: "Meta Title", flex: 1 },
    {
      field: "isDeleted",
      headerName: "Status",
      width: 220,
      renderCell: (row) => (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              padding: "0px 10px",
              border: "2px solid green",
              borderRadius: 10,
            }}
          >
            {`${row.row.status}`}
          </Typography>
          <FormControl size="small" sx={{ m: 1, minWidth: 100 }}>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Status</em>
              </MenuItem>
              <MenuItem value={"Active"}>Active</MenuItem>
              <MenuItem value={"Blocked"}>Blocked</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography fontWeight={600} variant="h6" component="h4">
            Main Category
          </Typography>
          <Typography fontWeight={400} variant="body1" component="p">
            Manage your main categories
          </Typography>
        </Box>
        <Button onClick={handleCeateMainCategoryModalOpen}>
          <Add /> {"  "}
          Add Main Category
        </Button>
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
            value={queryInfo.searchTerm}
            placeholder="Search..."
            size="small"
            type="search"
          />
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
        </Stack>
        <DataGrid
          sx={{
            border: "none",
            borderTop: "1px solid lightgray",
            borderBottom: "1px solid lightgray",
            borderRadius: 0,
          }}
          hideFooter
          getRowId={(row) => row.mainCategoryId}
          loading={isLoading}
          rowHeight={60}
          rows={data?.data || []}
          columns={columns}
        />

        <PaginationForTable
          meta={meta}
          paginationInfo={queryInfo}
          setPaginationInfo={setQueryInfo}
        />

        {createMainCategoryModalOpen && (
          <CreateMainCategoryModal
            open={createMainCategoryModalOpen}
            setOpen={setCreateMainCategoryModalOpen}
          />
        )}
      </Box>
    </>
  );
};

export default MainCategorypage;
