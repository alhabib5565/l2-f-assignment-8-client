"use client";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FieldValues } from "react-hook-form";
import { icon_logo } from "@/assets";
import verifyImage from "../../assets/authentication/two-factor-authentication.png";
import ResendCodeTimer from "@/components/shared/ResendCodeTimer";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyEmailDefaultValue,
  verifyEmailValidationSchema,
} from "@/validationSchema/validation.verifyEmail";
import { useVerifyEmailMutation } from "@/redux/api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type TVerifyEmailParams = {
  params: {};
  searchParams: { email: string; verificationExpires: string };
};
const VerifyEmailPage = ({ searchParams }: TVerifyEmailParams) => {
  const router = useRouter();
  const { email, verificationExpires } = searchParams;

  const [verifyEmail, { data, isLoading }] = useVerifyEmailMutation();

  const onSubmit = async (value: FieldValues) => {
    const verificationCode = Number(Object.values(value).join(""));
    const response = (await verifyEmail({ verificationCode, email })) as any;
    console.log(response);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      router.push("/login");
    } else {
      toast.error(response?.error?.message);
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
        <Box maxWidth={400}>
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
              Verify Your Email - QuickShop
            </Typography>
            <Typography component="p" variant="body1" fontSize={14}>
              Please verify your email address to activate your QuickShop
              account and start shopping.
            </Typography>
          </Stack>

          {/* form */}
          <MyForm
            resolver={zodResolver(verifyEmailValidationSchema)}
            defaultValues={verifyEmailDefaultValue}
            onSubmit={onSubmit}
          >
            <Stack direction="row" gap={2} justifyContent="center">
              <MyInput
                sx={{ width: 80, textAlign: "center" }}
                inputProps={{ maxLength: 1 }}
                name="code1"
                type="text"
                size="medium"
              />
              <MyInput
                sx={{ width: 80, textAlign: "center" }}
                inputProps={{ maxLength: 1 }}
                name="code2"
                type="text"
                size="medium"
              />
              <MyInput
                sx={{ width: 80, textAlign: "center" }}
                inputProps={{ maxLength: 1 }}
                name="code3"
                type="text"
                size="medium"
              />
              <MyInput
                sx={{ width: 80, textAlign: "center" }}
                inputProps={{ maxLength: 1 }}
                name="code4"
                type="text"
                size="medium"
              />
            </Stack>
            <ResendCodeTimer
              email={email}
              verificationExpires={verificationExpires}
            />
            <Button
              sx={{
                mt: 2,
              }}
              fullWidth={true}
              type="submit"
            >
              Verify Email
            </Button>
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
          src={verifyImage}
          alt=""
        />
      </Box>
    </Box>
  );
};

export default VerifyEmailPage;
