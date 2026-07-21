export const WORDLIST = [
  "about", "above", "across", "action", "active", "actor", "admit", "adopt", "advice", "advise",
  "affect", "afford", "afraid", "agency", "agent", "agree", "ahead", "alarm", "album", "alert",
  "alike", "alive", "allow", "alone", "along", "alter", "among", "anger", "angle", "angry",
  "animal", "annual", "answer", "appeal", "appear", "apple", "apply", "argue", "arise", "around",
  "arrest", "arrive", "arrow", "article", "artist", "aside", "aspect", "assist", "assume", "attack",
  "attend", "audit", "author", "autumn", "avenue", "average", "avoid", "awake", "award", "aware",
  "backed", "backup", "badge", "baggage", "baker", "balance", "banner", "barber", "barely", "barrel",
  "basin", "basket", "battle", "beacon", "beauty", "become", "before", "behalf", "behind", "belief",
  "belong", "below", "bench", "benefit", "beside", "better", "beyond", "bishop", "bitter", "blanket",
  "border", "borrow", "bottle", "bottom", "bounce", "boundary", "branch", "brave", "breach", "bridge",
  "bright", "bronze", "brown", "brush", "bubble", "bucket", "budget", "buffer", "builder", "bundle",
  "burden", "bureau", "butter", "button", "buyer", "cabin", "cable", "cactus", "cagey", "camera",
  "camp", "campus", "candle", "canvas", "canyon", "capital", "captain", "carbon", "career", "careful",
  "cargo", "carpet", "carrot", "castle", "casual", "catalog", "cattle", "cavity", "cement", "center",
  "chain", "chair", "chamber", "chance", "change", "channel", "chapel", "chapter", "charge", "charity",
  "charm", "chart", "chase", "cheap", "check", "cheek", "cheerful", "cheese", "cherry", "chest",
  "chief", "child", "chimney", "china", "choice", "choose", "chorus", "chronic", "church", "cider",
  "cigar", "cinema", "circle", "circus", "citizen", "citrus", "civil", "claim", "clamp", "classic",
  "clay", "clean", "clear", "clerk", "clever", "click", "client", "cliff", "climate", "climb",
  "clinic", "clock", "close", "cloth", "cloud", "clover", "coach", "coast", "cobalt", "coffee",
  "cohort", "collar", "colony", "colors", "column", "combat", "comedy", "comfort", "comic", "commit",
  "common", "compact", "company", "compare", "compel", "comply", "concept", "concern", "concert", "concrete",
  "condor", "conduct", "confer", "conflict", "conform", "connect", "consent", "consul", "contact", "contain",
  "content", "contest", "context", "contour", "control", "convert", "convex", "convey", "convict", "cookie",
  "copper", "corner", "corona", "correct", "corrid", "cosmic", "cosmos", "costly", "cotton", "council",
  "counsel", "counter", "country", "county", "couple", "courage", "cousin", "covey", "cradle", "crafty",
  "crater", "crayon", "crazy", "create", "credit", "creek", "crest", "crisis", "critic", "crook",
  "crowd", "crown", "crude", "cruise", "crush", "crystal", "cubic", "culture", "cupboard", "curator",
  "curfew", "curious", "current", "cursor", "curtain", "cushion", "custom", "cyber", "cycle", "cynic"
];

export const faqData = [
  {
    question: "What is a strong password?",
    answer: "A strong password is a long, randomized sequence of letters (both uppercase and lowercase), numbers, and special symbols that does not contain dictionary words, sequences, or personal details."
  },
  {
    question: "What is a passphrase?",
    answer: "A passphrase is a security credential made from multiple random words combined. Passphrases are often longer than standard passwords, significantly harder for computers to brute-force, yet much easier for humans to remember."
  },
  {
    question: "How long should my passwords be?",
    answer: "We recommend a minimum of 12 to 16 characters for regular passwords, and at least 4 to 5 words for passphrases. Every added character increases entropy exponentially, rendering standard brute-force attacks mathematically impossible."
  },
  {
    question: "Are passphrases safer than passwords?",
    answer: "Yes, in most cases. Because entropy scales dramatically with length, a 5-word random passphrase (e.g. 'wagon-canyon-coffee-curator-beacon') is vastly stronger than a complex 10-character password like 'P@ssw0rd1!', while remaining much easier to memorize."
  },
  {
    question: "What is password entropy?",
    answer: "Password entropy measures the computational randomness and unpredictability of a password in bits. Higher entropy means a password requires more attempts to guess, offering higher resistance to cracking tools."
  },
  {
    question: "What is credential stuffing?",
    answer: "Credential stuffing is an automated cyberattack where hackers use lists of leaked credentials (usernames and passwords from past database breaches) to log in to other popular websites, relying on the fact that many users reuse passwords across services."
  },
  {
    question: "What is Multi-Factor Authentication (MFA)?",
    answer: "Multi-Factor Authentication (MFA) requires users to provide two or more verification factors to gain access to an account (e.g., a password plus a temporary code sent to an authenticator app), ensuring access is blocked even if passwords leak."
  },
  {
    question: "Are password managers safe to use?",
    answer: "Yes. Cybersecurity authorities strongly recommend using password managers. They securely encrypt your unique passwords locally under a master key, removing the need to reuse passwords or memorize dozens of credentials."
  },
  {
    question: "What are passkeys?",
    answer: "Passkeys are a modern passwordless authentication standard created by the FIDO Alliance. They leverage local device security (biometrics like FaceID or TouchID) to log you in without requiring traditional passwords, eliminating phishing vulnerabilities."
  },
  {
    question: "What constitutes good password hygiene?",
    answer: "Good hygiene includes: creating unique passwords for every single account, avoiding predictable strings, storing credentials in a secure password manager, activating MFA everywhere, and changing credentials immediately upon reports of database compromises."
  }
];
