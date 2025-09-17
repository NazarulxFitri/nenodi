import Head from "next/head";
import MainLayout from "@/layouts/MainLayout";
import ShoppingCartModule from "@/modules/ShoppingCartModule";

export default function ShoppingCart() {
  return (
    <MainLayout>
      <Head>
        <title>Nenodi | Shopping Cart</title>
        <meta
          name="description"
          content="At NENODI, we bring joy through play, creativity, and surprises. Our unique game lets you discover fun stationery and toys in an exciting, interactive way. Whether you’re a kid, a teen, or just young at heart, every pick is a little treasure waiting to brighten your day"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ShoppingCartModule />
    </MainLayout>
  );
}

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {},
  };
}
