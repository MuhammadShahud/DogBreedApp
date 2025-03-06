import { createContext, useContext, useEffect, useState } from "react";
import { fetchBreeds } from "../services/dogService";

interface DogContextType {
  images: string[];
  favorites: string[];
  breeds : string[];
  setBreeds: (breeds: string[]) => void;
  setImages: (images: string[]) => void;
  toggleFavorite: (url: string) => void;
  addToFavorites: (url: string) => void;
  removeFromFavorites: (url: string) => void;
  emptyFavorites: () => void;
}

const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider = ({ children }: { children: React.ReactNode }) => {
  const [images, setImages] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const data = await fetchBreeds();
        setBreeds(data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    getBreeds();
  }, []);

  const addToFavorites = (url: string) => {
    setFavorites((prev) => [...prev, url]);
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const removeFromFavorites = (url: string) => {
    setFavorites((prev) => prev.filter((img) => img !== url));
    setImages((prev) => [...prev, url]); 
  };

  const emptyFavorites = () => {
    setFavorites([]);
  };

  const toggleFavorite = (url: string) => {
    if (favorites.includes(url)) {
      removeFromFavorites(url);
    } else {
      addToFavorites(url);
    }
  };

  return (
    <DogContext.Provider value={{ images, favorites, setImages, toggleFavorite, addToFavorites, removeFromFavorites, emptyFavorites, setBreeds,breeds }}>
      {children}
    </DogContext.Provider>
  );
};

export const useDogContext = () => {
  const context = useContext(DogContext);
  if (!context) throw new Error("useDogContext must be used within a DogProvider");
  return context;
};