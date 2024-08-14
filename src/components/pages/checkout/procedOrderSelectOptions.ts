import { TSelectOptions } from "@/type";

export const itemTypeOptions: TSelectOptions[] = [
  // 1 for Document, 2 for Parcel
  {
    value: "Document",
    label: "Document",
  },
  {
    value: "Parcel",
    label: "Parcel",
  },
];

export const deliveryTypeOptions: TSelectOptions[] = [
  //48 for Normal Delivery, 12 for On Demand Delivery
  {
    value: "Normal Delivery",
    label: "Normal Delivery",
  },
  {
    value: "On Demand Delivery",
    label: "On Demand Delivery",
  },
];
