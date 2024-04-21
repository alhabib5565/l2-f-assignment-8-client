import { user_role } from "@/constent";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type TUserRole = keyof typeof user_role

export type TProduct = {
    _id: number
    title: string
    description: string
    price: number
    discountPercentage: number | null
    flash_sale: FlashSale | null
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    weight?: string
    type?: string
    features?: string[]
}

export type FlashSale = {
    sale_start: string
    sale_end: string
}

export type TSidebarItem = {
    name: string,
    href: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}

export type TSelectOptions = {
    value: string;
    label: string;
};