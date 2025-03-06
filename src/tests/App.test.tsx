import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";
import { DogProvider } from "../context/dogContext";


vi.mock("./hooks/useFetchDogs", () => ({
  useFetchDogs: () => ({
    images: [],
    getDogs: vi.fn(),
    loading: false,
    error: null,
  }),
}));

describe("App Component", () => {
  it("renders the heading", () => {
    render(
      <DogProvider>
        <App />
      </DogProvider>
    );
    
    expect(screen.getByRole("heading", { name: /dog breed search/i })).toBeInTheDocument();
  });

  it("renders BreedDropdown and DogSearch components", () => {
    render(
      <DogProvider>
        <App />
      </DogProvider>
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument(); 
    expect(screen.getByRole("textbox")).toBeInTheDocument();  
  });

  it("renders two DogList components", () => {
    render(
      <DogProvider>
        <App />
      </DogProvider>
    );

    expect(screen.getByText("Search Results")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });
});