import { user_role } from "@/constent";
import { TSidebarItem, TUserRole } from "@/type";
import ViewListIcon from "@mui/icons-material/ViewList";

export const generageSidebarItems = (role: TUserRole) => {
  const sidebarItems: TSidebarItem[] = [];

  switch (role) {
    case user_role.ADMIN:
      sidebarItems.push({
        name: "Products",
        href: "products",
        icon: ViewListIcon,
      });
      break;
    case user_role.CUSTOMER:
      sidebarItems.push({
        name: "Products",
        href: "products",
        icon: ViewListIcon,
      });
      break;

    default:
      break;
  }

  return sidebarItems;
};
