import { Globe, Instagram, Send, Twitter } from 'lucide-react';
import { SITE_NAME } from '../data/site';

const SOCIAL_LINKS = [
  { label: 'Telegram', Icon: Send },
  { label: 'Instagram', Icon: Instagram },
  { label: 'Twitter', Icon: Twitter },
  { label: 'Website', Icon: Globe },
];

const LINKS = ['About', 'Team', 'Advertise', 'Contact'];

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 flex flex-col md:flex-row md:items-center gap-6">
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-white font-semibold">
            <Globe size={20} />
            {SITE_NAME}
          </p>
          <p className="text-xs text-white/40">© 2026 {SITE_NAME}. Demo content: all stories, people and companies are fictional.</p>
        </div>

        <nav aria-label="Site links" className="flex flex-wrap gap-x-6 gap-y-2 md:mx-auto">
          {LINKS.map((link) => (
            <a key={link} href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          {SOCIAL_LINKS.map(({ label, Icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="liquid-glass rounded-full p-3 text-white/80 hover:text-white hover:bg-white/5 transition-all"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
