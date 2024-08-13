"use client";
import { useResendVerificationCodeMutation } from "@/redux/api/auth.api";
import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ResendCodeTimer = ({
  email,
  verificationExpires,
}: {
  email: string;
  verificationExpires: string;
}) => {
  const [resendCodeTimerInfo, setResendCodeTimerInfo] = useState({
    lifeTime: Math.floor((Number(verificationExpires) - Date.now()) / 1000),
    canResend: false,
  });

  const [resendVerificationCode] = useResendVerificationCodeMutation();

  const handleResendCode = async () => {
    const response = (await resendVerificationCode({ email })) as any;
    console.log(response?.data?.message);
    if (response?.data?.success) {
      toast.success(response?.data?.message);
      setResendCodeTimerInfo((prev) => ({ canResend: false, lifeTime: 59 }));
    } else {
      toast.error(response?.error?.message);
    }
  };

  useEffect(() => {
    if (resendCodeTimerInfo.lifeTime > 0) {
      const timer = setInterval(() => {
        setResendCodeTimerInfo((prev) => ({
          ...prev,
          lifeTime: prev.lifeTime - 1,
        }));
      }, 1000);

      // Clean up the interval on component unmount or when the timer reaches zero
      return () => clearInterval(timer);
    } else {
      setResendCodeTimerInfo((prev) => ({
        ...prev,
        canResend: true,
      }));
    }
  }, [resendCodeTimerInfo.lifeTime]);

  return (
    <Stack justifyContent="center" mt={2} direction="row" alignItems="center">
      <Typography
        sx={{ bgcolor: "#FAEEF1", p: 2, borderRadius: 2 }}
        component="p"
        variant="body1"
        color="#FF0000"
        fontSize={14}
      >
        OTP will expire in:{" "}
        {resendCodeTimerInfo.lifeTime > 0 ? resendCodeTimerInfo.lifeTime : 0}{" "}
        seconds
        {resendCodeTimerInfo.canResend && (
          <Typography
            onClick={handleResendCode}
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            color="#FF0000"
            component="span"
            ml={2}
          >
            Resend Code
          </Typography>
        )}
      </Typography>
    </Stack>
  );
};

export default ResendCodeTimer;
