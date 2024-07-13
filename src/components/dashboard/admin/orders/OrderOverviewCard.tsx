import React, { ReactElement } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  SxProps,
} from "@mui/material";
type TOrderOverviewCardProps = {
  title: string;
  count: number;
  Icon: ReactElement<any, any>;
  gradientStartColor: string;
  gradientEndColor: string;
  sx?: SxProps;
};

const OrderOverviewCard = ({
  title,
  count,
  Icon,
  gradientStartColor,
  gradientEndColor,
  sx,
}: TOrderOverviewCardProps) => {
  return (
    <Card
      sx={{
        minWidth: 200,
        height: 100,
        backgroundImage: `linear-gradient(360deg, ${gradientStartColor}, ${gradientEndColor})`,
        ...sx,
        overflow: "visible",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <Typography
              fontSize={16}
              fontWeight={500}
              color="white"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography fontSize={32} fontWeight={700} color="white">
              {count}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: -4,
            }}
          >
            {Icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderOverviewCard;
