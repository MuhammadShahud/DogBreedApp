import { useState } from "react";

interface DogSearchProps {
  onSearch: (breed: string) => void;
}

const DogSearch = ({ onSearch }: DogSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) onSearch(query.trim().toLowerCase());
  };

  return (
    <div className="flex gap-2 p-4 flex-[3] pr-0">
      <input
        type="text"
        placeholder="Search for a breed..."
        className="border p-2 rounded w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default DogSearch;