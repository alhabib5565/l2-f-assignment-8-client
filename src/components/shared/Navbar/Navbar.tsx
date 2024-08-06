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

const AuthButton = dynamic(() => import("./AuthButton"), { ssr: false });

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
              // display: { xs: "none", md: "flex" },
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
              <Link key={page.href} href={page.href}>
                <MenuItem
                  onClick={handleCloseNavMenu}
                  sx={{ color: "white", display: "block" }}
                >
                  {page.name}
                </MenuItem>
              </Link>
            ))}
          </Box>

          <NavSerarchField />
          <AuthButton />
        </Toolbar>
      </Container>
    </AppBar>
  );

  // return (
  //   <Box py={2}>
  //     <Container className=" relative">
  //       <div className="hidden lg:flex justify-between items-center ">
  //         <Link className="text-4xl font-bold" color="primary.main" href="/">
  //           Laundry
  //         </Link>

  //         <ul className="flex items-center gap-4 lg:gap-8">
  //           {navItems.map((item) => (
  //             <Link
  //               className="text-sm font-medium"
  //               key={item.href}
  //               href={item.href}
  //             >
  //               {item.name}
  //             </Link>
  //           ))}
  //         </ul>
  //       </div>
  //       {/* for mobile */}
  //       <div className="flex lg:hidden justify-between items-center relative">
  //         <Link className="text-4xl font-bold" color="primary.main" href="/">
  //           Laundry
  //         </Link>
  //         <Button
  //           sx={{ padding: 1, zIndex: 999 }}
  //           onClick={() => setMenuOpen(!menuOpen)}
  //         >
  //           <Menu className="w-6 h-6" />
  //         </Button>
  //       </div>
  //       <nav
  //         className={`bg-white pt-8 w-[250px] min-h-screen h-full absolute top-0 right-0  transition-all duration-200 shadow-lg lg:hidden z-40 ${
  //           menuOpen ? "translate-x-0" : "translate-x-[100%] scale-x-0"
  //         }`}
  //       >
  //         <ul className="flex mt-10 flex-col items-center gap-4 px-6">
  //           {navItems.map((item, index) => (
  //             <Link
  //               onClick={() => setMenuOpen(false)}
  //               key={index}
  //               className="w-full text-center btn-outline border-none "
  //               href={item.href}
  //             >
  //               {item.name}
  //             </Link>
  //           ))}
  //         </ul>
  //       </nav>
  //     </Container>
  //   </Box>
  // );
};

export default Navbar;
