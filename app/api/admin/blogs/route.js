import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const JSON_DB_PATH = path.join(BLOG_DIR, "posts.json");

// Helper to load all posts
function getJsonPosts() {
  // If the posts.json database doesn't exist, let's create it by migrating existing MD files!
  if (!fs.existsSync(JSON_DB_PATH)) {
    const files = fs.readdirSync(BLOG_DIR);
    const mdPosts = files
      .filter((file) => file.endsWith(".md") && !file.startsWith("_") && file !== "posts.json")
      .map((file) => {
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const parsed = matter(fileContent);
        const slug = file.replace(".md", "");
        return {
          id: slug,
          filename: file,
          slug: slug,
          title: parsed.data.title || "",
          content: parsed.content || "",
          categories: parsed.data.categories || ["Security"],
          authorName: parsed.data.author?.name || "Admin",
          image: parsed.data.image || "/images/blog/01.jpg",
          date: parsed.data.date ? new Date(parsed.data.date).toISOString() : new Date().toISOString(),
          draft: parsed.data.draft || false,
          metaDescription: parsed.data.metaDescription || "",
        };
      });

    // Save migrated database
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(mdPosts, null, 2), "utf8");
    return mdPosts;
  }

  // Load from existing JSON database
  const fileContent = fs.readFileSync(JSON_DB_PATH, "utf8");
  return JSON.parse(fileContent || "[]");
}

// Helper to save all posts
function saveJsonPosts(posts) {
  fs.writeFileSync(JSON_DB_PATH, JSON.stringify(posts, null, 2), "utf8");
}

export async function GET() {
  try {
    const posts = getJsonPosts();

    // Map JSON post format to match frontend expectation
    const formattedPosts = posts.map((post) => ({
      filename: post.filename || `${post.slug}.md`,
      slug: post.slug,
      content: post.content,
      frontmatter: {
        title: post.title,
        image: post.image,
        author: {
          name: post.authorName,
          avatar: "/images/author/derick.jpg",
        },
        date: post.date,
        draft: post.draft,
        categories: post.categories,
        metaDescription: post.metaDescription,
      },
    }));

    // Sort by date descending
    formattedPosts.sort((a, b) => new Date(b.frontmatter.date || 0) - new Date(a.frontmatter.date || 0));

    return NextResponse.json({ posts: formattedPosts });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { filename, title, content, categories, authorName, image, date, draft, metaDescription } = data;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const posts = getJsonPosts();

    // Format slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newFilename = filename || `${slug}.md`;

    const newPost = {
      id: slug,
      filename: newFilename,
      slug: slug,
      title,
      content,
      categories: Array.isArray(categories) ? categories : [categories],
      authorName: authorName || "Admin",
      image: image || "/images/blog/01.jpg",
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      draft: draft || false,
      metaDescription: metaDescription || "",
    };

    // If filename already exists, update it; otherwise append it
    const existingIndex = posts.findIndex((p) => p.filename === newFilename);
    if (existingIndex > -1) {
      posts[existingIndex] = newPost;
    } else {
      posts.push(newPost);
    }

    saveJsonPosts(posts);

    return NextResponse.json({ success: true, filename: newFilename });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 });
    }

    let posts = getJsonPosts();
    const existingCount = posts.length;
    posts = posts.filter((p) => p.filename !== filename);

    if (posts.length === existingCount) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    saveJsonPosts(posts);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
