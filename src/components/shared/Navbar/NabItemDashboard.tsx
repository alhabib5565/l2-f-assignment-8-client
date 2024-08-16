"use client";
import { useAppSelector } from "@/redux/hooks";
import { MenuItem, SxProps } from "@mui/material";
import Link from "next/link";
import React from "react";

type TNavItemDashboard = {
  handler: () => void;
  sx: SxProps;
};

const NavItemDashboard = ({ handler, sx }: TNavItemDashboard) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {user && user.role && (
        <Link
          href={
            user.role === "Customer"
              ? `dashboard/${user?.role.toLocaleLowerCase()}/my-profile`
              : `dashboard/${user?.role.toLocaleLowerCase()}`
          }
        >
          <MenuItem onClick={handler} sx={sx}>
            Dashboard
          </MenuItem>
        </Link>
      )}
    </>
  );
};

export default NavItemDashboard;
