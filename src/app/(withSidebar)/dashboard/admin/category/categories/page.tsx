"use client";
import CreateCategoryModal from "@/components/dashboard/categories/category/CreateCategoryModal";
import { useGetCategoriesQuery } from "@/redux/api/categories/category.api";
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
  const [age, setAge] = useState("");
  const [status, setStatus] = useState<TStatus | "">("");
  const [createCategoryModalOpen, setCreateCategoryModalOpen] = useState(false);
  const { data, isLoading } = useGetCategoriesQuery({});

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleCeateMainCategoryModalOpen = () => {
    setCreateCategoryModalOpen(true);
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
          my: 3,
        }}
        bgcolor="white"
        padding={2}
        borderRadius={2}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <TextField placeholder="Search..." size="small" type="search" />
          <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={age}
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
          autoHeight
          getRowId={(row) => row._id}
          loading={isLoading}
          rowHeight={60}
          rows={data?.data || []}
          columns={columns}
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
