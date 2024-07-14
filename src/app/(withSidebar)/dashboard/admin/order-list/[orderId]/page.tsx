"use client";
import { Avatar, Box, Divider, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { HeaderText } from "@/app/(withNavAndFooter)/checkout/components/CartProductRow";
import { useGetSingleOrderQuery } from "@/redux/api/orders.api";
import { TOrder } from "@/type/order.type";
import OrderDetailsBox from "@/components/dashboard/admin/orders/OrderDetailsBox";
import CustomerDetailsBox from "@/components/dashboard/admin/orders/CustomerDetailsBox";
import ShippingAddressBox from "@/components/dashboard/admin/orders/ShippingAddressBox";
import OrderSummary from "@/app/(withNavAndFooter)/checkout/components/OrderSummary";

type TOrderDetailPageProp = {
  params: {
    orderId: string;
  };
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
            boxShadow: 1,
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
                  }}
                >
                  <Avatar
                    src="https://themesbrand.com/velzon/html/modern/assets/images/products/img-8.png"
                    sx={{ width: 56, height: 56, bgcolor: "lightgray" }}
                    variant="rounded"
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
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              mt: 2,
            }}
          >
            <OrderSummary
              totalPrice={orderInfo.totalPrice}
              products={orderInfo.products}
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <OrderDetailsBox
          createdAt={orderInfo.createdAt}
          orderId={orderInfo.orderId}
          orderStatus={orderInfo.orderStatus}
        />
        <CustomerDetailsBox
          recipient_name={orderInfo.recipient_name}
          recipient_phone={orderInfo.recipient_phone}
        />
        <ShippingAddressBox
          recipient_name={orderInfo.recipient_name}
          recipient_phone={orderInfo.recipient_phone}
        />
      </Grid>
    </Grid>
  );
};

export default AdminOrderDetailPage;
