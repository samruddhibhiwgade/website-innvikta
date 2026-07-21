import { Resolver } from "dns";
import { NextResponse } from "next/server";

// Create a custom DNS resolver pointing directly to Google & Cloudflare public DNS servers
const resolver = new Resolver();
resolver.setServers(["1.1.1.1", "1.0.0.1", "8.8.8.8", "8.8.4.4"]);

// Promisified resolver functions to ensure direct global DNS resolution without local caching timeouts
const resolveTxt = (domain) => new Promise((resolve, reject) => {
  resolver.resolveTxt(domain, (err, records) => err ? reject(err) : resolve(records));
});

const resolveMx = (domain) => new Promise((resolve, reject) => {
  resolver.resolveMx(domain, (err, records) => err ? reject(err) : resolve(records));
});

const resolve4 = (domain) => new Promise((resolve, reject) => {
  resolver.resolve4(domain, (err, records) => err ? reject(err) : resolve(records));
});

const resolve6 = (domain) => new Promise((resolve, reject) => {
  resolver.resolve6(domain, (err, records) => err ? reject(err) : resolve(records));
});

const resolveNs = (domain) => new Promise((resolve, reject) => {
  resolver.resolveNs(domain, (err, records) => err ? reject(err) : resolve(records));
});

const resolveCname = (domain) => new Promise((resolve, reject) => {
  resolver.resolveCname(domain, (err, records) => err ? reject(err) : resolve(records));
});

export async function POST(request) {
  try {
    const { domain, selector = "default" } = await request.json();

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 });
    }

    // Clean domain name (remove http://, https://, www., trailing slash, spaces)
    let cleanDomain = domain
      .trim()
      .toLowerCase()
      .replace(/^(https?:\/\/)?(www\.)?/, "")
      .replace(/\/$/, "");

    // Basic regex validation for domain
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    if (!domainRegex.test(cleanDomain)) {
      return NextResponse.json({ error: "Invalid domain format. Please enter a domain like example.com." }, { status: 400 });
    }

    const results = {
      domain: cleanDomain,
      spf: { record: null, status: "danger", message: "No SPF record found. Your domain is vulnerable to email spoofing." },
      dmarc: { record: null, status: "danger", message: "No DMARC record found. Attackers can easily spoof emails from your domain." },
      dkim: { record: null, status: "warning", message: `No DKIM record found for selector "${selector}".` },
      mx: [],
      txt: [],
      dns: {
        a: [],
        aaaa: [],
        ns: [],
        cname: []
      }
    };

    // 1. Resolve SPF (TXT records on domain)
    try {
      const txtRecords = await resolveTxt(cleanDomain);
      // txtRecords is array of arrays of strings
      const flatRecords = txtRecords.map(r => r.join(""));
      results.txt = flatRecords;

      const spfRecord = flatRecords.find(r => r.toLowerCase().startsWith("v=spf1"));
      if (spfRecord) {
        results.spf = {
          record: spfRecord,
          status: "success",
          message: "SPF record found and configured correctly."
        };
      }
    } catch (e) {
      // No records found or domain error
    }

    // 2. Resolve DMARC (TXT records on _dmarc.domain)
    try {
      const dmarcRecords = await resolveTxt(`_dmarc.${cleanDomain}`);
      const flatDmarc = dmarcRecords.map(r => r.join(""));
      const dmarcRecord = flatDmarc.find(r => r.toLowerCase().startsWith("v=dmarc1"));
      if (dmarcRecord) {
        results.dmarc = {
          record: dmarcRecord,
          status: "success",
          message: "DMARC record found and configured correctly."
        };
      }
    } catch (e) {
      // No records found
    }

    // 3. Resolve DKIM (TXT records on {selector}._domainkey.domain)
    if (selector) {
      try {
        const dkimRecords = await resolveTxt(`${selector}._domainkey.${cleanDomain}`);
        const flatDkim = dkimRecords.map(r => r.join(""));
        const dkimRecord = flatDkim.find(r => r.toLowerCase().includes("v=dkim1") || r.toLowerCase().includes("p="));
        if (dkimRecord) {
          results.dkim = {
            record: dkimRecord,
            status: "success",
            message: `DKIM record found for selector "${selector}".`
          };
        } else if (flatDkim.length > 0) {
          results.dkim = {
            record: flatDkim[0],
            status: "warning",
            message: `Record found at selector key but does not match standard DKIM format.`
          };
        } else {
          results.dkim = {
            record: null,
            status: "warning",
            message: `No DKIM record found for selector "${selector}".`
          };
        }
      } catch (e) {
        results.dkim = {
          record: null,
          status: "warning",
          message: `No DKIM record found for selector "${selector}".`
        };
      }
    }

    // 4. Resolve MX
    try {
      const mxRecords = await resolveMx(cleanDomain);
      results.mx = mxRecords.map(r => ({
        exchange: r.exchange,
        priority: r.priority
      }));
    } catch (e) {
      // No MX records
    }

    // 5. Resolve A
    try {
      results.dns.a = await resolve4(cleanDomain);
    } catch (e) {}

    // 6. Resolve AAAA
    try {
      results.dns.aaaa = await resolve6(cleanDomain);
    } catch (e) {}

    // 7. Resolve NS
    try {
      results.dns.ns = await resolveNs(cleanDomain);
    } catch (e) {}

    // 8. Resolve CNAME
    try {
      results.dns.cname = await resolveCname(cleanDomain);
    } catch (e) {}

    return NextResponse.json(results);
  } catch (error) {
    console.error("DNS Lookup API Error:", error);
    return NextResponse.json({ error: "Failed to perform DNS lookup." }, { status: 500 });
  }
}
