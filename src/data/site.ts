export type SectionId = 'ai' | 'tech' | 'fintech' | 'crypto';
export type FormatId = 'news' | 'interview' | 'recap' | 'review';

export interface Section {
  id: SectionId;
  label: string;
  description: string;
  color: string;
  enabled: boolean;
}

export interface Format {
  id: FormatId;
  label: string;
  single: string;
}

export const SITE_NAME = 'Asme';

export const SECTIONS: Section[] = [
  { id: 'ai', label: 'ИИ', description: 'Модели, агенты, исследования', color: '#8fb8ff', enabled: true },
  { id: 'tech', label: 'Технологии', description: 'Гаджеты, софт, инфраструктура', color: '#f2b26b', enabled: true },
  { id: 'fintech', label: 'Финтех', description: 'Банки, платежи, регулирование', color: '#6fd6b0', enabled: true },
  // Раздел готов, но пока скрыт. Чтобы включить, поставьте enabled: true.
  { id: 'crypto', label: 'Крипта', description: 'Блокчейн и цифровые активы', color: '#e58fd0', enabled: false },
];

export const ACTIVE_SECTIONS = SECTIONS.filter((section) => section.enabled);

export const FORMATS: Format[] = [
  { id: 'news', label: 'Новости', single: 'Новость' },
  { id: 'interview', label: 'Интервью', single: 'Интервью' },
  { id: 'recap', label: 'Рекапы', single: 'Рекап' },
  { id: 'review', label: 'Обзоры', single: 'Обзор' },
];

export const sectionById = (id: SectionId) => SECTIONS.find((section) => section.id === id)!;
export const formatById = (id: FormatId) => FORMATS.find((format) => format.id === id)!;
