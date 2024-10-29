import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// enum DonationStatusEnum {
//   pending = "pending",
//   completed = "completed",
//   reserved = "reserved",
// }

// type DonationStatus = {
//   status: DonationStatusEnum;
//   accessToken: string;
// };

export const getDonationStatus = async ({ accessToken, status }: any) => {
  const getDonation = await axios.get(`${apiUrl}/donation`, {
    params: {
      status,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return getDonation;
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
