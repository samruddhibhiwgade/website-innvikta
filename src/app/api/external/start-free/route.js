import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const apiKey = request.headers.get("x-api-key");
    const configuredKey = process.env.EXTERNAL_PLATFORM_API_KEY || "inv_sf_prod_8g2A0jU5h"; // Default fallback key

    if (!apiKey || apiKey !== configuredKey) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Invalid API Key." },
        { status: 401 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_PHP_BACKEND_URL || "https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server";
    
    // Fetch only the "Start Free" leads
    const res = await fetch(`${backendUrl}/forms_api.php?form_type=Start%20Free`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch from database. Status: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.error || "Failed to query database");
    }

    // Format output leads
    const formattedLeads = data.leads.map(lead => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      designation: lead.designation,
      team_size: lead.team_size,
      message: lead.message,
      created_at: lead.created_at
    }));

    return NextResponse.json({
      success: true,
      leads: formattedLeads
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
