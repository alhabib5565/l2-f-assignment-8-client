import { HeaderText } from "@/app/(withNavAndFooter)/checkout/components/CartProductRow";
import { TOrder } from "@/type/order.type";
import { MailOutline, PhoneOutlined } from "@mui/icons-material";
import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";

type TCustomerDetailsBoxProps = Pick<
  TOrder,
  "recipient_phone" | "recipient_name"
>;

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
            src="https://themesbrand.com/velzon/html/modern/assets/images/products/img-8.png"
            sx={{ width: 56, height: 56, bgcolor: "lightgray" }}
            variant="rounded"
          />
          <Box>
            <Typography variant="body1" fontWeight={600} fontSize={14}>
              {customerInfo.recipient_name}
            </Typography>
            <Typography variant="body1">Customer</Typography>
          </Box>
        </Stack>
        <Typography variant="body1" mt={2} mb={1}>
          <MailOutline sx={{ mr: 2 }} />
          alhabib5565@gmai.com
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
