import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Badge, Box, Rating } from "@mui/material";
import Link from "next/link";
import { TProduct } from "@/type";
import AddToCartButton from "./AddToCartButton";
import dynamic from "next/dynamic";
const CountDownTimer = dynamic(() => import("../shared/CountDownTimer"), {
  ssr: true,
});
const ProductCard = ({ product }: { product: TProduct }) => {
  const calculatePrice = (price: number, discount: number) => {
    return (price - (discount / 100) * price).toFixed(2);
  };

  // Inside ProductCard component
  const currentPrice =
    product.currentlyFlashSale && product.flashSale
      ? calculatePrice(
          product.price,
          product.flashSale.flashSaleDiscountPercentage
        )
      : product.discountPercentage
      ? calculatePrice(product.price, product.discountPercentage)
      : product.price.toFixed(2);

  return (
    <Link href={`products/${product?._id}`}>
      <Card
        sx={{
          maxWidth: 345,
          height: "100%",
          "&:hover img": {
            transform: "rotate(10deg) scale(1.2)",
            transition: "transform 0.1s ease-in-out",
            boxShadow: 3,
          },
          "&:hover .add-to-cart-button": {
            transform: "translateY(-100%)",
            transition: "transform 0.1s ease-in-out",
          },
        }}
      >
        {/* Image and button */}
        <Box height={200} overflow={"hidden"} sx={{ position: "relative" }}>
          <Image
            src={product?.thumbnail || ""}
            height={200}
            width={250}
            alt="product image"
            style={{
              width: "100%",
              height: "100%",
              transition: "transform 0.1s ease-in-out",
            }}
          />
          {product.discountPercentage ? (
            <Typography
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                width: 70,
                textAlign: "center",
                bgcolor: "primary.main",
                fontSize: 12,
                color: "white",
                px: 1,
                py: 0.5,
                borderRadius: "15px",
              }}
            >
              {product.discountPercentage}% OFF
            </Typography>
          ) : (
            ""
          )}
          <Box
            className="add-to-cart-button"
            sx={{
              left: 0,
              right: 0,
              transform: "translateY(0)",
              transition: "transform 0.1s ease-in-out",
            }}
          >
            <AddToCartButton
              price={product.price}
              productId={product.productId}
              thumbnail={product.thumbnail}
              productName={product.productName}
            />
          </Box>
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
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                fontSize={14}
                fontWeight={600}
                textAlign="center"
                component="span"
                color="primary.main"
              >
                Tk{currentPrice}
              </Typography>

              {product?.discountPercentage ? (
                <Typography
                  fontSize={14}
                  fontWeight={600}
                  textAlign="center"
                  component={"span"}
                  sx={{ textDecoration: "line-through", ml: 1 }}
                >
                  TK{product?.price}
                </Typography>
              ) : (
                ""
              )}
            </Box>

            {product.flashSale && product.currentlyFlashSale && (
              <CountDownTimer endDate={product.flashSale.flashSaleEndDate} />
            )}
          </Box>
          <Rating
            value={product.rating}
            readOnly
            size="medium"
            sx={{ mt: "5px" }}
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
