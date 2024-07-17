"use client";
import { Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";

type TCountDownTimerProps = {
  endDate: any;
};
const CountDownTimer = ({ endDate }: TCountDownTimerProps) => {
  const calculateTimeLeft = useCallback(() => {
    const start = new Date();
    const end = new Date(endDate);
    const diff = (end as any) - (start as any);
    const timeLeft = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };

    return timeLeft;
  }, [endDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);

    return () => clearInterval(timer);
  }, [endDate, calculateTimeLeft]);

  return (
    <Typography
      variant="body1"
      fontSize={14}
      fontWeight={600}
      textAlign="center"
      color="primary.main"
    >
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
    </Typography>
  );
};

export default CountDownTimer;
