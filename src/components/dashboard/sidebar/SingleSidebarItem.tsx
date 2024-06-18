import { TSidebarItem } from "@/type";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SingleSidebarItem = ({ item }: { item: TSidebarItem }) => {
  const pathName = usePathname();

  return (
    <Link style={{ marginBottom: "8px" }} href={item.href || ""}>
      <ListItem
        sx={
          pathName === item.href
            ? {
                borderRight: "3px solid #017ADA",
                bgcolor: `rgba(1, 122, 218, .2)`,
                "& svg": {
                  color: "primary.main",
                },
                "& span": {
                  color: "primary.main",
                },
              }
            : {}
        }
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SingleSidebarItem;
