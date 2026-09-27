import { Bookmark, Eye, Heart, MessageCircle } from 'lucide-react';
import { formatById, sectionById } from '../data/site';
import type { Post } from '../data/posts';
import { compactNumber, timeAgo } from '../lib/format';
import { FORMAT_ICONS } from '../lib/icons';

interface PostMetaProps {
  post: Post;
  onSectionClick?: () => void;
}

export function PostMeta({ post, onSectionClick }: PostMetaProps) {
  const section = sectionById(post.section);
  const format = formatById(post.format);
  const FormatIcon = FORMAT_ICONS[post.format];

  return (
    <div className="flex items-center gap-x-3 gap-y-1 flex-wrap text-[13px]">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onSectionClick?.();
        }}
        className="flex items-center gap-2 font-medium text-white hover:opacity-80"
      >
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: section.color }} />
        {section.label}
      </button>
      <span className="hidden sm:inline text-white/55">{post.author.name}</span>
      <span className="text-white/40">{timeAgo(post.hoursAgo)}</span>
      <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-0.5 text-white/70">
        <FormatIcon size={12} />
        {format.single}
      </span>
    </div>
  );
}

interface PostStatsProps {
  post: Post;
  liked: boolean;
  saved: boolean;
  onLike: () => void;
  onSave: () => void;
}

export function PostStats({ post, liked, saved, onLike, onSave }: PostStatsProps) {
  const stop = (handler: () => void) => (event: React.MouseEvent) => {
    event.stopPropagation();
    handler();
  };

  return (
    <div className="flex items-center gap-5 text-sm text-white/55 tabular-nums">
      <button
        type="button"
        onClick={stop(onLike)}
        aria-pressed={liked}
        aria-label="Like"
        className={`flex items-center gap-1.5 transition-colors ${liked ? 'text-rose-400' : 'hover:text-white'}`}
      >
        <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
        {compactNumber(post.likes + (liked ? 1 : 0))}
      </button>
      <span className="flex items-center gap-1.5" title="Comments">
        <MessageCircle size={17} />
        {post.comments}
      </span>
      <span className="flex items-center gap-1.5" title="Views">
        <Eye size={17} />
        {compactNumber(post.views)}
      </span>
      <button
        type="button"
        onClick={stop(onSave)}
        aria-pressed={saved}
        aria-label={saved ? 'Remove bookmark' : 'Bookmark'}
        className={`ml-auto transition-colors ${saved ? 'text-white' : 'hover:text-white'}`}
      >
        <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}
