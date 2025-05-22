import { Link } from 'react-router-dom'; // Import Link

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <header className="bg-music-dark text-white p-10 rounded-lg shadow-xl my-8">
        <h1 className="text-5xl font-bold mb-4">Mathimus</h1>
        <p className="text-xl text-gray-300 mb-6">filler.</p>
        {/* Use Link component for SPA navigation */}
        <Link
          to="/music"
          className="bg-music-primary hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
        >
          Explore Music
        </Link>
      </header>
      <section className="my-8">
        <h2 className="text-3xl font-semibold mb-6 text-white">Featured Track</h2>
        {/* You can add a featured track component here later */}
        <div className="p-6 bg-neutral-800 rounded-lg shadow">
          <p className="text-gray-300">"Sunset Dreams" - A journey through vibrant soundscapes.</p>
        </div>
      </section>
    </div>
  );
}