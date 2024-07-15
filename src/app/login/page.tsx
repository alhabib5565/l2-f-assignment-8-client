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

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit = async (value: FieldValues) => {
    try {
      const response = await loginUser(value);

      if (response?.data.accessToken) {
        const userInfo = jwtDecoder(response?.data.accessToken);
        console.log(userInfo);
        dispatch(login({ token: response?.data.accessToken, user: userInfo }));
        toast.success(response.message || "login succesfull");
        router.push("/");
      }
    } catch (error: any) {
      toast.success(error.message || "something went wrong");
    }
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "secondary.main",
        py: 10,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: "100%",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Stack
          mb={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={icon_logo}
            width={100}
            height={100}
            objectFit="cover"
            alt="logo icon"
          />
          <Typography mt={-2} component="h4" variant="h4" fontWeight={600}>
            Login to your account
          </Typography>
        </Stack>

        {/* form */}
        <MyForm
          resolver={zodResolver(loginFormValidation)}
          defaultValues={defaultValue}
          onSubmit={onSubmit}
        >
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <MyInput label="Email" name="email" type="email" />
            </Grid>
            <Grid xs={12} item>
              <MyInput label="Password" name="password" type="password" />
            </Grid>
          </Grid>
          <Typography
            mb={1}
            textAlign="end"
            component="p"
            variant="body1"
            fontWeight={300}
          >
            Forgot Password?
          </Typography>

          <Button
            sx={{
              margin: "10px 0px",
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
  );
};

export default LoginPage;
