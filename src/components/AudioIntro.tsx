"use client";

import { useEffect, useRef, useState } from "react";

type AudioIntroProps = {
  src: string;
  /** Total fade-in + sustain + fade-out duration in ms. Default 4000 */
  duration?: number;
  /** Peak volume 0–1. Default 0.35 */
  maxVolume?: number;
};

/**
 * Plays a short ambient audio clip on mount with a soft fade-in / fade-out.
 * Respects browsers that require user interaction before playback —
 * falls back to a one-time click handler on the document.
 */
export function AudioIntro({
  src,
  duration = 4000,
  maxVolume = 0.35,
}: AudioIntroProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (played) return;

    const audio = audioRef.current;
    if (!audio) return;

    const fadeMs = 600;
    const steps = 20;
    let volUp: ReturnType<typeof setInterval>;
    let volDown: ReturnType<typeof setInterval>;
    let endTimer: ReturnType<typeof setTimeout>;

    const play = () => {
      if (played) return;
      setPlayed(true);
      audio.volume = 0;

      audio.play().then(() => {
        // Fade in
        let v = 0;
        volUp = setInterval(() => {
          v = Math.min(v + maxVolume / steps, maxVolume);
          audio.volume = v;
          if (v >= maxVolume) clearInterval(volUp);
        }, fadeMs / steps);

        // Fade out after (duration - fadeMs)
        endTimer = setTimeout(() => {
          let v2 = maxVolume;
          volDown = setInterval(() => {
            v2 = Math.max(v2 - maxVolume / steps, 0);
            audio.volume = v2;
            if (v2 <= 0) {
              clearInterval(volDown);
              audio.pause();
            }
          }, fadeMs / steps);
        }, duration - fadeMs);
      }).catch(() => {
        // Autoplay blocked — wait for first user interaction
        const unlock = () => {
          play();
          document.removeEventListener("click", unlock);
          document.removeEventListener("keydown", unlock);
          document.removeEventListener("touchstart", unlock);
        };
        document.addEventListener("click", unlock, { once: true });
        document.addEventListener("keydown", unlock, { once: true });
        document.addEventListener("touchstart", unlock, { once: true });
      });
    };

    play();

    return () => {
      clearInterval(volUp);
      clearInterval(volDown);
      clearTimeout(endTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <audio
      ref={audioRef}
      src={src}
      preload="auto"
      style={{ display: "none" }}
    />
  );
}
