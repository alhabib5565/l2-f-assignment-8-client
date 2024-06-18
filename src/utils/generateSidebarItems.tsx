import { user_role } from "@/constent";
import { TSidebarItem, TUserRole } from "@/type";
import {
  FolderOutlined,
  ViewListOutlined,
  CategoryOutlined,
  ListAltOutlined,
  SubdirectoryArrowRightOutlined,
} from "@mui/icons-material";
import ViewListIcon from "@mui/icons-material/ViewList";

export const generageSidebarItems = (role: TUserRole) => {
  const sidebarItems: TSidebarItem[] = [];

  switch (role) {
    case user_role.ADMIN:
      sidebarItems.push(
        {
          name: "Products",
          href: "products",
          icon: ViewListOutlined,
        },
        {
          name: "Categories",
          icon: FolderOutlined,
          nestedRoutes: [
            {
              name: "Main Category",
              href: "category/main-categories",
              icon: CategoryOutlined,
            },
            {
              name: "Category",
              href: "category/categories",
              icon: ListAltOutlined,
            },
            {
              name: "Sub Category",
              href: "category/sub-categories",
              icon: SubdirectoryArrowRightOutlined,
            },
          ],
        }
      );
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
