import { TSidebarItem } from "@/type";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const NestedSidebarItem = ({ item }: { item: TSidebarItem }) => {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const pathName = usePathname();
  const href = `/dashboard/${item.href}`;
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <item.icon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.nestedRoutes &&
            item.nestedRoutes.map((nestedItem) => (
              <Link
                key={nestedItem.href}
                style={{ marginBottom: "8px" }}
                href={nestedItem?.href || ""}
              >
                <ListItem
                  sx={
                    pathName === nestedItem?.href
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
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <nestedItem.icon />
                    </ListItemIcon>
                    <ListItemText primary={nestedItem.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
        </List>
      </Collapse>
    </>
  );
};

export default NestedSidebarItem;
