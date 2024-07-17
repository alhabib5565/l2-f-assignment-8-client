import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Box, Rating } from "@mui/material";
import Link from "next/link";
import { TProduct } from "@/type";
import AddToCartButton from "./AddToCartButton";
import dynamic from "next/dynamic";
const CountDownTimer = dynamic(() => import("../shared/CountDownTimer"), {
  ssr: true,
});
const ProductCard = ({ product }: { product: TProduct }) => {
  const currentPrice =
    product.discountPercentage &&
    ((product?.discountPercentage / 100) * product.price).toFixed(2);

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
            {product?.discountPercentage ? (
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
                <Typography
                  fontSize={14}
                  fontWeight={600}
                  textAlign="center"
                  component={"span"}
                  sx={{ textDecoration: "line-through", ml: 1 }}
                >
                  TK{product?.price}
                </Typography>
              </Box>
            ) : (
              <>${product?.price} </>
            )}
            {product.flashSale && (
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
