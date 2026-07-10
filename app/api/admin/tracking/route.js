import { NextResponse } from "next/server";

const PHP_BACKEND = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";

export async function GET() {
  try {
    const res = await fetch(`${PHP_BACKEND}/track_analytics.php`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`PHP backend responded with status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Tracking analytics fetch error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
