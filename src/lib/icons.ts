import { CalendarCheck, Mic, Newspaper, ScanSearch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FormatId } from '../data/site';

export const FORMAT_ICONS: Record<FormatId, LucideIcon> = {
  news: Newspaper,
  interview: Mic,
  recap: CalendarCheck,
  review: ScanSearch,
};
