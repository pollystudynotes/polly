import { sectionById } from '../data/site';
import type { Post } from '../data/posts';

// Deterministic pseudo-random number in [0, 1) derived from a string and a salt.
function seeded(id: string, salt: number) {
  let hash = 2166136261 ^ salt;
  for (let i = 0; i < id.length; i++) {
    hash = Math.imul(hash ^ id.charCodeAt(i), 16777619);
  }
  return ((hash >>> 0) % 1000) / 1000;
}

interface CoverProps {
  post: Post;
  className?: string;
}

// Generated gradient cover in the section's colour, used until posts have real images.
function Cover({ post, className = '' }: CoverProps) {
  const { color, label } = sectionById(post.section);
  const x1 = 15 + seeded(post.id, 1) * 40;
  const y1 = 20 + seeded(post.id, 2) * 60;
  const x2 = 55 + seeded(post.id, 3) * 35;
  const y2 = 30 + seeded(post.id, 4) * 50;

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-[#0d0d10] ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at ${x1}% ${y1}%, ${color}66 0%, transparent 55%), radial-gradient(circle at ${x2}% ${y2}%, ${color}33 0%, transparent 50%)`,
      }}
    >
      <span className="font-display italic absolute right-5 bottom-2 text-white/15 text-6xl md:text-7xl leading-none select-none">
        {label}
      </span>
    </div>
  );
}

export default Cover;
