import { HeaderText } from "@/components/pages/checkout/CartProductRow";
import { TOrder } from "@/type/order.type";
import { MailOutline, PhoneOutlined } from "@mui/icons-material";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";

type TCustomerDetailsBoxProps = Pick<
  TOrder,
  "recipient_phone" | "recipient_name"
> & {
  email: string;
  role: string;
};

const CustomerDetailsBox = (customerInfo: TCustomerDetailsBoxProps) => {
  return (
    <Box
      sx={{
        border: "1px solid lightgray",
        borderRadius: 2,
        bgcolor: "white",
        boxShadow: 1,
        mt: 3,
      }}
    >
      <HeaderText
        sx={{
          minWidth: "100%",
          textAlign: "left",
          p: 1,
        }}
      >
        Customer Details
      </HeaderText>
      <Divider />
      <Box
        sx={{
          p: 2,
        }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Avatar
            alt=""
            sx={{ width: 56, height: 56, bgcolor: "lightgray" }}
            variant="rounded"
          >
            {customerInfo.recipient_name.slice(0, 2)}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight={600} fontSize={14}>
              {customerInfo.recipient_name}
            </Typography>
            <Typography variant="body1">{customerInfo.role}</Typography>
          </Box>
        </Stack>
        <Typography variant="body1" mt={2} mb={1}>
          <MailOutline sx={{ mr: 2 }} />
          {customerInfo.email}
        </Typography>
        <Typography variant="body1">
          {" "}
          <PhoneOutlined sx={{ mr: 2 }} />
          {customerInfo.recipient_phone}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomerDetailsBox;
