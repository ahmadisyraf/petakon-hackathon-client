import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

type Organization = {
  organizationName: string;
  accessToken: string;
};

export const createOrganization = async ({
  organizationName,
  accessToken,
}: Organization) => {
  const createdOrganization = await axios.post(
    `${apiUrl}/organization`,
    {
      organizationName,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return createdOrganization;
};
