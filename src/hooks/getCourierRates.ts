import { useState } from "react";
import axios, { AxiosError } from "axios";

interface CourierRateRequest {
  pickup_postcode: string;
  delivery_postcode: string;
  weight: number;
}

interface CourierRate {
  courier_id: string;
  service_detail: string;
  price: number;
  [key: string]: unknown; // More flexible for arbitrary properties
}

interface EasyParcelResponse {
  result: CourierRate[];
}

export const useGetCourierRates = () => {
  const [data, setData] = useState<CourierRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async (data: CourierRateRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<EasyParcelResponse>(
        "http://connect.easyparcel.my/?ac=EPRateCheckingBulk",
        {
          api_key: "EP-vFgM9QFnb",
          ...data,
        }
      );
      const filteredRates = response.data.result.filter(
        (r: CourierRate) =>
          r.courier_id === "EP-CR0DS" && r.service_detail === "pickup"
      );

      setData(filteredRates);
      return filteredRates;
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.message || "Failed to fetch courier rates");
      } else if (err instanceof Error) {
        setError(err.message || "Failed to fetch courier rates");
      } else {
        setError("An unknown error occurred");
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchRates,
  };
};
