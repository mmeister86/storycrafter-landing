"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Loader2 } from "lucide-react";

const AudioPlayer = () => {
  // State to track if audio is playing
  const [isPlaying, setIsPlaying] = useState(false);
  // State to track if we've encountered an error
  const [error, setError] = useState(false);
  // State to track if audio is loading
  const [isLoading, setIsLoading] = useState(true);

  // Reference to the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element when component mounts
  useEffect(() => {
    audioRef.current = new Audio("/loop.mp3");

    // Set audio to loop
    if (audioRef.current) {
      audioRef.current.loop = true;
      // Set volume to 50% of normal loudness (0.5 is full volume, so 0.25 is 50% of that)
      audioRef.current.volume = 0.5;

      // Add error handler
      audioRef.current.onerror = () => {
        console.error("Error loading audio file");
        setError(true);
        setIsLoading(false);
      };

      // Add loaded handler
      audioRef.current.oncanplaythrough = () => {
        setIsLoading(false);
      };
    }

    // Cleanup function to stop audio when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Toggle play/pause
  const toggleAudio = () => {
    if (!audioRef.current || error || isLoading) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Use a Promise to catch any play errors (important for mobile browsers)
      setIsLoading(true);
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            // Auto-play was prevented (common in mobile browsers)
            console.error("Playback was prevented:", err);
            setError(true);
            setIsLoading(false);
          });
      }
    }
  };

  // If there's an error, don't show the button
  if (error) return null;

  return (
    <button
      onClick={toggleAudio}
      className="group flex items-center justify-center rounded-md border border-[#e6a54c] bg-[#e6a54c]/80 px-3 h-8 text-sm font-medium shadow-sm transition-colors hover:bg-[#1a2436] hover:border-[#c48b3c] focus-visible:outline-none "
      aria-label={isPlaying ? "Pause music" : "Play music"}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 text-[#1a2436] group-hover:text-white animate-spin" />
      ) : isPlaying ? (
        <Pause className="h-4 w-4 text-white group-hover:text-[#e6a54c] fill-white group-hover:fill-[#e6a54c]" />
      ) : (
        <Play className="h-4 w-4 text-white group-hover:text-[#e6a54c] fill-white group-hover:fill-[#e6a54c]" />
      )}
      <span className="ml-2 hidden sm:inline">
        {isLoading ? "Loading..." : isPlaying ? "Pause" : "Play"} Music
      </span>
    </button>
  );
};

export default AudioPlayer;
