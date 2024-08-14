import { months } from "@/constent";

export const formatOrderDate = (value: string) => {
  const date = new Date(value);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
};

export const calculateEstimatedDeliveryDate = (orderDate: Date) => {
  const estimatedDeliveryDate = new Date(orderDate);
  estimatedDeliveryDate.setDate(orderDate.getDate() + 7);

  // Formatting the date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return estimatedDeliveryDate.toLocaleDateString("en-GB", options);
};
