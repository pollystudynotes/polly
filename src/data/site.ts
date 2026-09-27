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
  { id: 'ai', label: 'AI', description: 'Models, agents and research', color: '#8fb8ff', enabled: true },
  { id: 'tech', label: 'Tech', description: 'Devices, software and infrastructure', color: '#f2b26b', enabled: true },
  { id: 'fintech', label: 'Fintech', description: 'Banks, payments and regulation', color: '#6fd6b0', enabled: true },
  // Ready but hidden for now. Set enabled: true to turn it on.
  { id: 'crypto', label: 'Crypto', description: 'Blockchain and digital assets', color: '#e58fd0', enabled: false },
];

export const ACTIVE_SECTIONS = SECTIONS.filter((section) => section.enabled);

export const FORMATS: Format[] = [
  { id: 'news', label: 'News', single: 'News' },
  { id: 'interview', label: 'Interviews', single: 'Interview' },
  { id: 'recap', label: 'Recaps', single: 'Recap' },
  { id: 'review', label: 'Reviews', single: 'Review' },
];

export const sectionById = (id: SectionId) => SECTIONS.find((section) => section.id === id)!;
export const formatById = (id: FormatId) => FORMATS.find((format) => format.id === id)!;
