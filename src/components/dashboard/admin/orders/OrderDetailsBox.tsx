import { HeaderText } from "@/app/(withNavAndFooter)/checkout/components/CartProductRow";
import { TOrder } from "@/type/order.type";
import { formatOrderDate } from "@/utils/formatOrderData";
import { getOrderStatus } from "@/utils/orderStatusWithIcon";
import { Box, Chip, Divider, Typography } from "@mui/material";

type TOrderDetailsBoxProps = Pick<
  TOrder,
  "orderId" | "orderStatus" | "createdAt"
>;

const OrderDetailsBox = (orderInfo: TOrderDetailsBoxProps) => {
  return (
    <Box
      sx={{
        border: "1px solid lightgray",
        borderRadius: 2,
        bgcolor: "white",
        boxShadow: 1,
      }}
    >
      <HeaderText
        sx={{
          minWidth: "100%",
          textAlign: "left",
          p: 1,
        }}
      >
        Order Details
      </HeaderText>
      <Divider />
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {getOrderStatus(orderInfo.orderStatus)}
        <Chip variant="outlined" label={orderInfo.orderStatus} />
        <Typography variant="body1">OrderId: #{orderInfo.orderId}</Typography>
        <Typography variant="body1">
          Order Date: {formatOrderDate(orderInfo.createdAt)}
        </Typography>
        <Typography variant="body1">Payment Info: Cash On Delivery</Typography>
      </Box>
    </Box>
  );
};

export default OrderDetailsBox;
