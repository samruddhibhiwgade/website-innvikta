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
    <div className="overflow-hidden rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,.05)]">
      {post.frontmatter.image && (
        <Link href={`/${blog_folder}/${post.slug}`}>
          <ImageFallback
            className="w-full h-[220px] object-cover bg-slate-50/50"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={570}
            height={335}
          />
        </Link>
      )}
      <div className="p-8">
        <h2 className="h4">
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="block hover:text-primary hover:underline"
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        <p className="mt-4">
          {cleanSummary.slice(0, Number(summary_length))}...
        </p>
        <div className="mt-6 text-sm text-slate-500 font-medium">
          <p>
            {dateFormat(post.frontmatter.date)} - {readingTime(post.content)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
