import { ArrowLeft } from 'lucide-react';
import Cover from './Cover';
import { PostMeta, PostStats } from './PostParts';
import { POSTS } from '../data/posts';
import type { Block, Post } from '../data/posts';
import { plural } from '../lib/format';

interface ArticleViewProps {
  post: Post;
  liked: boolean;
  saved: boolean;
  onBack: () => void;
  onOpen: (post: Post) => void;
  onSectionClick: () => void;
  onLike: () => void;
  onSave: () => void;
}

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case 'p':
      return <p key={index}>{block.text}</p>;
    case 'h':
      return (
        <h2 key={index} className="text-white text-2xl font-semibold pt-4 text-balance">
          {block.text}
        </h2>
      );
    case 'quote':
      return (
        <figure key={index} className="py-4">
          <blockquote className="font-display italic text-3xl md:text-4xl text-white leading-tight text-balance">
            «{block.text}»
          </blockquote>
          <figcaption className="mt-3 text-sm text-white/50">{block.by}</figcaption>
        </figure>
      );
    case 'qa':
      return (
        <div key={index} className="space-y-2">
          <p className="text-white font-semibold">{block.q}</p>
          <p>{block.a}</p>
        </div>
      );
  }
}

function ArticleView({ post, liked, saved, onBack, onOpen, onSectionClick, onLike, onSave }: ArticleViewProps) {
  const related = POSTS.filter((item) => item.id !== post.id)
    .sort((a, b) => Number(b.section === post.section) - Number(a.section === post.section))
    .slice(0, 3);

  return (
    <article className="max-w-3xl mx-auto px-4 md:px-6 pt-24 pb-16">
      <button
        type="button"
        onClick={onBack}
        className="liquid-glass rounded-full px-4 py-2 text-sm text-white/80 hover:text-white inline-flex items-center gap-2 mb-8"
      >
        <ArrowLeft size={16} />К ленте
      </button>

      <PostMeta post={post} onSectionClick={onSectionClick} />

      <h1 className="font-display text-4xl md:text-6xl text-white leading-[1.02] tracking-tight mt-5 mb-5 text-balance">
        {post.title}
      </h1>
      <p className="text-lg md:text-xl text-white/70 leading-relaxed">{post.lead}</p>

      <div className="flex items-center gap-3 mt-6 text-sm">
        <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-medium">
          {post.author.name[0]}
        </span>
        <span>
          <span className="block text-white">{post.author.name}</span>
          <span className="block text-white/45">
            {post.author.role} · {post.readMinutes} {plural(post.readMinutes, ['минута', 'минуты', 'минут'])} чтения
          </span>
        </span>
      </div>

      <Cover post={post} className="aspect-[2/1] rounded-2xl my-10" />

      <div className="space-y-5 text-[17px] md:text-lg leading-[1.7] text-white/80">{post.body.map(renderBlock)}</div>

      <div className="border-t border-white/10 mt-12 pt-5">
        <PostStats post={post} liked={liked} saved={saved} onLike={onLike} onSave={onSave} />
      </div>

      <section className="mt-16">
        <h2 className="text-white/40 text-[11px] uppercase tracking-[0.18em] mb-4">Читайте также</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {related.map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => onOpen(item)} className="text-left group w-full space-y-3">
                <Cover post={item} className="aspect-[3/2] rounded-xl" />
                <span className="block text-sm text-white/85 group-hover:text-white leading-snug">{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default ArticleView;
