import TrackItem from './TrackItem';

export default function TrackList({ tracks, onPlayTrack, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {tracks.map((track) => (
        <TrackItem key={track.id} track={track} onPlay={onPlayTrack} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}