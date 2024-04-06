import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TSidebarItem } from "@/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarItem = ({ item }: { item: TSidebarItem }) => {
  const pathName = usePathname();
  const href = `/dashboard/${item.href}`;
  return (
    <Link style={{ marginBottom: "8px" }} href={href}>
      <ListItem
        sx={
          pathName === href
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

export default SidebarItem;
