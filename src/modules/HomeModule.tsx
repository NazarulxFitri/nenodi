import ProductCard from "@/components/Cards/ProductCard";
import { products } from "@/data/product";
import { Container, Grid } from "@mui/material";
import "swiper/css";

const HomeModule = () => {
  const productsData = products;

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid>
          <ProductCard
            name={productsData[0].name}
            id={productsData[0].id}
            fromPrice={productsData[0].variants[0].price}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeModule;
