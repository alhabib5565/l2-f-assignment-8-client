import Filter from "@/components/productPage/Filter";
import ProductPagination from "@/components/productPage/ProductPagination";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type";
import { Box, Container } from "@mui/material";

const ProductsPage = async (props: any) => {
  const parms = new URLSearchParams(props.searchParams).toString();
  const res = await fetch(
    `${process.env.SERVER_URL}/products?${parms}&limit=12`,
    {
      cache: "no-store",
    }
  );
  const products = await res.json();

  const response = await fetch(
    `${process.env.SERVER_URL}/categories/top/categories`
  );
  const categories = await response.json();
  return (
    <Box py={{ xs: 6, md: 10 }}>
      <Container>
        <div className="flex gap-8">
          <Filter categories={categories?.data || []} />{" "}
          <div className="flex-1">
            <SectionHeader
              title="Our Products"
              description="Discover what's trending! Explore our selection of customer-favorite laundry essentials."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
              {products.data.map((product: TProduct) => (
                <ProductCard product={product} key={product._id} />
              ))}
            </div>
          </div>
        </div>
        <ProductPagination meta={products?.meta} />
      </Container>
    </Box>
  );
};

export default ProductsPage;
