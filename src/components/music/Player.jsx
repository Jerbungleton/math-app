import { useState, useRef, useEffect, useCallback } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';

export default function Player({ tracks = [], currentTrackIndex, onTrackEnd, onSetCurrentTrackIndex }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const handleNext = useCallback(() => {
    if (tracks.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    onSetCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
    if (onTrackEnd) onTrackEnd(nextIndex);
  }, [currentTrackIndex, tracks.length, onSetCurrentTrackIndex, onTrackEnd]);

  const handlePrevious = () => {
    if (tracks.length === 0) return;
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    onSetCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };
  
  useEffect(() => {
    if (audioRef.current && tracks[currentTrackIndex]) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.error("Error playing audio:", e);
          setIsPlaying(false); // Reset if play fails
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, tracks]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100;
      setProgress(value || 0);
    };
    
    const handleAudioEnd = () => {
        handleNext();
    }

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleAudioEnd);

    // Load new track src when currentTrackIndex changes
    if (tracks[currentTrackIndex] && audio.src !== tracks[currentTrackIndex].audioSrc) {
        audio.src = tracks[currentTrackIndex].audioSrc;
        audio.load(); // Important to load the new source
        setProgress(0); // Reset progress
        if (isPlaying) { // If was playing, try to play new track
            audio.play().catch(e => console.error("Error playing new track:", e));
        }
    }


    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleAudioEnd);
    };
  }, [currentTrackIndex, tracks, isPlaying, handleNext]);


  const handlePlayPause = () => {
    if (!tracks[currentTrackIndex]) return; // No track to play/pause
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current && tracks[currentTrackIndex]) {
      const time = (value / 100) * audioRef.current.duration;
      if(isFinite(time)) {
        audioRef.current.currentTime = time;
      }
      setProgress(value);
    }
  };

  if (!tracks.length || currentTrackIndex === null || currentTrackIndex >= tracks.length) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-music-dark p-4 text-white text-center">
        No track selected or available.
      </div>
    );
  }

  const currentTrackData = tracks[currentTrackIndex];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-music-dark p-4 z-50">
      <audio
        ref={audioRef}
        src={currentTrackData.audioSrc} 
        preload="metadata"
        onLoadedMetadata={() => {
          // You might want to set duration here if needed elsewhere
        }}
      />
      <div className="flex items-center justify-between max-w-4xl mx-auto text-white">
        <div className="flex items-center w-1/4">
            <img src={currentTrackData.coverArt} alt={currentTrackData.title} className="w-10 h-10 object-cover rounded mr-3"/>
            <div>
                <div className="text-sm font-semibold truncate">{currentTrackData.title}</div>
                <div className="text-xs text-gray-400 truncate">{currentTrackData.artist}</div>
            </div>
        </div>
        
        <div className="flex flex-col items-center w-1/2">
            <div className="flex items-center gap-4">
                <button
                    onClick={handlePrevious}
                    className="p-2 hover:text-music-primary disabled:text-gray-600"
                    disabled={tracks.length < 2}
                    aria-label="Previous track"
                >
                    <FaStepBackward />
                </button>
                
                <button
                    onClick={handlePlayPause}
                    className="p-3 bg-music-primary rounded-full hover:bg-green-600"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <FaPause size="1.2em"/> : <FaPlay size="1.2em"/>}
                </button>
                
                <button
                    onClick={handleNext}
                    className="p-2 hover:text-music-primary disabled:text-gray-600"
                    disabled={tracks.length < 2}
                    aria-label="Next track"
                >
                    <FaStepForward />
                </button>
            </div>
            <div className="w-full mt-2">
                 <input
                    type="range"
                    value={progress}
                    onChange={handleProgressChange}
                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-music-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full"
                    min="0"
                    max="100"
                    step="0.1"
                    aria-label="Track progress"
                />
            </div>
        </div>

        <div className="w-1/4">
          {/* Volume control can be added here */}
        </div>
      </div>
    </div>
  );
}