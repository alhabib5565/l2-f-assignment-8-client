import ProductDetailsCarousel from "@/components/productPage/ProductDetailsCarousel";
import { Container, Divider, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
const ProductDetailsPage = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <ProductDetailsCarousel></ProductDetailsCarousel>
        </div>
        <div className="w-full lg:w-1/2">
          <Typography component="p" variant="body1">
            Categroy
          </Typography>
          <Typography
            component="h3"
            variant="h4"
            fontWeight={600}
            mt={1}
            color="#414141"
          >
            Product Name
          </Typography>
          <Typography
            component="h3"
            variant="h3"
            fontWeight={500}
            mt={1}
            color="primary.main"
          >
            $58.00
          </Typography>
          <Divider sx={{ my: 2 }}></Divider>
          <div className="w-full max-h-[300px] h-auto overflow-y-scroll text-justify">
            <Typography component="p" variant="body1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit
              fuga numquam aperiam ipsum, beatae reiciendis ex ea, eos
              laudantium dolores perferendis. Ratione ea, assumenda nesciunt cum
              ipsa placeat, voluptates quisquam illo id dolor sint commodi
              quaerat numquam consequuntur laudantium atque veritatis, minima
              reiciendis harum deserunt vel inventore distinctio! Tenetur,
              dolorum quibusdam. Saepe, quasi illum maxime modi fugit
              voluptatem. Placeat distinctio dolores voluptate aliquid non
              laudantium velit voluptates nostrum ex labore soluta id vel ab
            </Typography>
          </div>
          <ul className="mt-4 space-y-2 ml-2">
            <Typography
              variant="body1"
              component="li"
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
              fontSize={18}
            >
              <CheckBoxIcon className="text-primary" />{" "}
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </Typography>
            <Typography
              variant="body1"
              component="li"
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
              fontSize={18}
            >
              <CheckBoxIcon className="text-primary" />{" "}
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </Typography>
            <Typography
              variant="body1"
              component="li"
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
              fontSize={18}
            >
              <CheckBoxIcon className="text-primary" />{" "}
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
            </Typography>
          </ul>
        </div>
      </div>
    </Container>
  );
};
export default ProductDetailsPage;
