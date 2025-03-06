import axios from "axios";

const BASE_URL = "https://dog.ceo/api";

export const fetchDogImages = async (breed: string): Promise<string[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/breed/${breed}/images/random/10`);
    console.log("response", response);
    
    return response.data.message;
  } catch (error) {
    throw new Error("Failed to fetch dog images. Please try again.");
  }
};

export const fetchBreeds = async (): Promise<string[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/breeds/list/all`);
      
      return Object.keys(response.data.message);
    } catch (error) {
      throw new Error("Failed to fetch dog images. Please try again.");
    }
  };