import { HeaderText } from "@/components/pages/checkout/CartProductRow";
import { TOrder } from "@/type/order.type";
import { MailOutline, PhoneOutlined, PlaceOutlined } from "@mui/icons-material";
import { Box, Divider, Stack, Avatar, Typography } from "@mui/material";

type TShippingAddressBoxProps = {
  recipient_phone: string | number;
  recipient_area: string;
  union: string;
  division: string;
  district: string;
  upazila: string;
};

const ShippingAddressBox = ({
  recipient_phone,
  recipient_area,
  division,
  district,
  upazila,
  union,
}: TShippingAddressBoxProps) => {
  const locationString = `${division}, ${district}, ${upazila}, ${union}`;

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
        {/* <Typography variant="body1" fontWeight={600} fontSize={14}>
          {recipient_name}
        </Typography> */}
        <Typography variant="body1">
          <PhoneOutlined sx={{ mr: 2 }} />
          {recipient_phone}
        </Typography>
        <Typography variant="body1">
          <PlaceOutlined sx={{ mr: 2 }} />
          {recipient_area}
        </Typography>
        <Typography variant="body1">
          <PlaceOutlined sx={{ mr: 2 }} />
          {locationString}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ShippingAddressBox;
