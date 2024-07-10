import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Box, CardActionArea, CardMedia } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { TProduct } from "@/type";
import AddToCartButton from "./AddToCartButton";
const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <Link href={`products/${product?._id}`}>
      <Card
        sx={{
          maxWidth: 345,
          height: "100%",
          "&:hover img": {
            transform: "rotate(10deg) scale(1.2)",
            transition: "transform 0.2s ease-in-out",
            boxShadow: 3,
          },
        }}
      >
        <Box height={200} overflow={"hidden"}>
          <Image
            src={product?.thumbnail || ""}
            height={200}
            width={250}
            alt="product image"
            className="w-full h-[200px]"
          />
        </Box>
        <CardContent>
          <Typography
            fontWeight={500}
            fontSize={16}
            gutterBottom
            variant="h5"
            component="div"
            color="#000000"
          >
            {product.productName}
          </Typography>
          <Typography fontWeight={500} fontSize={16} variant="h5">
            {product?.discountPercentage ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography color="primary.main">
                  $
                  {((product.discountPercentage / 100) * product.price).toFixed(
                    2
                  )}
                </Typography>
                <Typography sx={{ textDecoration: "line-through" }}>
                  ${product?.price}
                </Typography>
              </Box>
            ) : (
              <>${product?.price} </>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
