import ProductDetailsCarousel from "@/components/productPage/ProductDetailsCarousel";
import {
  Box,
  Container,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { TProduct } from "@/type";
import ShowProductFeedback from "./components/ShowReview";
import AddToCartButton from "@/components/ui/AddToCartButton";
import ShowRelatedProducts from "./components/ShowRelatedProducts";

type TProductDetailPageProp = {
  params: {
    productId: string;
  };
};

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/products`);
  const products = await res.json();

  return products.data.slice(0, 10).map((product: TProduct) => ({
    productId: product._id,
  }));
};

const ProductDetailsPage = async ({ params }: TProductDetailPageProp) => {
  const res = await fetch(
    `${process.env.SERVER_URL}/products/${params.productId}`,
    {
      next: {
        tags: ["productDetails"],
      },
    }
  );
  const { data: product } = await res.json();
  // console.log(product);
  const calculatePrice = (price: number, discount: number) => {
    return (price - (discount / 100) * price).toFixed(2);
  };

  const currentPrice =
    product?.currentlyFlashSale && product.flashSale
      ? calculatePrice(
          product.price,
          product.flashSale?.flashSaleDiscountPercentage
        )
      : product?.discountPercentage
      ? calculatePrice(product.price, product?.discountPercentage)
      : product?.price.toFixed(1);

  const currentDiscount =
    product?.currentlyFlashSale && product?.flashSale
      ? product.flashSale.flashSaleDiscountPercentage
      : product?.discountPercentage
      ? product.discountPercentage
      : false;

  // console.log({ currentDiscount, currentPrice });
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <ProductDetailsCarousel
            images={product?.images}
            thumbnail={product?.thumbnail}
          ></ProductDetailsCarousel>
        </div>
        <div className="w-full lg:w-1/2">
          <Stack gap={1.5}>
            {currentDiscount ? (
              <Typography
                sx={{
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
                {currentDiscount}% OFF
              </Typography>
            ) : (
              ""
            )}
            <Typography
              component="h3"
              variant="h4"
              fontWeight={600}
              mt={1}
              color="#414141"
            >
              {product?.productName}
            </Typography>

            <Box>
              <Typography
                fontSize={{ md: 30, xs: 20 }}
                fontWeight={600}
                textAlign="center"
                component="span"
                variant="h2"
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
            <Rating
              precision={0.5}
              value={product.rating}
              readOnly
              size="medium"
              sx={{ mt: "5px" }}
            />
            <Typography>Review({product?.ratingCount})</Typography>
            <Typography>
              Available Quantity: {product?.availableQuantity}
            </Typography>
          </Stack>

          <Divider sx={{ my: 2 }}></Divider>
          <div className="w-full max-h-[300px] h-auto overflow-y-scroll text-justify">
            <Typography component="p" variant="body1">
              {product?.description}
            </Typography>
          </div>

          {product && product?.features && product.features?.length && (
            <Stack sx={{ mt: 2, ml: 1 }} gap={1}>
              {product.features?.map((feature: string, index: number) => (
                <Typography
                  key={index}
                  variant="body1"
                  component="li"
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  fontSize={18}
                >
                  <CheckBoxIcon className="text-primary" />{" "}
                  <span>{feature}</span>
                </Typography>
              ))}
            </Stack>
          )}
          <Box mt={2} sx={{ display: "flex", justifyContent: "end" }}>
            <AddToCartButton
              // fullWidth={false}
              price={product?.price}
              productId={product?.productId}
              thumbnail={product?.thumbnail}
              productName={product?.productName}
            />
          </Box>
        </div>
      </div>
      <Divider sx={{ my: { xs: 4, md: 6 } }} />
      <Box>
        <ShowProductFeedback
          feedbacks={product?.productFeedbacks}
          productId={params.productId}
        />
      </Box>

      <ShowRelatedProducts mainCategory={product?.mainCategory} />
    </Container>
  );
};
export default ProductDetailsPage;
