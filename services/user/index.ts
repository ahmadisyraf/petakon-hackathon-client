import axios from "axios";

type AuthenticateUser = {
  email: string;
  password: string;
};

export const authenticateUser = async ({
  email,
  password,
}: AuthenticateUser): Promise<{ accessToken: string }> => {
  try {
    const response = await axios.post("http://localhost:3000/auth", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    return { accessToken: "" };
  }
};

type CreateUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export const createUser = async ({
  first_name,
  last_name,
  email,
  password,
}: CreateUser) => {
  const response = await axios.post("http://localhost:3000/users", {
    first_name,
    last_name,
    email,
    password,
  });

  return response.data;
};
