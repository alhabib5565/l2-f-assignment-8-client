"use client";
import CreateCategoryModal from "@/components/dashboard/categories/category/CreateCategoryModal";
import PaginationForTable from "@/components/shared/PaginationForTable";
import useDebounce from "@/hooks/common/useDebounce";
import { useGetCategoriesQuery } from "@/redux/api/categories/category.api";
import { TMeta } from "@/type";
import { TStatus } from "@/type/category.type";
import { Add, Delete, Edit } from "@mui/icons-material";
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
const CategoryPage = () => {
  const [sortOrder, setSortOrder] = useState("");
  const [status, setStatus] = useState<TStatus | "">("");
  const [queryInfo, setQueryInfo] = React.useState({
    rowsPerPage: 10,
    page: 0,
    searchTerm: "",
  });
  const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const debouncedValue = useDebounce(queryInfo.searchTerm, 500);

  const { data, isLoading } = useGetCategoriesQuery({
    query: `page=${queryInfo.page + 1}&limit=${
      queryInfo.rowsPerPage
    }&searchTerm=${debouncedValue}`,
  });
  const meta = data?.meta as TMeta;

  const handleChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value);
  };

  const handleCeateMainCategoryModalOpen = () => {
    setCreateCategoryModalOpen(true);
  };

  const handleSearchInputChage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryInfo((prev) => ({ ...prev, searchTerm: event.target.value }));
  };

  const columns: GridColDef[] = [
    { field: "categoryId", headerName: "Category ID", width: 120 },
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
          <Image height={50} width={50} src={row?.row.imageURL} alt="" />
        </Box>
      ),
    },
    { field: "categoryName", headerName: "Category Name", flex: 1 },
    {
      field: "mainCategoryName",
      headerName: "Main Category Name",
      flex: 1,
      renderCell: (row) => (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Typography component="p" variant="body1" fontSize={14}>
            {row.row?.mainCategory?.mainCategoryName}
          </Typography>
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <Stack height="100%" direction="row" alignItems="center" gap={1}>
            <Button color="error">
              <Delete />
            </Button>
            <Button>
              <Edit />
            </Button>
          </Stack>
        );
      },
    },
    {
      field: "isDeleted",
      headerName: "Status",
      width: 200,
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
            {`${row.row.isDeleted}`}
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
            Categories
          </Typography>
          <Typography fontWeight={400} variant="body1" component="p">
            Manage your categories
          </Typography>
        </Box>
        <Button onClick={handleCeateMainCategoryModalOpen}>
          <Add /> {"  "}
          Add Category
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
            placeholder="Search..."
            size="small"
            type="search"
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={sortOrder}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Short by date</em>
              </MenuItem>
              <MenuItem value={10}>Newest</MenuItem>
              <MenuItem value={20}>Lowest</MenuItem>
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
          autoHeight
          getRowId={(row) => row._id}
          loading={isLoading}
          hideFooter
          rowHeight={60}
          rows={data?.data || []}
          columns={columns}
        />

        <PaginationForTable
          meta={meta}
          paginationInfo={queryInfo}
          setPaginationInfo={setQueryInfo}
        />
        {createCategoryModalOpen && (
          <CreateCategoryModal
            open={createCategoryModalOpen}
            setOpen={setCreateCategoryModalOpen}
          />
        )}
      </Box>
    </>
  );
};

export default CategoryPage;
