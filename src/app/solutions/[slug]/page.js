import NotFound from "@layouts/404";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import Solution from "@layouts/Solution";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getSinglePage } from "@lib/contentParser";
import parseMDX from "@lib/utils/mdxParser";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// get a regular page data from solutions folder
const getSolutionPage = async (slug) => {
  const filePath = path.join("content", "solutions", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const pageData = fs.readFileSync(filePath, "utf-8");
  const pageDataParsed = matter(pageData);
  const frontmatter = pageDataParsed.data;
  const content = pageDataParsed.content;
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

const SolutionPage = async ({ params }) => {
  const { slug } = params;
  const pageData = await getSolutionPage(slug);

  if (!pageData) {
    return (
      <GSAPWrapper>
        <NotFound />
      </GSAPWrapper>
    );
  }

  const { title, meta_title, description, image, noindex, canonical, layout } =
    pageData.frontmatter;
  const { content } = pageData;

  return (
    <GSAPWrapper>
      <SeoMeta
        title={title}
        description={description ? description : content.slice(0, 120)}
        meta_title={meta_title}
        image={image}
        noindex={noindex}
        canonical={canonical}
      />

      {layout === "solution" ? (
        <Solution data={pageData} />
      ) : (
        <NotFound data={pageData} />
      )}
    </GSAPWrapper>
  );
};
export default SolutionPage;

export async function generateStaticParams() {
  const folder = path.join("content", "solutions");
  if (!fs.existsSync(folder)) return [];
  const filesPath = fs.readdirSync(folder);
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  return sanitizeFiles.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}
