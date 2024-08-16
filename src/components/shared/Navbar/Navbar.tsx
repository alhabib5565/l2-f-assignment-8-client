"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import dynamic from "next/dynamic";
import Link from "next/link";
import { pages } from "@/constent";
import NavSerarchField from "./NavSerarchField";
import { useAppSelector } from "@/redux/hooks";

const AuthButton = dynamic(() => import("./AuthButton"), { ssr: false });
const NavItemDashboard = dynamic(() => import("./NabItemDashboard"), {
  ssr: false,
});

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar component="nav" position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              // color: "inherit",

              textDecoration: "none",
            }}
          >
            QuickShop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                height: 300,
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link href={page.href} key={page.href}>
                  <MenuItem sx={{ width: 200 }} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}

              <NavItemDashboard
                sx={{ width: 200 }}
                handler={handleCloseNavMenu}
              />
            </Menu>
          </Box>

          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            QuickShop
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page.href}
                href={
                  page.href === "/dashboard"
                    ? `${page.href}/admin`
                    : // ? `${page.href}/${user?.role}`
                      page.href
                }
              >
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ color: "white", display: "block" }}
                >
                  {page.name}
                </MenuItem>
              </Link>
            ))}
            <NavItemDashboard
              sx={{ color: "white", display: "block" }}
              handler={handleCloseNavMenu}
            />

            {/* {user && user.role && (
              <Link
                href={
                  user.role === "customer"
                    ? `dashboard/${user?.role.toLocaleLowerCase()}/my-profile`
                    : `dashboard/${user?.role.toLocaleLowerCase()}`
                }
              >
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ color: "white", display: "block" }}
                >
                  Dashboard
                </MenuItem>
              </Link>
            )} */}
          </Box>

          <NavSerarchField />
          <AuthButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
