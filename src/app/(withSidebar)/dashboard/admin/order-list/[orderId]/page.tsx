"use client";
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { HeaderText } from "@/app/(withNavAndFooter)/checkout/components/CartProductRow";
import { useGetSingleOrderQuery } from "@/redux/api/orders.api";
import { TOrder, TOrderStatus } from "@/type/order.type";
import {
  Cancel,
  CheckCircle,
  CheckCircleOutline,
  LocalShipping,
  Pending,
} from "@mui/icons-material";
import { ORDER_STATUS } from "@/constent";
import { formatOrderDate } from "@/utils/formatOrderData";
import OrderDetailsForAdmin from "@/components/dashboard/admin/orders/OrderDetailsForAdmin";

type TOrderDetailPageProp = {
  params: {
    orderId: string;
  };
};
const getOrderStatus = (status: TOrderStatus) => {
  const iconStyle = { color: "", fontSize: "50px" };

  switch (status) {
    case ORDER_STATUS.Pending:
      iconStyle.color = "orange";
      return <Pending style={iconStyle} />;
    case ORDER_STATUS.Rejected:
      iconStyle.color = "red";
      return <Cancel style={iconStyle} />;
    case ORDER_STATUS.Accepted:
      iconStyle.color = "green";
      return <CheckCircle style={iconStyle} />;
    case ORDER_STATUS.Shipped:
      iconStyle.color = "blue";
      return <LocalShipping style={iconStyle} />;
    case ORDER_STATUS.Delivered:
      iconStyle.color = "green";
      return <CheckCircleOutline style={iconStyle} />;
    case ORDER_STATUS.Cancelled:
      iconStyle.color = "grey";
      return <Cancel style={iconStyle} />;
    default:
      return null;
  }
};

const AdminOrderDetailPage = ({ params }: TOrderDetailPageProp) => {
  const { data, isLoading } = useGetSingleOrderQuery({ id: params.orderId });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const orderInfo = data.data as TOrder;
  const products = orderInfo.products;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7} lg={8}>
        <Box
          sx={{
            padding: 2,
            bgcolor: "white",
            borderRadius: 2,
            border: "1px solid lightgray",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="centers"
            pb={2}
          >
            <Typography
              display={"flex"}
              variant="h5"
              component="h5"
              alignItems="end"
              gap={1}
              fontWeight={600}
            >
              {" "}
              Order Details{" "}
              <Typography>({products.length} products)</Typography>
            </Typography>
          </Stack>
          {products.map((product, index) => (
            <Box key={index}>
              <Stack
                direction="row"
                alignItems="center"
                border="1px solid lightgray"
                borderRadius={2}
                mb={2}
                p={1}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    alignItems: "center",
                    display: "flex",
                    gap: 2,
                    minHeight: 60,
                  }}
                >
                  <Image
                    style={{ borderRadius: 5 }}
                    height={60}
                    width={60}
                    src="https://themesbrand.com/velzon/html/modern/assets/images/products/img-8.png"
                    alt="product image"
                  />
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{ fontSize: 14, fontWeight: 600 }}
                  >
                    {product.productName}
                  </Typography>
                </Box>
                <HeaderText sx={{ display: { xs: "none", sm: "flex" } }}>
                  TK{product.price.toFixed(2)}
                </HeaderText>

                <HeaderText>{product.quantity}</HeaderText>
                <HeaderText sx={{ color: "primary.main" }}>
                  TK{product.price * product.quantity}
                </HeaderText>
              </Stack>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <OrderDetailsForAdmin
          createdAt={orderInfo.createdAt}
          orderId={orderInfo.orderId}
          orderStatus={orderInfo.orderStatus}
        />
      </Grid>
    </Grid>
  );
};

export default AdminOrderDetailPage;
