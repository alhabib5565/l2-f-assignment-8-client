import { ORDER_STATUS } from "@/constent";
import { TDistrict, TDivision, TUpazila } from "./location.type";

export type TOrder = {
  _id: string;
  orderId: string;
  recipient_name: string;
  recipient_phone: number;
  products: Product[];
  totalPrice: number;
  orderStatus: TOrderStatus;
  division: TDivision;
  district: TDistrict;
  upazila: TUpazila;
  union: string;
  recipient_area: string;
  paymentInfo: TPaymentInfo;
  createdAt: string;
  updatedAt: string;
  user?: TUser;
};

export type TOrderStatus = keyof typeof ORDER_STATUS;

export type Product = {
  productId: string;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: number;
  _id: string;
};

export type TPaymentInfo = {
  method: string;
};
