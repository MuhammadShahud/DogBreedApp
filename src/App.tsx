import { useFetchDogs } from "./hooks/useFetchDogs";
import { DogProvider, useDogContext } from "./context/dogContext";
import DogSearch from "./components/DogSearch";
import DogList from "./components/DogList";
import BreedDropdown from "./components/BreedDropdown";

const AppContent = () => {
  const { images, favorites } = useDogContext();
  const { getDogs, loading, error } = useFetchDogs();
  console.log("images222", images);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Dog Breeds</h1>
      <div className="flex pb-[5px] mr-[5px] items-center">
        <BreedDropdown />
        <DogSearch onSearch={getDogs} />
      </div>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-col gap-6">
        <DogList
          images={images}
          title="Search Results"
          isFavoriteList={false}
        />
        <DogList images={favorites} title="Favorites" isFavoriteList={true} />
      </div>
    </div>
  );
};

const App = () => (
  <DogProvider>
    <AppContent />
  </DogProvider>
);

export default App;
