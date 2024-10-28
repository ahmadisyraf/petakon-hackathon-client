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

type joinOrganization = {
  memberKey: string;
  accessToken: string;
};

export const joinOrganization = async ({
  memberKey,
  accessToken,
}: joinOrganization) => {
  const joinedOrganization = await axios.patch(
    `${apiUrl}/organization/join`,
    {
      memberKey,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return joinedOrganization;
};

export const getOrgById = async (accessToken: string) => {
  const getOrg = await axios.get(`${apiUrl}/organization`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return getOrg;
};
