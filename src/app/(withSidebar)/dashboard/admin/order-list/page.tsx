import OrderOverviewCard from "@/components/dashboard/admin/orders/OrderOverviewCard";
import PageHeader from "@/components/dashboard/shared/PageHeader";
import {
  LocalShipping,
  Pending,
  RemoveCircle,
  ShoppingBag,
} from "@mui/icons-material";
import { Box, Grid } from "@mui/material";

const OrderList = () => {
  return (
    <Box>
      <PageHeader pageName="Orders" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Pending Orders"
            count={234}
            Icon={<Pending sx={{ color: "#f3a0ff", fontSize: "50px" }} />}
            gradientStartColor="#be0ee1"
            gradientEndColor="#ed68ff"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Shipped Orders"
            count={534}
            Icon={<LocalShipping sx={{ color: "#96cefa", fontSize: "50px" }} />}
            gradientStartColor="#2b77e5"
            gradientEndColor="#64b3f6"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Accepted Orders"
            count={6}
            Icon={<ShoppingBag sx={{ color: "#89ecb3", fontSize: "50px" }} />}
            gradientStartColor="#1a9f53"
            gradientEndColor="#4eda89"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <OrderOverviewCard
            title="Cancelled Orders"
            count={2344}
            Icon={<RemoveCircle sx={{ color: "#ff9baa", fontSize: "50px" }} />}
            gradientStartColor="#f11133"
            gradientEndColor="#ff6179"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderList;
