import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";
import HomeModule from "@/modules/HomeModule";
import { carouselImages } from "@/data/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <MainLayout>
      <Head>
        <title>Nenodi | Home</title>
        <meta
          name="description"
          content="At NENODI, we bring joy through play, creativity, and surprises. Our unique game lets you discover fun stationery and toys in an exciting, interactive way. Whether you’re a kid, a teen, or just young at heart, every pick is a little treasure waiting to brighten your day"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ background: "#ece3f0" }}>
        <Grid container py={{ xs: 0, md: 2 }} alignItems={"center"}>
          <Grid size={{ xs: 12, md: 6 }} p={6}>
            <Box>
              <Typography variant="h6" fontWeight={"300"}>
                <span style={{ fontSize: "24px" }}>At NENODI</span>, we bring
                joy through play, creativity, and surprises. Our unique game
                lets you discover fun stationery and toys in an exciting,
                interactive way. Whether you’re a kid, a teen, or just young at
                heart, every pick is a little treasure waiting to brighten your
                day.
              </Typography>
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 4 }}
                onClick={() => router.push("/productdetail/1")}
              >
                <Typography
                  variant="body2"
                  fontWeight={"700"}
                  textTransform={"uppercase"}
                >
                  Check our product
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Swiper
              style={{ zIndex: 0 }}
              spaceBetween={0.5}
              slidesPerView={3}
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
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <Swiper
              style={{ zIndex: 0 }}
              spaceBetween={0.5}
              slidesPerView={2}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Autoplay]}
              autoplay={{
                delay: 1000,
                disableOnInteraction: false,
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
        </Grid>
      </Box>
      <HomeModule />
    </MainLayout>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {},
  };
}
