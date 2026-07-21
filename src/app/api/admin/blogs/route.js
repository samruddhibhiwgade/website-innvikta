import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";
    const res = await fetch(`${backendUrl}/blog_api.php`);
    
    if (!res.ok) throw new Error("Failed to fetch blogs from database");
    
    const data = await res.json();
    if (data.posts) {
      data.posts = data.posts.map((page) => {
        const title = page.frontmatter.title || "";
        const correctSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        return {
          ...page,
          slug: correctSlug
        };
      });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";
    
    const res = await fetch(`${backendUrl}/blog_api.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`PHP Error: ${res.status} - ${errText}`);
    }
    
    const responseData = await res.json();
    return NextResponse.json(responseData);
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

    const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";
    
    const res = await fetch(`${backendUrl}/blog_api.php?filename=${filename}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete blog from database");

    const responseData = await res.json();
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
