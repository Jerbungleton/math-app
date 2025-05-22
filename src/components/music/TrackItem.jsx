import { FaPlay, FaShoppingCart } from 'react-icons/fa';

export default function TrackItem({ track, onPlay, onAddToCart }) {
  return (
    <div className="bg-neutral-800 p-4 rounded-lg shadow flex flex-col items-center text-center">
      <img src={track.coverArt} alt={track.title} className="w-48 h-48 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-semibold text-white">{track.title}</h3>
      <p className="text-sm text-gray-400">{track.artist}</p>
      <p className="text-sm text-gray-400">{track.releaseDate}</p>
      <div className="mt-4 flex space-x-3">
        <button
          onClick={() => onPlay(track)}
          className="bg-music-primary text-white hover:bg-green-600 p-2 rounded-full flex items-center justify-center"
          aria-label={`Play ${track.title}`}
        >
          <FaPlay />
        </button>
        <button
          onClick={() => onAddToCart(track)}
          className="bg-gray-600 text-white hover:bg-gray-500 p-2 rounded-full flex items-center justify-center"
          aria-label={`Add ${track.title} to cart`}
        >
          <FaShoppingCart className="mr-1" /> ${track.price.toFixed(2)}
        </button>
      </div>
    </div>
  );
}