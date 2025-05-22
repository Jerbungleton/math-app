import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';
import StorePage from './pages/StorePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import musicData from './config/music.json'; //
import sunsetDreams from './assets/audio/sunset-dreams.mp3'; //
import midnightDrive from './assets/audio/midnight-drive.mp3'; //

function App() {
  const [tracks, setTracks] = useState([]); //
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null); //
  const [cart, setCart] = useState([]); // Cart state remains, can be used later //
  const [isLoading, setIsLoading] = useState(true); //

  useEffect(() => {
    try {
      const audioFileMap = {
        "Sunset Dreams": sunsetDreams, 
        "Midnight Drive": midnightDrive 
      };

      const tracksWithAudio = musicData.map((track) => ({ //
        ...track,
        audioSrc: audioFileMap[track.title] || null 
      }));

      setTracks(tracksWithAudio.filter(track => track.audioSrc)); //
      setIsLoading(false); //
    } catch (error) { // Added curly braces here
      console.error('Error loading tracks:', error); //
      setIsLoading(false); //
    }
  }, []); //

  const handlePlayTrack = (trackToPlay) => { //
    const trackIndex = tracks.findIndex(t => t.id === trackToPlay.id); //
    if (trackIndex !== -1) { //
      setCurrentTrackIndex(trackIndex); //
    }
  };

  const handleAddToCart = (track) => { //
    setCart(prevCart => { //
      const isItemInCart = prevCart.find(item => item.id === track.id); //
      if (isItemInCart) { //
        alert(`${track.title} is already in your cart.`); //
        return prevCart; //
      }
      return [...prevCart, { ...track, quantity: 1 }]; //
    });
    alert(`${track.title} added to cart!`); //
  };

  const handleTrackEnd = (nextIndex) => { //
    setCurrentTrackIndex(nextIndex); //
  };

  if (isLoading) { //
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const layoutWithProps = ( //
    <Layout
      tracks={tracks}
      currentTrackIndex={currentTrackIndex}
      onTrackEnd={handleTrackEnd}
      onSetCurrentTrackIndex={setCurrentTrackIndex}
    />
  );

  return (
    <Routes>
      <Route path="/" element={layoutWithProps}> {/* */}
        <Route index element={<HomePage />} /> {/* */}
        <Route
          path="music"
          element={<MusicPage tracks={tracks} onPlayTrack={handlePlayTrack} onAddToCart={handleAddToCart} />}
        /> {/* */}
        <Route
          path="store"
          element={<StorePage tracks={tracks} onAddToCart={handleAddToCart} />}
        /> {/* */}
        <Route path="about" element={<AboutPage />} /> {/* */}
        <Route path="contact" element={<ContactPage />} /> {/* */}
      </Route>
    </Routes>
  );
}

export default App;