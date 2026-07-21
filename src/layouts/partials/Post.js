import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import readingTime from "@lib/utils/readingTime";
import Link from "next/link";

const stripMarkdown = (content) => {
  if (!content) return "";
  return content
    // Normalize headings without space first so we can parse/strip them
    .replace(/^(#{1,6})([^\s#].*)$/gm, "$1 $2")
    // Remove HTML/JSX tags like <BookDemo /> or <Notice>...</Notice>
    .replace(/<[^>]*>/g, "")
    // Remove markdown headers: e.g. ## heading
    .replace(/^#+\s*(.*)$/gm, "$1")
    // Remove markdown links: [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove bold/italic/code-block/inline-code markup
    .replace(/[\*_~`]/g, "")
    // Normalize white spaces
    .replace(/\s+/g, " ")
    .trim();
};

const Post = ({ post, i }) => {
  const { summary_length, blog_folder } = config.settings;
  const cleanSummary = stripMarkdown(post.content);
  
  return (
    <div className="overflow-hidden rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,.05)] flex flex-col h-full bg-white border border-slate-100/50 hover:shadow-lg transition-shadow">
      {post.frontmatter.image && (
        <Link href={`/${blog_folder}/${post.slug}`} className="block overflow-hidden shrink-0">
          <ImageFallback
            className="w-full h-[220px] object-cover bg-slate-50/50 hover:scale-105 transition-transform duration-500"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={570}
            height={335}
          />
        </Link>
      )}
      <div className="p-7 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 leading-snug mb-3 min-h-[52px] line-clamp-2">
            <Link
              href={`/${blog_folder}/${post.slug}`}
              className="block hover:text-primary hover:underline transition-colors"
            >
              {post.frontmatter.title}
            </Link>
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium line-clamp-3">
            {cleanSummary}
          </p>
        </div>
        <div className="mt-5 text-[11px] text-slate-400 font-bold tracking-wide uppercase pt-4 border-t border-slate-100 flex justify-between items-center">
          <span>{dateFormat(post.frontmatter.date)}</span>
          <span>•</span>
          <span>{readingTime(post.content)}</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
