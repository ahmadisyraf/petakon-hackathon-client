import axios from "axios";
import useSWR from "swr";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getDonationStatus = ({
  accessToken,
  status,
}: {
  accessToken: string;
  status: "pending" | "reserved" | "completed";
}) => {
  const fetcher = (url: string) =>
    axios
      .get(url, {
        params: {
          status,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data);
  const { data, isLoading, error } = useSWR(`${apiUrl}/donation`, fetcher, {
    refreshInterval: 1000,
  });

  return {
    data,
    loading: isLoading,
    error,
  };
};

type Donation = {
  title: string;
  description: string;
  foodType: string;
  donationSize: string;
  transportationMethod: string;
  accessToken: string;
};

export const createDonation = async ({
  title,
  description,
  foodType,
  donationSize,
  transportationMethod,
  accessToken,
}: Donation) => {
  const createdDonation = await axios.post(
    `${apiUrl}/donation`,
    {
      title,
      description,
      foodType,
      donationSize,
      transportationMethod,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return createdDonation;
};

enum DonationStatusEnum {
  pending = "pending",
  completed = "completed",
  reserved = "reserved",
}

type UpdateDonation = {
  accessToken: string;
  status: any;
  id: string;
};

export const updateDonation = async ({
  accessToken,
  status,
  id,
}: UpdateDonation) => {
  const updatedDonation = await axios.patch(
    `${apiUrl}/donation/${id}`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return updatedDonation;
};
