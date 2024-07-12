import ProductDetailsCarousel from "@/components/productPage/ProductDetailsCarousel";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { TProduct } from "@/type";
import ShowReview from "./components/ShowReview";
import AddToCartButton from "@/components/ui/AddToCartButton";

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
    `${process.env.SERVER_URL}/products/${params.productId}`
  );
  const { data } = await res.json();
  return (
    <Container sx={{ my: 8 }}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <ProductDetailsCarousel
            images={data?.images}
            thumbnail={data?.thumbnail}
          ></ProductDetailsCarousel>
        </div>
        <div className="w-full lg:w-1/2">
          <Typography component="p" variant="body1">
            {data?.brand || "no brand"}
          </Typography>
          <Typography
            component="h3"
            variant="h4"
            fontWeight={600}
            mt={1}
            color="#414141"
          >
            {data?.productName}
          </Typography>
          <Typography
            component="h3"
            variant="h3"
            fontWeight={500}
            mt={1}
            color="primary.main"
          >
            ${data?.price}
          </Typography>
          <Divider sx={{ my: 2 }}></Divider>
          <div className="w-full max-h-[300px] h-auto overflow-y-scroll text-justify">
            <Typography component="p" variant="body1">
              {data?.description}
            </Typography>
          </div>
          <div className="flex justify-between items-center pt-4 text-primary">
            <p>
              <span className="text-[17px] font-semibold">Type:</span>{" "}
              {data?.type}
            </p>
            <p>
              <span className="text-[17px] font-semibold">Weight:</span> weight
            </p>
          </div>
          {data && data?.features && data.features?.length && (
            <ul className="mt-4 space-y-2 ml-2">
              {data.features?.map((feature: string, index: number) => (
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
            </ul>
          )}
          <Box mt={2}>
            <AddToCartButton
              price={data?.price}
              productId={data?.productId}
              thumbnail={data?.thumbnail}
              productName={data?.productName}
            />
          </Box>
        </div>
      </div>
      <Divider sx={{ my: { xs: 4, md: 8 } }} />
      <Box>
        <ShowReview productId={params.productId} />
      </Box>
    </Container>
  );
};
export default ProductDetailsPage;
