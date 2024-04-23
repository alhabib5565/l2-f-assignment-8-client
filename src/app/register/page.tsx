"use client";
import { loginUser } from "@/actions/loginUser";
import { registerUser } from "@/actions/register";
import { icon_logo } from "@/assets";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { login } from "@/redux/features/authSlice/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { jwtDecoder } from "@/utils/jwtDecoder";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const registerFormValidation = z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Please provide a valid email" }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
  });

  const onSubmit = async (value: FieldValues) => {
    try {
      const response = await registerUser(value);
      if (response?.success) {
        const loginResponse = await loginUser(value);
        if (loginResponse?.token) {
          const userInfo = jwtDecoder(loginResponse.token);
          dispatch(login({ token: loginResponse.token, user: userInfo }));
          toast.success(response.message || "User register succesfully");
          router.push("/");
        }
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
            Please Register
          </Typography>
        </Stack>

        {/* form */}
        <MyForm
          resolver={zodResolver(registerFormValidation)}
          onSubmit={onSubmit}
        >
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <MyInput label="Name" name="name" type="text" />
            </Grid>
            <Grid xs={12} item>
              <MyInput label="Email" name="email" type="email" />
            </Grid>
            <Grid xs={12} item>
              <MyInput label="Password" name="password" type="password" />
            </Grid>
          </Grid>

          <Button
            sx={{
              mt: 3,
            }}
            fullWidth={true}
            type="submit"
          >
            Register
          </Button>
          <Typography mt={1} component="p" fontWeight={300}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-600 duration-200"
            >
              Please login
            </Link>
          </Typography>
        </MyForm>
      </Box>
    </Box>
  );
};

export default RegisterPage;
