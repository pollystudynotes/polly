import Cover from './Cover';
import { PostMeta, PostStats } from './PostParts';
import type { Post } from '../data/posts';

interface PostCardProps {
  post: Post;
  liked: boolean;
  saved: boolean;
  onOpen: () => void;
  onSectionClick: () => void;
  onLike: () => void;
  onSave: () => void;
}

function PostCard({ post, liked, saved, onOpen, onSectionClick, onLike, onSave }: PostCardProps) {
  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/15 transition-colors p-5 md:p-6 space-y-4"
    >
      <PostMeta post={post} onSectionClick={onSectionClick} />

      <div className="space-y-2">
        <h3 className="text-white text-xl md:text-[22px] font-semibold leading-snug text-balance">
          <a
            href={`#${post.id}`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onOpen();
            }}
            className="group-hover:text-white/85 focus-visible:underline outline-none"
          >
            {post.title}
          </a>
        </h3>
        <p className="text-white/65 text-[15px] leading-relaxed">{post.lead}</p>
      </div>

      <Cover post={post} className="aspect-[2/1] rounded-xl" />

      <PostStats post={post} liked={liked} saved={saved} onLike={onLike} onSave={onSave} />
    </article>
  );
}

export default PostCard;
