import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import BackgroundVideo from './BackgroundVideo';
import { ACTIVE_SECTIONS } from '../data/site';

function Masthead() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <section className="relative h-[600px] md:h-[660px] overflow-hidden bg-black">
      <BackgroundVideo className="translate-y-[17%]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-16 text-center -translate-y-[12%]">
        <p className="text-white/70 text-xs uppercase tracking-[0.25em] mb-5">
          {ACTIVE_SECTIONS.map((section) => section.label).join(' · ')}
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 tracking-tight leading-[0.95] text-balance">
          Built for the curious
        </h1>

        <div className="max-w-xl w-full space-y-4">
          {subscribed ? (
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 text-left">
              <p className="flex-1 text-white text-base py-2">You're in. The first issue arrives on Friday.</p>
              <span className="bg-white rounded-full p-3 text-black">
                <Check size={20} />
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-white/40 text-base"
              />
              <button type="submit" aria-label="Subscribe to the newsletter" className="bg-white rounded-full p-3 text-black">
                <ArrowRight size={20} />
              </button>
            </form>
          )}
          <p className="text-white/85 text-sm leading-relaxed px-4">
            News, interviews, event recaps and reviews. The week in AI, tech and fintech, in your inbox every Friday.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Masthead;
