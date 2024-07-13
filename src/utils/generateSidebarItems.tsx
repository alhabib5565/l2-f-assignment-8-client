import { user_role } from "@/constent";
import { TSidebarItem, TUserRole } from "@/type";
import {
  FolderOutlined,
  ViewListOutlined,
  CategoryOutlined,
  ListAltOutlined,
  SubdirectoryArrowRightOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";

export const generageSidebarItems = (role: TUserRole) => {
  const sidebarItems: TSidebarItem[] = [];

  switch (role) {
    case user_role.ADMIN:
      sidebarItems.push(
        {
          name: "Dashboard",
          href: `/dashboard/${role}`,
          icon: DashboardOutlinedIcon,
        },
        {
          name: "Products",
          href: `/dashboard/${role}/products`,
          icon: ViewListOutlined,
        },
        {
          name: "Orders",
          href: `/dashboard/${role}/order-list`,
          icon: ShoppingCartOutlined,
        },
        {
          name: "Categories",
          icon: FolderOutlined,
          nestedRoutes: [
            {
              name: "Main Category",
              href: `/dashboard/${role}/category/main-categories`,
              icon: CategoryOutlined,
            },
            {
              name: "Category",
              href: `/dashboard/${role}/category/categories`,
              icon: ListAltOutlined,
            },
            {
              name: "Sub Category",
              href: `/dashboard/${role}/category/sub-categories`,
              icon: SubdirectoryArrowRightOutlined,
            },
          ],
        }
      );
      break;
    case user_role.CUSTOMER:
      sidebarItems.push({
        name: "Products",
        href: `/dashboard/${role}/products`,
        icon: ViewListIcon,
      });
      break;

    default:
      break;
  }

  return sidebarItems;
};
