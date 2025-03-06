import { useDogContext } from "../context/dogContext";

interface DogListProps {
  images: string[];
  title: string;
  isFavoriteList?: boolean;
}

const DogList = ({ images, title, isFavoriteList = false }: DogListProps) => {
  const { addToFavorites, removeFromFavorites, favorites, toggleFavorite } =
    useDogContext();

  const handleDragStart = (
    event: React.DragEvent<HTMLImageElement>,
    url: string
  ) => {
    event.dataTransfer.setData("text/plain", url);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const url = event.dataTransfer.getData("text/plain");

    if (isFavoriteList) {

      !images.includes(url) && addToFavorites(url);
    } else {

      !images.includes(url) && removeFromFavorites(url);
    }
  };

  return (
    <div
      className="p-4 border rounded-lg bg-gray-100 min-h-[200px]"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.map((img) => (
          <div key={img} className="relative">
            <img
              src={img}
              alt="dog"
              className="rounded-lg w-full h-40 object-cover cursor-grab"
              draggable
              onDragStart={(e) => handleDragStart(e, img)}
            />
            <button
              className={`absolute bottom-2 right-2 p-1 rounded-full text-white ${
                favorites.includes(img) ? "bg-red-500" : "bg-gray-500"
              }`}
              onClick={() => toggleFavorite(img)}
            >
              {favorites.includes(img) ? "❤️" : "🤍"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogList;
