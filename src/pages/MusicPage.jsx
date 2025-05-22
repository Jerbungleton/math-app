import TrackList from '../components/music/TrackList';
import musicData from '../config/music.json'; // Make sure this path is correct

export default function MusicPage({ onPlayTrack, onAddToCart }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-6 text-center text-white">My Music</h1>
      <TrackList tracks={musicData} onPlayTrack={onPlayTrack} onAddToCart={onAddToCart} />
    </div>
  );
}