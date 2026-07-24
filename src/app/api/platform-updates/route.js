import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "content/platform-updates.json");

export async function GET() {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, "[]", "utf-8");
    }
    const fileContent = fs.readFileSync(dbPath, "utf-8");
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read platform-updates database" }, { status: 500 });
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

    if (payload.id) {
      // Edit existing
      const index = data.findIndex(item => item.id === payload.id);
      if (index !== -1) {
        data[index] = { ...data[index], ...payload };
      } else {
        return NextResponse.json({ error: "Update not found" }, { status: 404 });
      }
    } else {
      // Create new
      const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
      const slug = payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const newItem = {
        ...payload,
        id: newId,
        slug
      };
      data.push(newItem);
    }

    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update platform-updates database" }, { status: 500 });
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
    return NextResponse.json({ error: "Failed to delete update from database" }, { status: 500 });
  }
}
