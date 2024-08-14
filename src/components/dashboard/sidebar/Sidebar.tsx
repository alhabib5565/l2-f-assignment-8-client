"use client";
import List from "@mui/material/List";
import { Divider, Toolbar } from "@mui/material";
import { generageSidebarItems } from "@/utils/generateSidebarItems";
import { TUserRole } from "@/type";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import store_logo from "../../../assets/store_logo.png";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div>
      <Toolbar>
        <Link href="/">
          <Image
            height={50}
            width={170}
            style={{ objectFit: "cover" }}
            src={store_logo}
            alt="store logo"
          />
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {generageSidebarItems(user?.role as TUserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
