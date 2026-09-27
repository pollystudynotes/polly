import { useCallback, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Globe, Instagram, Twitter } from 'lucide-react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';

const FADE_DURATION_MS = 500;
const FADE_OUT_LEAD_SECONDS = 0.55;
const RESTART_DELAY_MS = 100;

const NAV_LINKS = ['Features', 'Pricing', 'About'];

const SOCIAL_LINKS = [
  { label: 'Instagram', Icon: Instagram },
  { label: 'Twitter', Icon: Twitter },
  { label: 'Website', Icon: Globe },
];

function App() {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
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

      <nav className="relative z-20 pl-6 pr-6 py-6">
        <div className="rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2 text-white">
              <Globe size={24} />
              <span className="font-semibold text-lg">Asme</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="button" className="text-white text-sm font-medium">
              Sign Up
            </button>
            <button
              type="button"
              className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Built for the curious
        </h1>

        <div className="max-w-xl w-full space-y-4">
          <form
            onSubmit={handleSubmit}
            className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-white/40 text-base"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="bg-white rounded-full p-3 text-black"
            >
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-white text-sm leading-relaxed px-4">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and
            never miss out on exciting updates.
          </p>

          <div className="flex justify-center">
            <button
              type="button"
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Manifesto
            </button>
          </div>
        </div>
      </main>

      <footer className="relative z-10 flex justify-center gap-4 pb-12">
        {SOCIAL_LINKS.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            <Icon size={20} />
          </a>
        ))}
      </footer>
    </div>
  );
}

export default App;
