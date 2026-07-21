export const CYBER_TERMS = {
  PHISHING: {
    name: "Phishing",
    def: "A fraudulent attempt to steal sensitive information (like credentials or credit card details) by disguising as a trustworthy entity in electronic communications."
  },
  MALWARE: {
    name: "Malware",
    def: "Malicious software designed to disrupt, damage, or gain unauthorized access to computer systems, servers, or networks."
  },
  FIREWALL: {
    name: "Firewall",
    def: "A security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules."
  },
  PASSWORD: {
    name: "Password",
    def: "A secret string of characters used to confirm identity during authentication and protect unauthorized access to user accounts."
  },
  ENCRYPTION: {
    name: "Encryption",
    def: "The cryptographic process of encoding messages or information in such a way that only authorized parties can read it."
  },
  RANSOMWARE: {
    name: "Ransomware",
    def: "A specific type of extortion malware that encrypts a victim's data files and demands payment in exchange for the decryption key."
  },
  VPN: {
    name: "VPN",
    def: "Virtual Private Network; a service that encrypts internet traffic and masks online identity to protect data transmission over public networks."
  },
  ANTIVIRUS: {
    name: "Antivirus",
    def: "Software utility designed to detect, neutralize, quarantine, and eliminate known malicious software signatures from computer storage."
  },
  PATCH: {
    name: "Patch",
    def: "A software release update designed to remediate security vulnerabilities, resolve system bugs, or enhance application performance."
  },
  ZEROTRUST: {
    name: "Zero Trust",
    def: "A strategic cybersecurity model centered on the belief that organizations should not automatically trust anything inside or outside its perimeters."
  },
  MFA: {
    name: "MFA",
    def: "Multi-Factor Authentication; a verification mechanism requiring users to present two or more independent credentials prior to system entry."
  },
  SIEM: {
    name: "SIEM",
    def: "Security Information and Event Management; platforms that aggregate security event log data across sources to discover anomalies."
  }
};

export const CYBER_FACTS = [
  "Over 90% of successful cyber attacks start with a phishing email targeting an employee.",
  "Using Multi-Factor Authentication (MFA) blocks 99.9% of automated account takeover attempts.",
  "The average time to identify and contain a data breach globally is over 200 days.",
  "Ransomware attacks occur every 11 seconds worldwide, causing billions in corporate losses.",
  "Zero Trust architectures operate under the simple motto: 'Never trust, always verify.'"
];

export const generateWordSearchGrid = (words, size, allowedDirs) => {
  const grid = Array(size).fill(null).map(() => Array(size).fill(""));
  const solutionPaths = {};

  const sortedWords = [...words].sort((a, b) => b.length - a.length);

  for (const word of sortedWords) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 150) {
      attempts++;
      const dir = allowedDirs[Math.floor(Math.random() * allowedDirs.length)];
      const [dr, dc] = dir;

      const len = word.length;
      const minR = dr < 0 ? len - 1 : 0;
      const maxR = dr > 0 ? size - len : size - 1;
      const minC = dc < 0 ? len - 1 : 0;
      const maxC = dc > 0 ? size - len : size - 1;

      if (maxR < minR || maxC < minC) continue;

      const startR = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
      const startC = Math.floor(Math.random() * (maxC - minC + 1)) + minC;

      let fits = true;
      const cellsToCheck = [];
      for (let i = 0; i < len; i++) {
        const r = startR + i * dr;
        const c = startC + i * dc;
        const char = word[i];
        if (grid[r][c] !== "" && grid[r][c] !== char) {
          fits = false;
          break;
        }
        cellsToCheck.push({ r, c, char });
      }

      if (fits) {
        const path = [];
        cellsToCheck.forEach(({ r, c, char }) => {
          grid[r][c] = char;
          path.push({ r, c });
        });
        solutionPaths[word] = path;
        placed = true;
      }
    }
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === "") {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return { grid, solutionPaths };
};
