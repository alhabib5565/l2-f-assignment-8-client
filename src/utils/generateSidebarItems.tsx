import { user_role } from "@/constent";
import { TSidebarItem, TUserRole } from "@/type";
import {
  FolderOutlined,
  ViewListOutlined,
  CategoryOutlined,
  ListAltOutlined,
  SubdirectoryArrowRightOutlined,
  ShoppingCartOutlined,
  PeopleOutline,
} from "@mui/icons-material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";

export const generageSidebarItems = (role: TUserRole) => {
  const sidebarItems: TSidebarItem[] = [];

  const lowerCaseRole = role.toLocaleLowerCase();

  switch (role) {
    case user_role.ADMIN:
      sidebarItems.push(
        {
          name: "Dashboard",
          href: `/dashboard/${lowerCaseRole}`,
          icon: DashboardOutlinedIcon,
        },
        {
          name: "Products",
          href: `/dashboard/${lowerCaseRole}/products`,
          icon: ViewListOutlined,
        },
        {
          name: "Orders",
          href: `/dashboard/${lowerCaseRole}/order-list`,
          icon: ShoppingCartOutlined,
        },
        {
          name: "users",
          href: `/dashboard/${lowerCaseRole}/users`,
          icon: PeopleOutline,
        },
        {
          name: "Categories",
          icon: FolderOutlined,
          nestedRoutes: [
            {
              name: "Main Category",
              href: `/dashboard/${lowerCaseRole}/category/main-categories`,
              icon: CategoryOutlined,
            },
            {
              name: "Category",
              href: `/dashboard/${lowerCaseRole}/category/categories`,
              icon: ListAltOutlined,
            },
            {
              name: "Sub Category",
              href: `/dashboard/${lowerCaseRole}/category/sub-categories`,
              icon: SubdirectoryArrowRightOutlined,
            },
          ],
        }
      );
      break;
    case user_role.CUSTOMER:
      sidebarItems.push(
        // {
        //   name: "Products",
        //   href: `/dashboard/${lowerCaseRole}/products`,
        //   icon: ViewListIcon,
        // },
        {
          name: "Your Orders",
          href: `/dashboard/${lowerCaseRole}/your-orders`,
          icon: ShoppingCartOutlined,
        }
      );
      break;

    default:
      break;
  }

  return sidebarItems;
};
