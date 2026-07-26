import { NextResponse } from "next/server";

const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";

export async function GET() {
  try {
    const res = await fetch(`${backendUrl}/cms_api.php?type=newsletters`, { next: { revalidate: 10 } });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read newsletters: " + error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    
    // Save to DB via backend PHP API
    const res = await fetch(`${backendUrl}/cms_api.php?type=newsletters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    
    // Check if we should broadcast emails to subscribers via PHP backend
    let mailStatus = null;
    if (payload.mailSubscribers) {
      try {
        const slug = payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const mailRes = await fetch(`${backendUrl}/newsletter_api.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "broadcast",
            title: payload.title,
            description: payload.description,
            slug: slug,
            content: payload.content
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
    return NextResponse.json({ error: "Failed to update newsletters: " + error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const res = await fetch(`${backendUrl}/cms_api.php?type=newsletters&id=${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete newsletter: " + error.message }, { status: 500 });
  }
}
