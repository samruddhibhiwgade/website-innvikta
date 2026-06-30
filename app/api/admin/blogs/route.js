import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export async function GET() {
  try {
    if (!fs.existsSync(BLOG_DIR)) {
      return NextResponse.json({ posts: [] });
    }

    const files = fs.readdirSync(BLOG_DIR);
    const posts = files
      .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
      .map((file) => {
        const filePath = path.join(BLOG_DIR, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const parsed = matter(fileContent);
        return {
          filename: file,
          slug: file.replace(".md", ""),
          frontmatter: parsed.data,
          content: parsed.content,
        };
      });

    // Sort by date descending
    posts.sort((a, b) => new Date(b.frontmatter.date || 0) - new Date(a.frontmatter.date || 0));

    return NextResponse.json({ posts });
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

    // Format slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const fileToSave = filename || `${slug}.md`;
    const filePath = path.join(BLOG_DIR, fileToSave);

    // Frontmatter object
    const frontmatter = {
      title,
      image: image || "/images/blog/01.jpg",
      author: {
        name: authorName || "Admin",
        avatar: "/images/author/derick.jpg", // default avatar
      },
      date: date ? new Date(date).toISOString() : new Date().toISOString(),
      draft: draft || false,
      categories: Array.isArray(categories) ? categories : categories ? [categories] : ["Security"],
      metaDescription: metaDescription || "",
    };

    const fileString = matter.stringify(content, frontmatter);

    fs.writeFileSync(filePath, fileString, "utf8");

    return NextResponse.json({ success: true, filename: fileToSave });
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

    const filePath = path.join(BLOG_DIR, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
