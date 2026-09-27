import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import ArticleView from './components/ArticleView';
import Footer from './components/Footer';
import Header from './components/Header';
import Masthead from './components/Masthead';
import PostCard from './components/PostCard';
import RightRail from './components/RightRail';
import { MobileFilters, Sidebar } from './components/Sidebar';
import type { FormatFilter, SectionFilter } from './components/Sidebar';
import { POSTS } from './data/posts';
import type { Post } from './data/posts';
import { ACTIVE_SECTIONS, formatById, sectionById } from './data/site';

type Tab = 'fresh' | 'popular' | 'saved';

const TABS: { id: Tab; label: string }[] = [
  { id: 'fresh', label: 'Свежее' },
  { id: 'popular', label: 'Популярное' },
  { id: 'saved', label: 'Закладки' },
];

const enabledSectionIds = new Set(ACTIVE_SECTIONS.map((section) => section.id));
const VISIBLE_POSTS = POSTS.filter((post) => enabledSectionIds.has(post.section));

function toggle(set: Set<string>, id: string) {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

function App() {
  const [section, setSection] = useState<SectionFilter>('all');
  const [format, setFormat] = useState<FormatFilter>('all');
  const [tab, setTab] = useState<Tab>('fresh');
  const [query, setQuery] = useState('');
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const feedRef = useRef<HTMLDivElement>(null);
  const feedScrollRef = useRef(0);
  const pendingScrollRef = useRef<number | null>(null);

  const openPost = openPostId ? VISIBLE_POSTS.find((post) => post.id === openPostId) ?? null : null;

  const posts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = VISIBLE_POSTS.filter(
      (post) =>
        (section === 'all' || post.section === section) &&
        (format === 'all' || post.format === format) &&
        (tab !== 'saved' || saved.has(post.id)) &&
        (!needle || `${post.title} ${post.lead}`.toLowerCase().includes(needle)),
    );
    return tab === 'popular'
      ? filtered.sort((a, b) => b.views + b.likes * 20 - (a.views + a.likes * 20))
      : filtered.sort((a, b) => a.hoursAgo - b.hoursAgo);
  }, [section, format, tab, query, saved]);

  useLayoutEffect(() => {
    if (pendingScrollRef.current !== null) {
      window.scrollTo(0, pendingScrollRef.current);
      pendingScrollRef.current = null;
    }
  }, [openPostId]);

  // Keeps the feed's top in view when a filter changes while scrolled deep into it.
  const scrollToFeed = () => {
    const feed = feedRef.current;
    if (!feed) return;
    const top = feed.getBoundingClientRect().top + window.scrollY - 80;
    if (window.scrollY > top) window.scrollTo({ top });
  };

  const showFeed = (next?: { section?: SectionFilter }) => {
    if (next?.section) setSection(next.section);
    pendingScrollRef.current = next?.section ? null : feedScrollRef.current;
    setOpenPostId(null);
    if (next?.section) requestAnimationFrame(scrollToFeed);
  };

  const handleOpen = (post: Post) => {
    if (!openPostId) feedScrollRef.current = window.scrollY;
    pendingScrollRef.current = 0;
    setOpenPostId(post.id);
  };

  const handleSection = (next: SectionFilter) => {
    setSection(next);
    scrollToFeed();
  };

  const handleFormat = (next: FormatFilter) => {
    setFormat(next);
    scrollToFeed();
  };

  const handleHome = () => {
    setSection('all');
    setFormat('all');
    setTab('fresh');
    setQuery('');
    pendingScrollRef.current = 0;
    setOpenPostId(null);
    window.scrollTo(0, 0);
  };

  const handleQuery = (next: string) => {
    setQuery(next);
    if (openPostId) showFeed();
  };

  const heading = section === 'all' ? 'Лента' : sectionById(section).label;
  const subheading = [
    section === 'all' ? 'ИИ, технологии и финтех' : sectionById(section).description,
    format !== 'all' ? formatById(format).label.toLowerCase() : null,
  ]
    .filter(Boolean)
    .join(' · ');

  const filtersProps = {
    section,
    format,
    onSectionChange: handleSection,
    onFormatChange: handleFormat,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header query={query} onQueryChange={handleQuery} onHome={handleHome} />

      {openPost ? (
        <ArticleView
          post={openPost}
          liked={liked.has(openPost.id)}
          saved={saved.has(openPost.id)}
          onBack={() => showFeed()}
          onOpen={handleOpen}
          onSectionClick={() => showFeed({ section: openPost.section })}
          onLike={() => setLiked((set) => toggle(set, openPost.id))}
          onSave={() => setSaved((set) => toggle(set, openPost.id))}
        />
      ) : (
        <>
          <Masthead />

          <div
            ref={feedRef}
            className="relative max-w-7xl mx-auto px-4 md:px-6 pb-16 grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)_300px]"
          >
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Sidebar {...filtersProps} />
              </div>
            </aside>

            <main className="min-w-0 space-y-5">
              <div className="space-y-4">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <h2 className="font-display text-4xl md:text-5xl text-white leading-none">{heading}</h2>
                    <p className="text-sm text-white/50 mt-2">{subheading}</p>
                  </div>
                  <div role="tablist" aria-label="Сортировка ленты" className="liquid-glass rounded-full p-1 flex">
                    {TABS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={tab === item.id}
                        onClick={() => setTab(item.id)}
                        className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                          tab === item.id ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {item.label}
                        {item.id === 'saved' && saved.size > 0 && <span className="ml-1.5 tabular-nums">{saved.size}</span>}
                      </button>
                    ))}
                  </div>
                </div>
                <MobileFilters {...filtersProps} />
              </div>

              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    liked={liked.has(post.id)}
                    saved={saved.has(post.id)}
                    onOpen={() => handleOpen(post)}
                    onSectionClick={() => handleSection(post.section)}
                    onLike={() => setLiked((set) => toggle(set, post.id))}
                    onSave={() => setSaved((set) => toggle(set, post.id))}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center space-y-4">
                  <p className="text-white/70">
                    {tab === 'saved' && saved.size === 0
                      ? 'Здесь появятся материалы, которые вы добавите в закладки.'
                      : 'По этим фильтрам ничего не нашлось.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSection('all');
                      setFormat('all');
                      setQuery('');
                      setTab('fresh');
                    }}
                    className="liquid-glass rounded-full px-6 py-2 text-sm text-white hover:bg-white/5 transition-colors"
                  >
                    Показать все материалы
                  </button>
                </div>
              )}
            </main>

            <aside className="hidden lg:block">
              <RightRail onOpen={handleOpen} />
            </aside>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
