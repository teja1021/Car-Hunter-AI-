// components/BackgroundMusic.jsx
"use client";

import { useRef, useEffect } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleToggle = (e) => {
      if (audioRef.current) {
        const isEnabled =
          e.detail?.enabled !== undefined
            ? e.detail.enabled
            : !audioRef.current.paused;

        if (isEnabled) {
          audioRef.current
            .play()
            .catch((error) => {
              console.log("Audio play failed:", error);
            });
        } else {
          audioRef.current.pause();
        }
      }
    };

    const handleStart = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .catch((error) => {
            console.log("Audio play failed:", error);
          });
      }
    };

    window.addEventListener("toggle-music", handleToggle);
    window.addEventListener("start-music", handleStart);

    return () => {
      window.removeEventListener("toggle-music", handleToggle);
      window.removeEventListener("start-music", handleStart);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: "none" }}
      volume={0.3}
    >
      <source src="/sounds/background-music.mp3" type="audio/mpeg" />
      <source src="/sounds/background-music.wav" type="audio/wav" />
      <source src="/sounds/background-music.ogg" type="audio/ogg" />
      Your browser does not support the audio element.
    </audio>
  );
}
