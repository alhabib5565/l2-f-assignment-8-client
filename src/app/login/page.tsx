"use client";
import { loginUser } from "@/actions/loginUser";
import { icon_logo } from "@/assets";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form";
import z from "zod";

const LoginPage = () => {
  const loginFormValidation = z.object({
    email: z
      .string({
        invalid_type_error: "Please provide a valid email",
        required_error: "Email is required",
      })
      .email(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
  });

  const defaultValue = {
    email: "",
    password: "",
  };

  const onSubmit = async (value: FieldValues) => {
    console.log(value);
    try {
      const response = await loginUser(value);
      console.log(response);
    } catch (error) {}
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
          resolver={loginFormValidation}
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
