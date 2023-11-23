import axios from "axios";
import camelCaseKeys from "camelcase-keys";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    if (response?.data) {
      response.data = camelCaseKeys(response.data, {
        deep: true,
      });
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error?.response && error?.response?.data) {
      error.response.data = camelCaseKeys(error.response.data, {
        deep: true,
      });
    }
    return Promise.reject(error);
  }
);

type DogFacts = {
  facts: string[];
};

const BASE_URL = "https://dogapi.dog";

export const getDogFacts = async (): Promise<string[]> => {
  const response = await axiosInstance.get<DogFacts>(`${BASE_URL}/api/facts`);
  // console.log(response.data);
  return response.data.facts;
};
