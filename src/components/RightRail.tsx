import { POSTS } from '../data/posts';
import type { Post } from '../data/posts';
import { SITE_NAME, sectionById } from '../data/site';
import { compactNumber, timeAgo } from '../lib/format';

interface RightRailProps {
  onOpen: (post: Post) => void;
}

function RightRail({ onOpen }: RightRailProps) {
  const popular = [...POSTS].sort((a, b) => b.views - a.views).slice(0, 5);
  const interviews = POSTS.filter((post) => post.format === 'interview').slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
        <h2 className="text-white font-semibold mb-4">Most read this week</h2>
        <ol className="space-y-4">
          {popular.map((post, index) => (
            <li key={post.id}>
              <button type="button" onClick={() => onOpen(post)} className="flex gap-3 text-left group">
                <span className="font-display text-3xl leading-none text-white/30 w-5 shrink-0 tabular-nums">
                  {index + 1}
                </span>
                <span className="space-y-1">
                  <span className="block text-sm text-white/85 group-hover:text-white leading-snug">{post.title}</span>
                  <span className="block text-xs text-white/40">{compactNumber(post.views)} views</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-5">
        <h2 className="text-white font-semibold mb-4">Interviews</h2>
        <ul className="space-y-4">
          {interviews.map((post) => (
            <li key={post.id}>
              <button type="button" onClick={() => onOpen(post)} className="text-left group space-y-1">
                <span className="flex items-center gap-2 text-xs text-white/45">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sectionById(post.section).color }} />
                  {sectionById(post.section).label} · {timeAgo(post.hoursAgo)}
                </span>
                <span className="block text-sm text-white/85 group-hover:text-white leading-snug">{post.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-1 space-y-2">
        <h2 className="text-white/40 text-[11px] uppercase tracking-[0.18em]">About</h2>
        <p className="text-sm text-white/60 leading-relaxed">
          {SITE_NAME} is an independent publication about AI, tech and fintech. We cover what moves the market and
          talk to the people building it.
        </p>
      </section>
    </div>
  );
}

export default RightRail;
