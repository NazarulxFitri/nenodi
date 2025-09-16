import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MainLayout from "@/layouts/MainLayout";
import axios from "axios";
import cookie from "cookie";
import { CourierResponse } from "@/types/CourierResponseType";
import CheckoutModule from "@/modules/CheckoutModule";

interface CheckoutProps {
  data: CourierResponse;
}

export default function Checkout({ data }: CheckoutProps) {
  return (
    <MainLayout>
      <Head>
        <title>Nenodi | Checkout</title>
        <meta
          name="description"
          content="At NENODI, we bring joy through play, creativity, and surprises. Our unique game lets you discover fun stationery and toys in an exciting, interactive way. Whether you’re a kid, a teen, or just young at heart, every pick is a little treasure waiting to brighten your day"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CheckoutModule courierData={data} />
    </MainLayout>
  );
}

export async function getServerSideProps({
  req,
  locale,
}: {
  req: any;
  locale: string;
}) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const deliveryInfo = cookies.deliveryInfo
      ? JSON.parse(cookies.deliveryInfo)
      : null;
    const send_code = deliveryInfo?.postcode || "43650";
    const send_state = deliveryInfo?.state || "Selangor";
    const send_country = deliveryInfo?.country || "MY";
    const weight = deliveryInfo?.weight || "2";

    const response = await axios.post(
      "https://connect.easyparcel.my/?ac=EPRateCheckingBulk",
      {
        api: "EP-vFgM9QFnb",
        bulk: [
          {
            pick_code: "43650",
            pick_state: "Selangor",
            pick_country: "MY",
            send_code,
            send_state,
            send_country,
            weight,
          },
        ],
      }
    );
    const data =
      response.data.result[0].rates.find(
        (courier: { courier_id: string; service_detail: string }) =>
          courier.courier_id === "EP-CR0DS" &&
          courier.service_detail === "pickup"
      ) ??
      response.data.result[0].rates.find(
        (courier: { courier_id: string; service_detail: string }) =>
          courier.courier_id === "EP-CR0ID" &&
          courier.service_detail === "pickup"
      );
    return {
      props: {
        data,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (err: any) {
    console.error("EasyParcel fetch error:", err.message);
    return {
      props: {
        rates: [],
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
}
