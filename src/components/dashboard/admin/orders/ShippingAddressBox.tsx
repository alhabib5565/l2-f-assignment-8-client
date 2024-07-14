import { HeaderText } from "@/app/(withNavAndFooter)/checkout/components/CartProductRow";
import { TOrder } from "@/type/order.type";
import { MailOutline, PhoneOutlined, PlaceOutlined } from "@mui/icons-material";
import { Box, Divider, Stack, Avatar, Typography } from "@mui/material";

type TShippingAddressBoxProps = Pick<
  TOrder,
  "recipient_phone" | "recipient_name"
>;

const ShippingAddressBox = (customerInfo: TShippingAddressBoxProps) => {
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
        Shipping Address
      </HeaderText>
      <Divider />
      <Stack
        sx={{
          p: 2,
        }}
        gap={1}
      >
        <Typography variant="body1" fontWeight={600} fontSize={14}>
          {customerInfo.recipient_name}
        </Typography>
        <Typography variant="body1">
          <PhoneOutlined sx={{ mr: 2 }} />
          {customerInfo.recipient_phone}
        </Typography>
        <Typography variant="body1">
          <PlaceOutlined sx={{ mr: 2 }} />
          Chandrakona Bazar
        </Typography>
        <Typography variant="body1">
          <PlaceOutlined sx={{ mr: 2 }} />
          Mymenshingh, Sherpur, Nakla
        </Typography>
      </Stack>
    </Box>
  );
};

export default ShippingAddressBox;
