import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

type AuthenticateUser = {
  email: string;
  password: string;
};

export const authenticateUser = async ({
  email,
  password,
}: AuthenticateUser): Promise<{ accessToken: string }> => {
  try {
    const response = await axios.post(`${apiUrl}/auth`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    return { accessToken: "" };
  }
};

type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "user" | "organization" | undefined;
};

export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: CreateUser) => {
  const response = await axios.post(`${apiUrl}/users`, {
    firstName,
    lastName,
    email,
    password,
    role,
  });

  return response.data;
};

export const getUserById = async (accessToken: string) => {
  const getUser = await axios.get(`${apiUrl}/users/current-user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return getUser;
};
