"use client";
import { Edit, MailOutline, PhoneOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditUserInformationModal from "./EditUserInformationModal";
import { formatOrderDate } from "@/utils/formatOrderData";

export type TUserInformationBoxProps = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  imageURL: string;
  createdAt?: string;
};

const CustomerInfomationBox = ({
  userId,
  name,
  email,
  phone,
  imageURL,
  createdAt,
}: TUserInformationBoxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: "white",
        border: "1px solid lightgray",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={1}
      >
        <Typography variant="body1" fontWeight={600} fontSize={16} mb={2}>
          Customer Infomation
        </Typography>
        <IconButton size="small" onClick={() => setOpen(!open)} color="error">
          <Edit />
        </IconButton>
      </Stack>
      <Divider />
      <Box sx={{ p: 2 }}>
        {open && (
          <EditUserInformationModal
            open={open}
            setOpen={setOpen}
            userId={userId}
            name={name}
            email={email}
            phone={phone}
            imageURL={imageURL}
          />
        )}

        <Avatar
          src={imageURL || ""}
          alt=""
          sx={{ width: "100%", height: 250, bgcolor: "lightgray" }}
          variant="rounded"
        >
          {/* {customerInfo.recipient_name.slice(0, 2)} */}Al
        </Avatar>
        <Stack direction="column" gap={1} mt={2}>
          <Typography variant="body1">
            {formatOrderDate(createdAt || "")}
          </Typography>
          <Typography variant="body1" fontWeight={600} fontSize={14}>
            {name}
          </Typography>

          <Typography variant="body1">
            <MailOutline sx={{ mr: 2 }} />
            {email}
          </Typography>
          <Typography variant="body1">
            {" "}
            <PhoneOutlined sx={{ mr: 2 }} />
            {phone || "Not Found"}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default CustomerInfomationBox;
