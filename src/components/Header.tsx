import { useEffect, useState } from 'react';
import { Globe, Search, X } from 'lucide-react';
import { SITE_NAME } from '../data/site';

interface HeaderProps {
  query: string;
  onQueryChange: (query: string) => void;
  onHome: () => void;
}

function Header({ query, onQueryChange, onHome }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const searchInput = (id: string) => (
    <label htmlFor={id} className="liquid-glass rounded-full flex items-center gap-2 pl-4 pr-2 py-2 w-full">
      <Search size={16} className="text-white/50 shrink-0" />
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Поиск по материалам"
        className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
      />
      {query && (
        <button
          type="button"
          onClick={() => onQueryChange('')}
          aria-label="Очистить поиск"
          className="text-white/50 hover:text-white p-1"
        >
          <X size={14} />
        </button>
      )}
    </label>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled ? 'bg-black/70 backdrop-blur-xl border-b border-white/10' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
        <button type="button" onClick={onHome} className="flex items-center gap-2 text-white shrink-0">
          <Globe size={24} />
          <span className="font-semibold text-lg">{SITE_NAME}</span>
        </button>

        <div className="hidden md:block flex-1 max-w-md mx-auto">{searchInput('search-desktop')}</div>

        <div className="flex items-center gap-2 md:gap-4 ml-auto md:ml-0">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((open) => !open)}
            aria-label="Поиск"
            aria-expanded={mobileSearchOpen}
            className="md:hidden text-white/80 hover:text-white p-2"
          >
            <Search size={20} />
          </button>
          <button type="button" className="hidden sm:block text-white text-sm font-medium">
            Регистрация
          </button>
          <button type="button" className="liquid-glass rounded-full px-5 py-2 text-white text-sm font-medium">
            Войти
          </button>
        </div>
      </div>

      {mobileSearchOpen && <div className="md:hidden px-4 pb-3">{searchInput('search-mobile')}</div>}
    </header>
  );
}

export default Header;
