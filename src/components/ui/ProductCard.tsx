import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Box } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
const ProductCard = () => {
  return (
    <Card
      className="hover:-translate-y-2 transition-all duration-300 h-auto relative mx-auto"
      sx={{ maxWidth: 400, width: "100%", flex: 1 }}
    >
      <Box>
        <Image
          src="https://chaldn.com/_mpimage/rok-shuvro-detergent-laundry-wash-buy-3-get-1-free-500-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D91847&q=best&v=1&m=400&webp=1"
          height={100}
          width={300}
          alt="product image"
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <div className=" flex items-center justify-between">
          <Typography>
            $95.00 <sub className="line-through">$200</sub>
          </Typography>
          <Typography>2 kg</Typography>
        </div>
      </CardContent>
      <CardActions className="gap-2" sx={{ px: 2 }}>
        <Button size="small" sx={{ gap: 2, flex: 1 }}>
          <span className="truncate">Add To Cart </span>
          <ShoppingCartIcon />
        </Button>
        <Button size="small" variant="outlined">
          <VisibilityIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
