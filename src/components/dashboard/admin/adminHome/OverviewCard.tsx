import React, { ReactElement } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  SxProps,
} from "@mui/material";
type TOverviewCardProps = {
  title: string;
  count: number;
  Icon: ReactElement<any, any>;
  gradientStartColor: string;
  gradientEndColor: string;
  iconGradientStartColor?: string;
  iconGradientEndColor?: string;
  percentage?: number;
  sx?: SxProps;
};

const OverviewCard = ({
  title,
  count,
  Icon,
  percentage,
  iconGradientEndColor,
  iconGradientStartColor,
  gradientStartColor,
  gradientEndColor,
  sx,
}: TOverviewCardProps) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        height: percentage ? 180 : 100,
        backgroundImage: `linear-gradient(270deg, ${gradientStartColor}, ${gradientEndColor})`,
        ...sx,
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
              height: 50,
              width: 50,
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              // iconGradientEndColor &&
              // iconGradientStartColor &&?    backgroundImage:
              // `linear-gradient(${iconGradientStartColor}, ${iconGradientEndColor})`,

              backgroundImage:
                iconGradientEndColor &&
                iconGradientStartColor &&
                `linear-gradient(${iconGradientStartColor}, ${iconGradientEndColor})`,
            }}
          >
            {Icon}
            {/* <AccountCircle sx={{ color: "#89ecb3" }} fontSize="large" /> */}
          </Box>
        </Stack>

        {percentage && (
          <Stack direction={"row"} gap={1} alignItems="center">
            <Chip
              sx={{
                fontSize: 12,
                borderRadius: 1,
                color: "white",
                // backgroundColor: "#187d44",
                height: "26px",
              }}
              label={`+ ${percentage}%`}
            />
            <Typography fontSize={14} color="white">
              Last Month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
