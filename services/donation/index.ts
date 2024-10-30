import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getManyDonation = async ({
  accessToken,
  status,
}: {
  accessToken: string;
  status: "pending" | "reserved" | "completed";
}) => {
  const getDonation = await axios.get(`${apiUrl}/donation`, {
    params: {
      status,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return getDonation.data;
};

export const getUserDonation = async ({
  accessToken,
  status,
}: {
  accessToken: string;
  status: "pending" | "completed" | "reserved";
}) => {
  const getDonation = await axios.get(`${apiUrl}/donation/current-user`, {
    params: {
      status,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return getDonation.data;
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
type ReserveDonation = {
  accessToken: string;
  id: string;
};

export const reserveDonation = async ({ accessToken, id }: ReserveDonation) => {
  const reservedDonation = await axios.post(
    `${apiUrl}/reservation/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return reservedDonation.data;
};

type ReceivedDonation = {
  accessToken: string;
  id: string;
};

export const recieveDonation = async ({
  accessToken,
  id,
}: ReceivedDonation) => {
  const reservedDonation = await axios.patch(
    `${apiUrl}/reservation/${id}`,
    {
      status: "completed",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return reservedDonation.data;
};

type FindReservation = {
  accessToken: string;
};

export const findManyReservation = async ({
  accessToken,
}: FindReservation) => {
  const reservedDonation = await axios.get(`${apiUrl}/reservation`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return reservedDonation.data;
};
