import { useCallback, useEffect, useRef } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';

const FADE_DURATION_MS = 500;
const FADE_OUT_LEAD_SECONDS = 0.55;
const RESTART_DELAY_MS = 100;

interface BackgroundVideoProps {
  className?: string;
}

function BackgroundVideo({ className = '' }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const restartTimeoutRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  const cancelFade = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // Animates opacity from its current value to `target`, cancelling any fade in progress.
  const fadeTo = useCallback((target: number) => {
    const video = videoRef.current;
    if (!video) return;

    cancelFade();

    const parsed = parseFloat(video.style.opacity);
    const from = Number.isNaN(parsed) ? 0 : parsed;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / FADE_DURATION_MS, 1);
      video.style.opacity = String(from + (target - from) * progress);
      rafRef.current = progress < 1 ? requestAnimationFrame(step) : null;
    };

    rafRef.current = requestAnimationFrame(step);
  }, []);

  const handleLoadedData = () => {
    fadingOutRef.current = false;
    fadeTo(1);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || fadingOutRef.current || !Number.isFinite(video.duration)) return;

    if (video.duration - video.currentTime <= FADE_OUT_LEAD_SECONDS) {
      fadingOutRef.current = true;
      fadeTo(0);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    cancelFade();
    video.style.opacity = '0';

    restartTimeoutRef.current = window.setTimeout(() => {
      restartTimeoutRef.current = null;
      video.currentTime = 0;
      fadingOutRef.current = false;
      video.play().catch(() => {});
      fadeTo(1);
    }, RESTART_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      cancelFade();
      if (restartTimeoutRef.current !== null) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      style={{ opacity: 0 }}
      src={VIDEO_SRC}
      autoPlay
      muted
      playsInline
      preload="auto"
      onLoadedData={handleLoadedData}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
    />
  );
}

export default BackgroundVideo;
