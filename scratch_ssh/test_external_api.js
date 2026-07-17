async function test() {
  const url = "https://website.innvikta.co.in/api/external/start-free";
  
  // 1. Without API Key
  try {
    console.log("--- 1. Testing WITHOUT API Key ---");
    const res = await fetch(url);
    console.log("Status:", res.status);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }

  // 2. With Invalid API Key
  try {
    console.log("\n--- 2. Testing WITH INVALID API Key ---");
    const res = await fetch(url, {
      headers: { "x-api-key": "invalid_key_123" }
    });
    console.log("Status:", res.status);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }

  // 3. With Valid API Key
  try {
    console.log("\n--- 3. Testing WITH VALID API Key ---");
    const res = await fetch(url, {
      headers: { "x-api-key": "inv_sf_prod_8g2A0jU5h" }
    });
    console.log("Status:", res.status);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
