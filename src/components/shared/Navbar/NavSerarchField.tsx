"use client";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { useGetAllProductsQuery } from "@/redux/api/product.api";
import { SyntheticEvent, useState } from "react";
import Link from "next/link";
import { TProduct } from "@/type";
import useDebounce from "@/hooks/common/useDebounce";
import SearchIcon from "@mui/icons-material/Search";

type TSearchOptions = Pick<TProduct, "productName" | "_id">;

const NavSearchField = () => {
  const [searchableText, setSearchableText] = useState<string>("");
  const debounced = useDebounce(searchableText, 500);
  const { data, isLoading } = useGetAllProductsQuery({
    query: `fields=productName&searchTerm=${debounced}`,
  });

  const handleInputChange = (
    event: SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setSearchableText(newInputValue);
  };

  const options: TSearchOptions[] = data?.data || [
    { productName: "", _id: "" },
  ];

  return (
    <Autocomplete
      sx={{ flex: 1, bgcolor: "white", borderRadius: 1, minWidth: 150 }}
      id="free-solo-demo"
      freeSolo
      size="small"
      loading={isLoading}
      inputValue={searchableText}
      loadingText="Please wait..."
      onInputChange={handleInputChange}
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.productName
      }
      renderOption={(props, option) => {
        //@ts-ignore
        const { key, ...restProps } = props;
        return (
          <Link
            style={{ height: "100%", width: "100%" }}
            href={`products/${option._id}`}
            passHref
            key={option._id}
          >
            <Typography {...restProps}>
              {" "}
              <SearchIcon sx={{ mr: 2 }} fontSize="medium" />{" "}
              {option.productName}
            </Typography>
          </Link>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search Products..."
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
};

export default NavSearchField;
