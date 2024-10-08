"use client";
import { loginUser } from "@/actions/loginUser";
import { icon_logo } from "@/assets";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { login } from "@/redux/features/authSlice/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecoder } from "@/utils/jwtDecoder";
import {
  defaultValue,
  loginFormValidation,
} from "@/validationSchema/validation.login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import loginImage from "../../assets/authentication/login.png";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit = async (value: FieldValues) => {
    try {
      const response = await loginUser(value);
      console.log(response);
      if (response?.data?.accessToken) {
        const userInfo = jwtDecoder(response?.data?.accessToken);
        dispatch(login({ token: response?.data?.accessToken, user: userInfo }));
        toast.success(response.message || "login succesfull");
        router.push("/");
      } else {
        toast.error(response?.message || "something went wrong");
      }
    } catch (error: any) {
      toast.success(error?.message || "something went wrong");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          flex: 1,
          backgroundColor: "white",
          display: "grid",
          padding: 3,
          placeItems: "center",
          borderRadius: 2,
        }}
      >
        <Box maxWidth={500}>
          <Stack mb={3} direction="column" gap={2}>
            <Box display={"flex"} justifyContent="center">
              <Image
                src={icon_logo}
                width={100}
                height={100}
                objectFit="cover"
                alt="logo icon"
              />
            </Box>
            <Typography
              mt={-2}
              component="h4"
              variant="h4"
              fontWeight={600}
              fontSize={20}
            >
              QuickShop Login
            </Typography>
            <Typography component="p" variant="body1" fontSize={14}>
              Welcome back! Please log in to your QuickShop account to continue
              shopping and managing your orders.
            </Typography>
          </Stack>

          {/* form */}
          <MyForm
            resolver={zodResolver(loginFormValidation)}
            defaultValues={defaultValue}
            onSubmit={onSubmit}
          >
            <Grid container spacing={3}>
              <Grid xs={12} item>
                <MyInput label="Email" name="email" type="email" />
              </Grid>
              <Grid xs={12} item>
                <MyInput label="Password" name="password" type="password" />
              </Grid>
            </Grid>
            <Typography
              mt={2}
              textAlign="end"
              component="p"
              variant="body1"
              fontWeight={300}
              color={"primary.main"}
            >
              Forgot Password?
            </Typography>

            <Button
              sx={{
                margin: "16px 0px",
              }}
              fullWidth={true}
              type="submit"
            >
              Login
            </Button>
            <Typography component="p" fontWeight={300}>
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-400 hover:text-blue-600 duration-200"
              >
                Create an account
              </Link>
            </Typography>
          </MyForm>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          height: "100vh",
          bgcolor: "primary.main",
          display: { md: "flex", xs: "none" },
        }}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          src={loginImage}
          alt=""
        />
      </Box>
    </Box>
  );
};

export default LoginPage;
