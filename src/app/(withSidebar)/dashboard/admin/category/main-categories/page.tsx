"use client";
import CreateMainCategoryModal from "@/components/dashboard/categories/mainCategory/CreateMainCategoryModal";
import { useGetMainCategoriesQuery } from "@/redux/api/categories/mainCategory.api";
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
  const [age, setAge] = useState("");
  const [status, setStatus] = useState<TStatus | "">("");
  const [createMainCategoryModalOpen, setCreateMainCategoryModalOpen] =
    useState(false);
  const { data, isLoading } = useGetMainCategoriesQuery({});
  console.log(data);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleCeateMainCategoryModalOpen = () => {
    setCreateMainCategoryModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "mainCategoryId", headerName: "Main Category ID", width: 150 },
    {
      field: "imageURL",
      headerName: "Image",
      renderCell: (row) => {
        console.log(row.row.imageURL);
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

  const rows = [
    {
      id: "1",
      mainCategoryName: "Electronics",
      imageURL: "https://example.com/images/electronics.jpg",
      metaTitle: "Electronics - Latest Gadgets and Devices",
      // metaDescription:
      // "Find the latest electronics including smartphones, laptops, and accessories.",
      isDeleted: false,
    },
    {
      id: "2",
      mainCategoryName: "Books",
      imageURL: "https://example.com/images/books.jpg",
      metaTitle: "Books - Novels, Non-Fiction, and More",
      metaDescription:
        "Discover a wide range of books including bestsellers, novels, and educational materials.",
      isDeleted: false,
    },
    {
      id: "3",
      mainCategoryName: "Fashion",
      imageURL: "https://example.com/images/fashion.jpg",
      metaTitle: "Fashion - Trendy Apparel and Accessories",
      metaDescription:
        "Shop the latest fashion trends including clothes, shoes, and accessories.",
      isDeleted: false,
    },
    {
      id: "4",
      mainCategoryName: "Home & Garden",
      imageURL: "https://example.com/images/home-garden.jpg",
      metaTitle: "Home & Garden - Furniture, Decor, and More",
      metaDescription:
        "Find everything you need for your home and garden including furniture, decor, and tools.",
      isDeleted: false,
    },
    {
      id: "5",
      mainCategoryName: "Toys",
      imageURL: "https://example.com/images/toys.jpg",
      metaTitle: "Toys - Fun and Educational Toys for Kids",
      metaDescription:
        "Explore a wide range of toys including educational and fun toys for kids of all ages.",
      isDeleted: false,
    },
    {
      id: "6",
      mainCategoryName: "Sports",
      imageURL: "https://example.com/images/sports.jpg",
      metaTitle: "Sports - Equipment and Apparel",
      metaDescription:
        "Get the best sports equipment and apparel for all your favorite activities.",
      isDeleted: false,
    },
    {
      id: "7",
      mainCategoryName: "Health & Beauty",
      imageURL: "https://example.com/images/health-beauty.jpg",
      metaTitle: "Health & Beauty - Skincare, Makeup, and Wellness",
      metaDescription:
        "Discover a range of health and beauty products including skincare, makeup, and wellness items.",
      isDeleted: false,
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
          getRowId={(row) => row.mainCategoryId}
          loading={isLoading}
          rowHeight={60}
          rows={data?.data || []}
          columns={columns}
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
