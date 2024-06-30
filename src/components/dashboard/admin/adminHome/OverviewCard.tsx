import React, { ReactElement } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  SvgIconTypeMap,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type TOverviewCardProps = {
  title: string;
  count: number;
  Icon: ReactElement<any, any>;
  gradientStartColor: string;
  gradientEndColor: string;
  iconGradientStartColor: string;
  iconGradientEndColor: string;
};

const OverviewCard = ({
  title,
  count,
  Icon,
  iconGradientEndColor,
  iconGradientStartColor,
  gradientStartColor,
  gradientEndColor,
}: TOverviewCardProps) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        height: 180,
        backgroundImage: `linear-gradient(270deg, ${gradientStartColor}, ${gradientEndColor})`,
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
              backgroundImage: `linear-gradient(${iconGradientStartColor}, ${iconGradientEndColor})`,
            }}
          >
            {Icon}
            {/* <AccountCircle sx={{ color: "#89ecb3" }} fontSize="large" /> */}
          </Box>
        </Stack>

        <Stack direction={"row"} gap={1} alignItems="center">
          <Chip
            sx={{
              fontSize: 12,
              borderRadius: 1,
              color: "white",
              backgroundColor: "#187d44",
              height: "26px",
            }}
            label={"+95%"}
          />
          <Typography fontSize={14} color="white">
            Last Month
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
