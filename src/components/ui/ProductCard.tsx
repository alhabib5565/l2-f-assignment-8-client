import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Box } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TProduct } from "@/type/product.type";
import Link from "next/link";
const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <Card
      className="hover:-translate-y-2 transition-all duration-300 h-auto relative mx-auto"
      sx={{ maxWidth: 400, width: "100%", flex: 1 }}
    >
      <Box>
        <Image
          src={product?.thumbnail || ""}
          height={200}
          width={300}
          alt="product image"
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product?.brand}
        </Typography>
        <div className=" flex items-center justify-between">
          <Typography>
            {product?.discountPercentage ? (
              <>
                ${" "}
                {((product.discountPercentage / 100) * product.price).toFixed(
                  2
                )}{" "}
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
        <Button size="small" sx={{ gap: 2, flex: 1 }}>
          <span className="truncate">Add To Cart </span>
          <ShoppingCartIcon />
        </Button>
        <Link href={`laundry-products/${product?._id}`}>
          <Button size="small" variant="outlined">
            <VisibilityIcon />
          </Button>
        </Link>
      </CardActions>
      {product?.discountPercentage && (
        <span
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 90% 50%, 100% 100%, 0% 100%)",
          }}
          className="bg-secondary h-10 w-28 flex justify-center items-center text-white font-semibold  absolute top-0 left-0"
        >
          {product.discountPercentage}% OFF
        </span>
      )}
    </Card>
  );
};

export default ProductCard;
