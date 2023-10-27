import axios from "axios";

const axiosInstance = axios.create();

type DogFacts = {
  facts: string[];
};

export const getDogFacts = async (): Promise<string[]> => {
  const response = await axiosInstance.get<DogFacts>(
    "https://dogapi.dog/api/facts"
  );
  // console.log(response.data);
  return response.data.facts;
};
