"use client";
import { Breadcrumbs, Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "@mui/material/Link";
import React from "react";
import { NavigateNextOutlined } from "@mui/icons-material";

type TPageHeaderProps = {
  pageName: string;
};
const PageHeader = ({ pageName }: TPageHeaderProps) => {
  const pathName = usePathname();
  const paths = pathName.split("/").filter((x) => x !== "");

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        bgcolor: "white",
        p: 2,
        borderRadius: 1,
        mb: 3,
        boxShadow: 1,
      }}
    >
      <Typography fontWeight={700} variant="h4" component="h4" fontSize={22}>
        {pageName}
      </Typography>
      <Breadcrumbs separator={<NavigateNextOutlined fontSize="small" />}>
        {paths.map((item, index) => (
          <Typography
            textTransform="capitalize"
            key={index}
            color="text.primary"
          >
            {item}
          </Typography>
        ))}
      </Breadcrumbs>
    </Stack>
  );
};

export default PageHeader;
