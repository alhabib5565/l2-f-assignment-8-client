import { PRODUCT_STATUS, user_role } from "@/constent";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TUserRole = keyof typeof user_role;

export type TStatus = keyof typeof PRODUCT_STATUS;

export type TColor = {
  _id: string;
  name: string;
  hexCode: string;
};

export type TFlashSale = {
  flashSaleDiscountPercentage: number;
  flashSaleStartDate: Date;
  flashSaleEndDate: Date;
};

export type TVariants = {
  color?: string[];
};
export type TProduct = {
  _id: string;
  productId: string;
  productName: string;
  mainCategory: string;
  category: string;
  subCategory: string;
  description: string;
  price: number;
  discountPercentage?: number;
  totalQuantity: number;
  availableQuantity: number;
  thumbnail: string;
  images: string[];
  rating: number;
  status: TStatus;
  variants?: TVariants;
  brand?: string;
  type?: string;
  flashSale?: TFlashSale;
  weight?: {
    value: number;
    unit: string;
  };
  features?: string[];
  metaTitle?: string;
  metaDescription?: string;
  currentlyFlashSale: boolean;
};

export type TSidebarRoute = {
  name: string;
  href?: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
};
export type TSidebarItem = TSidebarRoute & {
  nestedRoutes?: TSidebarRoute[];
};

export type TSelectOptions = {
  value: string;
  label: string;
};

export type TAddReviewData = {
  ratings: number | null;
  review: string;
  productId: string;
  userEmail: string;
  userName?: string;
};

export type TReviewData = TAddReviewData & {
  _id: string;
};

export type TModalOpenProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
