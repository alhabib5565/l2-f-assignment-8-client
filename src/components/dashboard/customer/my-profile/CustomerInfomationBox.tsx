import { MailOutline, PhoneOutlined } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const CustomerInfomationBox = () => {
  return (
    <Box sx={{ bgcolor: "white", padding: 2, borderRadius: 1 }}>
      <Typography variant="body1" fontWeight={600} fontSize={16} mb={2}>
        Customer Infomation
      </Typography>
      <Avatar
        alt=""
        sx={{ width: "100%", height: 200, bgcolor: "lightgray" }}
        variant="rounded"
      >
        {/* {customerInfo.recipient_name.slice(0, 2)} */}Al
      </Avatar>
      <Stack direction="column" gap={1} mt={2}>
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          MD Al-Habib
        </Typography>
        <Typography variant="body1">joined date</Typography>

        <Typography variant="body1">
          <MailOutline sx={{ mr: 2 }} />
          {"customerInfo.email"}
        </Typography>
        <Typography variant="body1">
          {" "}
          <PhoneOutlined sx={{ mr: 2 }} />
          {"customerInfo.recipient_phone"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default CustomerInfomationBox;
