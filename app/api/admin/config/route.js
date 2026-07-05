import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(process.cwd(), "config/config.json");

export async function GET() {
  try {
    if (!fs.existsSync(CONFIG_PATH)) {
      return NextResponse.json({ keyword_links: [] });
    }
    const configData = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
    return NextResponse.json({ keyword_links: configData.keyword_links || [] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { keyword_links } = await request.json();
    if (!Array.isArray(keyword_links)) {
      return NextResponse.json({ error: "keyword_links must be an array" }, { status: 400 });
    }

    if (!fs.existsSync(CONFIG_PATH)) {
      return NextResponse.json({ error: "Config file not found" }, { status: 500 });
    }

    const configData = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
    configData.keyword_links = keyword_links;

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(configData, null, 2), "utf8");
    return NextResponse.json({ success: true, keyword_links });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
