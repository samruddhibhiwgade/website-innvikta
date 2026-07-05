import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";
    
    const res = await fetch(`${backendUrl}/upload_api.php`, {
      method: "POST",
      body: formData, // passing the FormData object directly works in Next.js fetch
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`PHP Error: ${res.status} - ${errText}`);
    }

    const responseData = await res.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
