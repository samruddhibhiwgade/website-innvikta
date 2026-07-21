import config from "@config/config.json";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";
const { blog_folder } = config.settings;

// post single layout
const Article = async ({ params }) => {
  const { single } = params;
  const posts = await getSinglePage(`content/${blog_folder}`);
  const post = posts.filter((p) => p.slug == single);
  
  if (!post || post.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold text-slate-800">Post Not Found</h1>
        <p className="text-slate-500 mt-4">The post &quot;{single}&quot; could not be found or you need to run build again.</p>
        <pre className="mt-8 text-left bg-slate-100 p-4 rounded-xl text-xs overflow-auto max-w-2xl text-slate-700">
          {JSON.stringify(posts, null, 2)}
        </pre>
      </div>
    );
  }

  const recentPosts = sortByDate(posts).filter((post) => post.slug !== single);
  const { frontmatter, content } = post[0];

  return (
    <GSAPWrapper>
      <PostSingle
        frontmatter={frontmatter}
        content={content}
        recentPosts={recentPosts}
        slug={single}
      />
    </GSAPWrapper>
  );
};

// get post single slug
export async function generateStaticParams() {
  const allSlug = await getSinglePage(`content/${blog_folder}`);
  return allSlug.map((item) => ({
    single: item.slug,
  }));
}

export default Article;
