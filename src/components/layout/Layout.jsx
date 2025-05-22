import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Player from '../music/Player'; // Corrected path

export default function Layout({ tracks, currentTrackIndex, onTrackEnd, onSetCurrentTrackIndex, onPlayTrack }) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-900">
      <Navbar />
      <main className="flex-grow pb-20"> {/* Add padding-bottom to avoid overlap with player */}
        <Outlet />
      </main>
      <Player 
        tracks={tracks} 
        currentTrackIndex={currentTrackIndex}
        onTrackEnd={onTrackEnd}
        onSetCurrentTrackIndex={onSetCurrentTrackIndex}
      />
    </div>
  );
}   