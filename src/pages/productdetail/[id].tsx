import MainLayout from "@/layouts/MainLayout";
import Head from "next/head";
import ProductDetailModule from "@/modules/ProductDetailModule";
import { products } from "@/data/product";
import { Product } from "@/types/ProductType";
import { GetServerSidePropsContext } from "next";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <MainLayout>
      <Head>
        <title>Nenodi | Mystery Scoop</title>
        <meta
          name="description"
          content="At NENODI, we bring joy through play, creativity, and surprises. Our unique game lets you discover fun stationery and toys in an exciting, interactive way. Whether you’re a kid, a teen, or just young at heart, every pick is a little treasure waiting to brighten your day"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProductDetailModule {...{ product }} />
    </MainLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params } = context;
  const id = params?.id as string;
  const productsData: Product[] = products;
  const product: Product =
    productsData.find((product) => product.id === +id) ?? productsData[0];

  return {
    props: {
      product,
    },
  };
}
