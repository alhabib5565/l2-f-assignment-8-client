"use client";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { TSidebarItem } from "@/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import SingleSidebarItem from "./SingleSidebarItem";
import NestedSidebarItem from "./NestedSidebarItem";

const SidebarItem = ({ item }: { item: TSidebarItem }) => {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const pathName = usePathname();
  const href = `/dashboard/${item.href}`;
  return (
    <>
      {item.nestedRoutes ? (
        <NestedSidebarItem item={item} />
      ) : (
        <SingleSidebarItem item={item} />
        // <Link style={{ marginBottom: "8px" }} href={href}>
        //   <ListItem
        //     sx={
        //       pathName === href
        //         ? {
        //             borderRight: "3px solid #017ADA",
        //             bgcolor: `rgba(1, 122, 218, .2)`,
        //             "& svg": {
        //               color: "primary.main",
        //             },
        //             "& span": {
        //               color: "primary.main",
        //             },
        //           }
        //         : {}
        //     }
        //     disablePadding
        //   >
        //     <ListItemButton>
        //       <ListItemIcon>
        //         <item.icon />
        //       </ListItemIcon>
        //       <ListItemText primary={item.name} />
        //     </ListItemButton>
        //   </ListItem>
        // </Link>
      )}
    </>
  );
};

export default SidebarItem;
