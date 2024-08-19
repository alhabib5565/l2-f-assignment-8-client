import {
  Cancel,
  CheckCircle,
  CheckCircleOutline,
  LocalShipping,
  Pending,
} from "@mui/icons-material";
import { ORDER_STATUS } from "@/constent";
import { TOrderStatus } from "@/type/order.type";

export const getOrderStatus = (status: TOrderStatus, fontSize: string) => {
  const iconStyle = { color: "", fontSize };

  switch (status) {
    case ORDER_STATUS.Pending:
      iconStyle.color = "orange";
      return <Pending style={iconStyle} />;
    // case ORDER_STATUS.Rejected:
    //   iconStyle.color = "red";
    //   return <Cancel style={iconStyle} />;
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
