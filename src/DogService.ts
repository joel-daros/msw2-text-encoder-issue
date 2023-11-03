import axios from "axios";

const axiosInstance = axios.create();

type DogFacts = {
  facts: string[];
};

const BASE_URL = "https://dogapi.dog";

export const getDogFacts = async (): Promise<string[]> => {
  const response = await axiosInstance.get<DogFacts>(`${BASE_URL}/api/facts`);
  // console.log(response.data);
  return response.data.facts;
};
