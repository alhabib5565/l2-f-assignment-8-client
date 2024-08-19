export const user_role = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
};

export const ACTIVE_STATUS = {
  Active: "Active",
  Blocked: "Blocked",
};

export const PRODUCT_STATUS = {
  Published: "Published",
  Upcoming: "Upcoming",
};

export const ORDER_STATUS = {
  Pending: "Pending",
  // Rejected: "Rejected",
  Accepted: "Accepted",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
} as const;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const pages = [
  {
    href: "/categories",
    name: "Categories",
  },
  {
    href: "/products",
    name: "Products",
  },
  {
    href: "/flash-sale",
    name: "Flash Sale",
  },
];
