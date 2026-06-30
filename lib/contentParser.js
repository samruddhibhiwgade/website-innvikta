import parseMDX from "@lib/utils/mdxParser";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

// get list page data, ex: _index.md
export const getListPage = async (filePath) => {
  const pageData = fs.readFileSync(filePath, "utf-8");
  const pageDataParsed = matter(pageData);
  const notFoundPage = fs.readFileSync("content/404.md", "utf-8");
  const notFoundDataParsed = matter(notFoundPage);
  let frontmatter, content;

  if (pageDataParsed) {
    content = pageDataParsed.content;
    frontmatter = pageDataParsed.data;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};

// get all single pages, ex: blog/post.md
export const getSinglePage = (folder) => {
  const jsonPath = path.join(folder, "posts.json");
  if (fs.existsSync(jsonPath)) {
    try {
      const jsonData = fs.readFileSync(jsonPath, "utf-8");
      const posts = JSON.parse(jsonData);
      const formattedPosts = posts.map((post) => {
        const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return {
          frontmatter: {
            title: post.title,
            image: post.image || "/images/blog/01.jpg",
            author: {
              name: post.authorName || "Admin",
              avatar: "/images/author/derick.jpg"
            },
            date: post.date,
            draft: post.draft || false,
            categories: post.categories || ["Security"],
            metaDescription: post.metaDescription || ""
          },
          slug: slug,
          content: post.content || ""
        };
      });

      const publishedPages = formattedPosts.filter(
        (page) => !page.frontmatter.draft && page
      );
      const filterByDate = publishedPages.filter(
        (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
      );
      return filterByDate;
    } catch (e) {
      console.error("Failed to parse posts.json, falling back to markdown", e);
    }
  }

  const filesPath = fs.readdirSync(folder);
  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );
  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const pageData = fs.readFileSync(path.join(folder, filename), "utf-8");
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;
    return { frontmatter: frontmatter, slug: url, content: content };
  });

  const publishedPages = singlePages.filter(
    (page) =>
      !page.frontmatter.draft && page.frontmatter.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};

// get a regular page data from many pages, ex: about.md
export const getRegularPage = async (slug) => {
  const publishedPages = getSinglePage("content");
  const pageData = publishedPages.filter((data) => data.slug === slug);
  const notFoundPage = fs.readFileSync("content/404.md", "utf-8");
  const notFoundDataParsed = matter(notFoundPage);

  let frontmatter, content;
  if (pageData[0]) {
    content = pageData[0].content;
    frontmatter = pageData[0].frontmatter;
  } else {
    content = notFoundDataParsed.content;
    frontmatter = notFoundDataParsed.data;
  }
  const mdxContent = await parseMDX(content);

  return {
    frontmatter,
    content,
    mdxContent,
  };
};
