

async function test() {
  try {
    const res = await fetch("https://website.innvikta.co.in/api/forms");
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

test();
