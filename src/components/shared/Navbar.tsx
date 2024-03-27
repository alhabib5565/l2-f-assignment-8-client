"use client";
import { Menu } from "@mui/icons-material";
import { Box, Button, Container, Stack } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/dashboard/allProducts",
      name: "Dashboard",
    },
    {
      href: "/categories",
      name: "Categories",
    },
    {
      href: "/products",
      name: "Products",
    },
    {
      href: "/flash-sale",
      name: "Flash Sale",
    },
    {
      href: "/about-us",
      name: "About Us",
    },
    {
      href: "/contact-us",
      name: "Contact Us",
    },
  ];
  return (
    <Box py={2}>
      <Container className=" relative">
        <div className="hidden lg:flex justify-between items-center ">
          <Link className="text-4xl font-bold" color="primary.main" href="/">
            Laundry
          </Link>

          <ul className="flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <Link
                className="text-sm font-medium"
                key={item.href}
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </div>
        {/* for mobile */}
        <div className="flex lg:hidden justify-between items-center relative">
          <Link className="text-4xl font-bold" color="primary.main" href="/">
            Laundry
          </Link>
          <Button
            sx={{ padding: 1, zIndex: 999 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
        <nav
          className={`bg-white pt-8 w-[250px] min-h-screen h-full absolute top-0 right-0  transition-all duration-200 shadow-lg lg:hidden z-40 ${
            menuOpen ? "translate-x-0" : "translate-x-[100%] scale-x-0"
          }`}
        >
          <ul className="flex mt-10 flex-col items-center gap-4 px-6">
            {navItems.map((item, index) => (
              <Link
                onClick={() => setMenuOpen(false)}
                key={index}
                className="w-full text-center btn-outline border-none "
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
      </Container>
    </Box>
  );
};

export default Navbar;
