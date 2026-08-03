async function test() {
  try {
    const res = await fetch("https://innvikta.co.in/Innvikta-Website/Cyberhelp_Innvikta/server/forms_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form_type: "Start Free",
        name: "Start Free User",
        email: "test.user@innvikta.com",
        phone: "+123456789",
        company: "Innvikta Test Corp",
        designation: "Manager",
        team_size: "11-25",
        message: "Hello, this is a test lead to verify SMTP configuration and database storage!"
      })
    });
    const text = await res.text();
    console.log("STATUS:", res.status);
    console.log("RESPONSE TEXT:");
    console.log(text);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

test();
