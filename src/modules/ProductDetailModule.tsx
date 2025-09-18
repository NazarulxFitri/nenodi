import {
  BUTTON_TEXT_CONSTANT,
  CURRENCY_CONSTANT,
} from "@/constants/commonConstant";
import { carouselImages } from "@/data/product";
import { useCartStore } from "@/stores/useCartStores";
import type { Product, ProductVariant } from "@/types/ProductType";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ProductDetailModuleProps {
  product: Product;
}

const ProductDetailModule: React.FC<ProductDetailModuleProps> = ({
  product,
}) => {
  const router = useRouter();
  const fromPrice = Math.min(...product.variants.map((v) => v.price));
  const toPrice = Math.max(...product.variants.map((v) => v.price));
  const [selectedVariantId, setSelectedVariantId] = useState<number>(
    product.variants[0].variantId
  );
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    const currVariant = product.variants.find(
      (variant) => variant.variantId === selectedVariantId
    );
    setSelectedVariant(currVariant ?? product.variants[0]);
  }, [selectedVariantId]);

  return (
    <Container sx={{ my: 6 }}>
      <Box mb={2}>
        <Typography fontWeight={"700"} sx={{ color: "#d3bbdd" }}>
          <Link href={"/"} style={{ color: "#f8c0c8" }}>
            Home
          </Link>{" "}
          - {product.name}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid size={6} display={{ xs: "none", md: "block" }}>
          <Box>
            <Image
              src={product.imgSrc}
              alt={product.name}
              width={400}
              height={400}
              style={{
                display: "block",
                height: "600px",
                width: "100%",
              }}
            />
          </Box>
        </Grid>
        <Grid size={12} display={{ xs: "block", md: "none" }}>
          <Box>
            <Image
              src={product.imgSrc}
              alt={product.name}
              width={400}
              height={400}
              style={{
                display: "block",
                height: "400px",
                width: "100%",
              }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Box>
              <Typography
                variant="h4"
                fontWeight={"300"}
                textTransform={"uppercase"}
              >
                {product.name}
              </Typography>
              <Typography variant="h4" fontWeight={"300"} mt={0.5}>
                {CURRENCY_CONSTANT.MYR} {fromPrice} - {CURRENCY_CONSTANT.MYR}{" "}
                {toPrice}
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box display="flex" flexDirection="column" rowGap={2}>
              <Box>
                <FormControl fullWidth size="small">
                  <InputLabel id="variant-label" shrink>
                    Variants
                  </InputLabel>
                  <Select
                    labelId="variant-label"
                    id="variant-select"
                    value={selectedVariantId as unknown as string}
                    onChange={(e: SelectChangeEvent) =>
                      setSelectedVariantId(Number(e.target.value))
                    }
                    input={
                      <OutlinedInput
                        sx={{ borderRadius: 0 }}
                        notched
                        label="Variants"
                      />
                    }
                  >
                    {product.variants.map((variant) => (
                      <MenuItem
                        key={variant.variantId}
                        value={variant.variantId}
                      >
                        {variant.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <TextField
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  value={quantity}
                  type="number"
                  variant="outlined"
                  size="small"
                  label="Quantity"
                  slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                      inputProps: { min: 1 },
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={"700"}>
                  {CURRENCY_CONSTANT.MYR} {selectedVariant.price * quantity}
                </Typography>
              </Box>
              <Box>
                <Snackbar
                  open={showMessage}
                  autoHideDuration={2000}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  onClose={() => setShowMessage(false)}
                  message="Product added successfully"
                  sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiSnackbarContent-root": {
                      backgroundColor: "#d3bbdd",
                      fontWeight: "bold",
                      borderRadius: "8px",
                    },
                  }}
                />
                <Snackbar
                  open={showMessage}
                  autoHideDuration={2000}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  onClose={() => setShowMessage(false)}
                  message="Product added successfully"
                  sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiSnackbarContent-root": {
                      backgroundColor: "#d3bbdd",
                      fontWeight: "bold",
                      borderRadius: "8px",
                    },
                  }}
                />
                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    addToCart({
                      variantId: selectedVariant.variantId,
                      name: selectedVariant.name,
                      price: selectedVariant.price,
                      quantity: quantity,
                      imgSrc: product.imgSrc,
                    });
                    setShowMessage(true);
                  }}
                >
                  <Typography fontWeight={"700"} textTransform={"uppercase"}>
                    {BUTTON_TEXT_CONSTANT.ADDTOCART}
                  </Typography>
                </Button>
                <Button
                  sx={{ mt: 1 }}
                  size="large"
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    router.push("/shoppingcart");
                  }}
                >
                  <Typography fontWeight={"700"} textTransform={"uppercase"}>
                    Go to Cart
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Grid
          size={{ xs: 12, md: 6 }}
          mt={6}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Swiper
            style={{ zIndex: 0 }}
            spaceBetween={0.5}
            slidesPerView={5}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Autoplay]}
            autoplay={{
              delay: 1000, // 3 seconds per slide
              disableOnInteraction: false, // keep autoplaying after user swipes
            }}
          >
            {carouselImages?.map((image, id) => (
              <SwiperSlide key={id}>
                <Image
                  src={image.imgSrc}
                  alt={"Nenodi"}
                  width={300}
                  height={320}
                  style={{ display: "block", height: "100%", width: "auto" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        <Grid
          size={{ xs: 12, md: 6 }}
          mt={2}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Swiper
            style={{ zIndex: 0 }}
            spaceBetween={0.5}
            slidesPerView={2}
            onSwiper={(swiper) => console.log(swiper)}
            modules={[Autoplay]}
            autoplay={{
              delay: 1000, // 3 seconds per slide
              disableOnInteraction: false, // keep autoplaying after user swipes
            }}
          >
            {carouselImages?.map((image, id) => (
              <SwiperSlide key={id}>
                <Image
                  src={image.imgSrc}
                  alt={"Nenodi"}
                  width={300}
                  height={320}
                  style={{ display: "block", height: "100%", width: "auto" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetailModule;
