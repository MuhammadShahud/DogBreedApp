import { useState, useCallback } from "react";
import { fetchDogImages } from "../services/dogService";
import { useDogContext } from "../context/dogContext";

export const useFetchDogs = () => {
  const { setImages, emptyFavorites } = useDogContext(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDogs = useCallback(async (breed: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDogImages(breed);
      setImages(data);
      emptyFavorites(); 
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [setImages]);

  return { loading, error, getDogs }; 
};

