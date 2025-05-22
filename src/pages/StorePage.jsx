import musicData from '../config/music.json';

export default function StorePage({ onAddToCart }) {
  const handleBuyNow = (track) => {
    // This is where you'd integrate with a payment provider
    // For now, it can be a placeholder or add to a local cart state
    console.log("Buy now clicked for:", track.title);
    onAddToCart(track);
    alert(`${track.title} added to cart! (Feature in development)`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-6 text-center text-white">Music Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {musicData.map(track => (
          <div key={track.id} className="bg-neutral-800 p-4 rounded-lg shadow flex flex-col items-center text-center">
            <img src={track.coverArt} alt={track.title} className="w-48 h-48 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold text-white">{track.title}</h3>
            <p className="text-sm text-gray-400">{track.artist}</p>
            <p className="text-lg font-bold text-music-primary mt-2">${track.price.toFixed(2)}</p>
            <button
              onClick={() => handleBuyNow(track)}
              className="mt-4 bg-music-primary text-white hover:bg-green-600 py-2 px-4 rounded-lg font-semibold"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}