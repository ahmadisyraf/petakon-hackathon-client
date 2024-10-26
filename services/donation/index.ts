import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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
