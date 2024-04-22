import { logout } from "@/redux/features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@mui/material";
import React from "react";
import { toast } from "sonner";

const AuthButton = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout succesfull");
  };
  return (
    <>
      {user?.email ? (
        <Button onClick={handleLogout} color="error">
          Log out
        </Button>
      ) : (
        <Button
          href="/login"
          color="error"
          variant="outlined"
          sx={{ bgcolor: "white", "&:hover": { bgcolor: "white" } }}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
