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
import registerImage from "../../assets/authentication/register.png";

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
      console.log(response);
      if (response?.success && response?.data) {
        router.push(
          `/verify-email?email=${response.data?.email}&verificationExpires=${response?.data?.verificationExpires}`
        );
        // toast.success(response.message || "User register succesfully");
      }
    } catch (error: any) {
      toast.success(error.message || "something went wrong");
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
              Create Your QuickShop Account
            </Typography>
            <Typography component="p" variant="body1" fontSize={14}>
              Join QuickShop today! Create an account to start shopping, manage
              your orders, and enjoy exclusive offers.
            </Typography>
          </Stack>

          {/* form */}
          <MyForm
            resolver={zodResolver(registerFormValidation)}
            onSubmit={onSubmit}
          >
            <Grid container spacing={3}>
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
          src={registerImage}
          alt=""
        />
      </Box>
    </Box>
  );
};

export default RegisterPage;
