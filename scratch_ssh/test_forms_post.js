async function test() {
  try {
    const res = await fetch("https://website.innvikta.co.in/api/forms", {
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
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

test();
