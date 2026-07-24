import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "content/newsletters.json");

export async function GET() {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, "[]", "utf-8");
    }
    const fileContent = fs.readFileSync(dbPath, "utf-8");
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read newsletter database" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, "[]", "utf-8");
    }
    const fileContent = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(fileContent);

    let updatedItem = null;

    if (payload.id) {
      // Edit existing newsletter
      const index = data.findIndex(item => item.id === payload.id);
      if (index !== -1) {
        data[index] = { ...data[index], ...payload };
        updatedItem = data[index];
      } else {
        return NextResponse.json({ error: "Newsletter not found" }, { status: 404 });
      }
    } else {
      // Create new newsletter
      const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
      const slug = payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      updatedItem = {
        ...payload,
        id: newId,
        slug
      };
      data.push(updatedItem);
    }

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");

    // Check if we should broadcast emails to subscribers via PHP backend
    let mailStatus = null;
    if (payload.mailSubscribers && updatedItem) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";
        const mailRes = await fetch(`${backendUrl}/newsletter_api.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "broadcast",
            title: updatedItem.title,
            description: updatedItem.description,
            slug: updatedItem.slug,
            content: updatedItem.content
          })
        });
        if (mailRes.ok) {
          mailStatus = await mailRes.json();
        } else {
          mailStatus = { success: false, error: `Mailing API HTTP error: ${mailRes.status}` };
        }
      } catch (mailErr) {
        mailStatus = { success: false, error: mailErr.message };
      }
    }

    return NextResponse.json({ success: true, data, mailStatus });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update newsletter database: " + error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id"));
    if (!id) {
      return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
    }

    if (!fs.existsSync(dbPath)) {
      return NextResponse.json({ success: true, data: [] });
    }

    const fileContent = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(fileContent);

    const updatedData = data.filter(item => item.id !== id);
    fs.writeFileSync(dbPath, JSON.stringify(updatedData, null, 2), "utf-8");
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete newsletter from database" }, { status: 500 });
  }
}
