import { useDogContext } from "../context/dogContext";
import { useFetchDogs } from "../hooks/useFetchDogs";

const BreedDropdown = () => {
  const { breeds } = useDogContext();
  const { getDogs } = useFetchDogs();
  

  return (
    <div className="gap-2 p-4 flex-[1] pl-0">
      <select
        className="border p-2 rounded w-full "
        onChange={(e) => e.target.value && getDogs(e.target.value)}
      >
        <option value="">Select a Breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed.charAt(0).toUpperCase() + breed.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BreedDropdown;
