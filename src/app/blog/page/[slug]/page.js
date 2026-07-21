import config from "@config/config.json";
import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import BlogPageClient from "@layouts/components/BlogPageClient";

const { blog_folder } = config.settings;

// Blog Home Page & pagination compatibility
const BlogPagination = async () => {
  const posts = await getSinglePage(`content/${blog_folder}`);
  const postIndex = await getListPage(`content/${blog_folder}/_index.md`);
  
  // Sort posts by date descending (latest first)
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );

  const { frontmatter } = postIndex;
  const { title } = frontmatter;

  return (
    <GSAPWrapper>
      <SeoMeta title={title} />
      <BlogPageClient initialPosts={sortedPosts} title={title} />
      {/* CTA */}
      <Cta />
    </GSAPWrapper>
  );
};

export default BlogPagination;

export async function generateStaticParams() {
  const getAllSlug = await getSinglePage(`content/${blog_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      slug: (i + 1).toString(),
    });
  }

  return paths;
}
