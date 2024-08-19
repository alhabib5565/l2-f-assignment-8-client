import { logout } from "@/redux/features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Avatar,
  Badge,
  BadgeProps,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Tooltip,
} from "@mui/material";
import React from "react";
import { toast } from "sonner";
import CartIcon from "./CartIcon";
import { deleteCookies } from "@/actions/deleteCookie";
import Link from "next/link";
import { ShoppingCart } from "@mui/icons-material";

const AuthButton = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { auth, cart } = useAppSelector((state) => state);

  const user = auth.user;
  const selectedProducts = cart.selectedProducts;
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout succesfull");
    deleteCookies(["refreshToken"]);
    handleCloseUserMenu();
  };

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 1,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <>
      <CartIcon />
      {user?.email ? (
        // <Button onClick={handleLogout} color="error">
        //   Log out
        // </Button>
        <Box sx={{ flexGrow: 0, ml: 1 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp">{user?.email.slice(0, 2)}</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: "45px",
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Link href="/checkout">
              <MenuItem
                sx={{ display: { xs: "block", md: "none" } }}
                onClick={handleCloseUserMenu}
              >
                <StyledBadge
                  badgeContent={selectedProducts || 0}
                  color="secondary"
                >
                  <ShoppingCart />
                </StyledBadge>
              </MenuItem>
            </Link>
            <Link href={`dashboard/${user?.role.toLocaleLowerCase()}`}>
              <MenuItem onClick={handleCloseUserMenu}>Dashboard</MenuItem>
            </Link>

            <Button fullWidth onClick={handleLogout} color="error">
              Log out
            </Button>
          </Menu>
        </Box>
      ) : (
        <Button
          href="/login"
          color="error"
          variant="outlined"
          sx={{ bgcolor: "white", "&:hover": { bgcolor: "white" }, ml: 1 }}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
