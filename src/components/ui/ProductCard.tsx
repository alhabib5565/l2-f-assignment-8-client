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
            {product.title}
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

/**
 *  <Card
      className="hover:-translate-y-2 transition-all duration-300 h-auto relative mx-auto"
      sx={{ maxWidth: 400, width: "100%", flex: 1, position: "relative" }}
    >
      <Box>
        <Image
          src={product?.thumbnail || ""}
          height={200}
          width={250}
          alt="product image"
          className="w-full h-[200px]"
        />
      </Box>

      <CardContent>
        <Typography fontWeight={500} fontSize={16} gutterBottom variant="h5" component="div">
          {product?.brand}
        </Typography>
        <div className=" flex items-center justify-between">
          <Typography>
            {product?.discountPercentage ? (
              <>
                ${" "}
                {((product.discountPercentage / 100) * product.price).toFixed(
                  2
                )}
                <sub className="line-through">${product.price}</sub>
              </>
            ) : (
              <>${product?.price} </>
            )}
          </Typography>
          <Typography>{product?.weight}</Typography>
        </div>
      </CardContent>
      <CardActions className="gap-2" sx={{ px: 2 }}>
        <AddToCartButton
          productId={product._id}
          price={product.price}
          thumbnail={product.thumbnail}
          title={product.title}
        />
        <Link href={`products/${product?._id}`}>
          <Button size="small" variant="outlined">
            <VisibilityIcon />
          </Button>
        </Link>
      </CardActions>
      {product?.discountPercentage ? (
        <span
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%)",
          }}
          className="bg-secondary h-10 w-32 flex justify-center items-center text-white font-semibold  absolute top-0 left-0"
        >
          {product.discountPercentage}% OFF
        </span>
      ) : (
        ""
      )}
    </Card>
 */
