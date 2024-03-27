import ProductDetailsCarousel from "@/components/productPage/ProductDetailsCarousel";
import { Container, Divider, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { TProduct } from "@/type/product.type";

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
    `${process.env.SERVER_URL}/product/${params.productId}`
  );
  const { data } = await res.json();
  const {
    brand,
    description,
    images,
    thumbnail,
    price,
    weight,
    type,
    stock,
    features,
    title,
  } = data as TProduct;
  return (
    <Container sx={{ my: 3 }}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <ProductDetailsCarousel
            images={images}
            thumbnail={thumbnail}
          ></ProductDetailsCarousel>
        </div>
        <div className="w-full lg:w-1/2">
          <Typography component="p" variant="body1">
            {brand}
          </Typography>
          <Typography
            component="h3"
            variant="h4"
            fontWeight={600}
            mt={1}
            color="#414141"
          >
            {title}
          </Typography>
          <Typography
            component="h3"
            variant="h3"
            fontWeight={500}
            mt={1}
            color="primary.main"
          >
            ${price}
          </Typography>
          <Divider sx={{ my: 2 }}></Divider>
          <div className="w-full max-h-[300px] h-auto overflow-y-scroll text-justify">
            <Typography component="p" variant="body1">
              {description}
            </Typography>
          </div>
          <div className="flex justify-between items-center pt-4 text-primary">
            <p>
              <span className="text-[17px] font-semibold">Type:</span> {type}
            </p>
            <p>
              <span className="text-[17px] font-semibold">Weight:</span>{" "}
              {weight}
            </p>
          </div>
          {features?.length && (
            <ul className="mt-4 space-y-2 ml-2">
              {features?.map((feature: string, index: number) => (
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
        </div>
      </div>
    </Container>
  );
};
export default ProductDetailsPage;
