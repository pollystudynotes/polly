import { LayoutGrid } from 'lucide-react';
import { ACTIVE_SECTIONS, FORMATS } from '../data/site';
import type { FormatId, SectionId } from '../data/site';
import { FORMAT_ICONS } from '../lib/icons';

export type SectionFilter = SectionId | 'all';
export type FormatFilter = FormatId | 'all';

interface FiltersProps {
  section: SectionFilter;
  format: FormatFilter;
  onSectionChange: (section: SectionFilter) => void;
  onFormatChange: (format: FormatFilter) => void;
}

const itemClass = (active: boolean) =>
  `w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
    active ? 'bg-white/10 text-white' : 'text-white/65 hover:text-white hover:bg-white/5'
  }`;

export function Sidebar({ section, format, onSectionChange, onFormatChange }: FiltersProps) {
  return (
    <nav aria-label="Разделы и форматы" className="space-y-8">
      <div>
        <h2 className="px-3 mb-2 text-[11px] uppercase tracking-[0.18em] text-white/40">Разделы</h2>
        <ul className="space-y-1">
          <li>
            <button type="button" onClick={() => onSectionChange('all')} className={itemClass(section === 'all')}>
              <LayoutGrid size={16} />
              Все разделы
            </button>
          </li>
          {ACTIVE_SECTIONS.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => onSectionChange(item.id)} className={itemClass(section === item.id)}>
                <span className="w-4 flex justify-center">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="px-3 mb-2 text-[11px] uppercase tracking-[0.18em] text-white/40">Форматы</h2>
        <ul className="space-y-1">
          <li>
            <button type="button" onClick={() => onFormatChange('all')} className={itemClass(format === 'all')}>
              <LayoutGrid size={16} />
              Все форматы
            </button>
          </li>
          {FORMATS.map((item) => {
            const Icon = FORMAT_ICONS[item.id];
            return (
              <li key={item.id}>
                <button type="button" onClick={() => onFormatChange(item.id)} className={itemClass(format === item.id)}>
                  <Icon size={16} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

const chipClass = (active: boolean) =>
  `shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
    active ? 'bg-white text-black' : 'liquid-glass text-white/80 hover:text-white'
  }`;

// Horizontal chip rows that replace the sidebar on narrow screens.
export function MobileFilters({ section, format, onSectionChange, onFormatChange }: FiltersProps) {
  return (
    <div className="lg:hidden space-y-2 -mx-4 md:-mx-6">
      <div className="flex gap-2 overflow-x-auto px-4 md:px-6 py-1 scrollbar-none">
        <button type="button" onClick={() => onSectionChange('all')} className={chipClass(section === 'all')}>
          Все разделы
        </button>
        {ACTIVE_SECTIONS.map((item) => (
          <button key={item.id} type="button" onClick={() => onSectionChange(item.id)} className={chipClass(section === item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 overflow-x-auto px-4 md:px-6 py-1 scrollbar-none">
        <button type="button" onClick={() => onFormatChange('all')} className={chipClass(format === 'all')}>
          Все форматы
        </button>
        {FORMATS.map((item) => (
          <button key={item.id} type="button" onClick={() => onFormatChange(item.id)} className={chipClass(format === item.id)}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
