"use client";
import CreateSubCategoryModal from "@/components/dashboard/categories/subCategory/CreateSubCategoryModal";
import PaginationForTable from "@/components/shared/PaginationForTable";
import useDebounce from "@/hooks/common/useDebounce";
import { useGetSubCategoriesQuery } from "@/redux/api/categories/subCategory.api";
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
const SubCategoryPage = () => {
  //state
  const [sortOrder, setSortOrder] = useState("");
  const [status, setStatus] = useState<TStatus | "">("");
  const [createSubCategoryModalOpen, setCreateSubCategoryModalOpen] =
    useState(false);
  const [queryInfo, setQueryInfo] = React.useState({
    rowsPerPage: 10,
    page: 0,
    searchTerm: "",
    sortOrder: "",
  });

  const debouncedValue = useDebounce(queryInfo.searchTerm, 500);

  //query
  const { data, isLoading } = useGetSubCategoriesQuery({
    query: `page=${queryInfo.page + 1}&limit=${
      queryInfo.rowsPerPage
    }&searchTerm=${debouncedValue}&sort=${queryInfo.sortOrder}`,
  });
  const meta = data?.meta;

  //handler

  const handleSortOrderChange = (event: SelectChangeEvent) => {
    setQueryInfo((prev) => ({ ...prev, sortOrder: event.target.value }));
  };

  const handleCeateSubCategoryModalOpen = () => {
    setCreateSubCategoryModalOpen(true);
  };

  const handleSearchInputChage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQueryInfo((prev) => ({ ...prev, searchTerm: event.target.value }));
  };

  // table columns
  const columns: GridColDef[] = [
    { field: "subCategoryId", headerName: "ID", width: 90 },
    {
      field: "imageURL",
      headerName: "Image",
      renderCell: (row) => (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image height={50} width={50} src={row?.row.imageURL} alt="" />
        </Box>
      ),
    },
    { field: "subCategoryName", headerName: "Sub Category Name", flex: 1 },
    { field: "metaTitle", headerName: "Meta Title", flex: 1 },
    {
      field: "isDeleted",
      headerName: "Status",
      width: 150,
      renderCell: (row) => (
        <FormControl size="small" sx={{ m: 1, minWidth: 100 }}>
          <Select
            value={row.row.status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"Blocked"}>Blocked</MenuItem>
          </Select>
        </FormControl>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
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
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography fontWeight={600} variant="h6" component="h4">
            Sub Category
          </Typography>
          <Typography fontWeight={400} variant="body1" component="p">
            Manage your Sub categories
          </Typography>
        </Box>
        <Button onClick={handleCeateSubCategoryModalOpen}>
          <Add /> {"  "}
          Add Sub Category
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
          autoHeight
          loading={isLoading}
          hideFooter
          rowHeight={60}
          rows={data?.data || []}
          getRowId={(row) => row._id}
          columns={columns}
        />

        <PaginationForTable
          meta={meta}
          paginationInfo={queryInfo}
          setPaginationInfo={setQueryInfo}
        />

        {createSubCategoryModalOpen && (
          <CreateSubCategoryModal
            open={createSubCategoryModalOpen}
            setOpen={setCreateSubCategoryModalOpen}
          />
        )}
      </Box>
    </>
  );
};

export default SubCategoryPage;
