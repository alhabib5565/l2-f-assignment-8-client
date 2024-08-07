import Filter from "@/components/productPage/Filter";
import ProductPagination from "@/components/productPage/ProductPagination";
import ProductSorterTab from "@/components/productPage/ProductSorterTab";
import SectionHeader from "@/components/shared/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { TProduct } from "@/type";
import { Box, Container, Grid } from "@mui/material";

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
    <Box py={6}>
      <Container>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Filter categories={categories?.data || []} />
          </Box>{" "}
          <Box flex={1}>
            {/* <SectionHeader
              title="Our Products"
              description="Discover what's trending! Explore our selection of customer-favorite laundry essentials."
            /> */}
            <ProductSorterTab />
            <Grid container spacing={2} mt={3}>
              {products.data.map((product: TProduct) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <ProductPagination meta={products?.meta} />
      </Container>
    </Box>
  );
};

export default ProductsPage;
