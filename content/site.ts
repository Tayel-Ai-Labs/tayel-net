/**
 * All page copy lives here, in one file, in English.
 *
 * Anything marked TODO is a placeholder waiting on the owner. It is written so
 * the layout holds, not so it ships. Grep for TODO before launch.
 */

export const site = {
  name: "Tayel AI Labs",
  /** The line under the mark in the logo. Rendered uppercase. */
  motto: "Science, Trust, AI",
  tagline:
    "Connecting learning, research, AI development, and intelligent production within one unified, powerful ecosystem.",
  email: "Labs@tayel.net",
  phones: ["+20 103 887 8057", "+20 109 377 4549"],
  social: {
    facebook: "https://www.facebook.com/people/Tayel-Ai-Labs/61589517705098/",
    instagram: "https://www.instagram.com/tayelailabs/",
    linkedin: "https://eg.linkedin.com/company/tayel-ai-labs",
    youtube: "https://www.youtube.com/@TayelAiLabs",
  },
} as const;

export type Product = {
  slug: string;
  index: string;
  name: string;
  blurb: string;
  status: "live" | "coming-soon";
};

export const products: Product[] = [
  {
    slug: "courses",
    index: "01",
    name: "Courses",
    blurb:
      "AI driven learning with an interactive personal tutor built into every lesson.",
    status: "coming-soon",
  },
  {
    slug: "our-life",
    index: "02",
    name: "OurLife",
    blurb:
      "Next generation fashion studio powered by our Beautiful Machine AI model.",
    status: "coming-soon",
  },
  {
    slug: "research",
    index: "03",
    name: "Ai Research Machine",
    blurb:
      "Empowering researchers with deep data engineering and advanced technical insights.",
    status: "coming-soon",
  },
  {
    slug: "mind",
    index: "04",
    name: "Mind",
    blurb:
      "Accelerating enterprise growth through tailored end to end AI transformation.",
    status: "coming-soon",
  },
];

export type Model = {
  slug: string;
  name: string;
  /** Who it was built for. Shown as the card's overline. */
  owner: string;
  /** What it is, in one line. No marketing. */
  blurb: string;
  /** The one thing that makes it not a demo. */
  note: string;
  /** How many people it actually reaches. Omit when there is no honest number. */
  reach?: string;
  status: "live" | "in-build" | "planned";
  url: string | null;
  tags: string[];
};

/**
 * Models: what the lab has actually built, sitting next to the four core
 * products. A product is a platform we are opening; a model is a system we
 * shipped for a named problem.
 */
export const models: Model[] = [
  {
    slug: "ezzat-physics",
    name: "Ezzat Physics AI",
    owner: "Education · Mr. Mohamed Ezzat",
    blurb:
      "A teaching assistant for a physics tutor. Students ask in Arabic and it answers from his own notes, in his wording, and walks them through the problem instead of handing over the answer.",
    note:
      "It cannot wander outside the lesson. The concepts are a closed list, the known typos in the printed notes are corrected explicitly, and a language filter holds it to the teacher's own Arabic. He gets a dashboard of what the class actually asked.",
    reach: "Over 1,000 students",
    status: "live",
    url: "https://www.ezzatphysicsai.com",
    tags: ["EdTech", "Arabic", "FastAPI", "Teacher dashboard"],
  },
  {
    slug: "visual-scream",
    name: "Visual Scream AI",
    owner: "Live events · Techno",
    blurb:
      "Real-time generative visuals for a techno night. It listens to the room through a laptop microphone, works out the tempo, the bar and where the track sits in its arrangement, and drives a set of GLSL scenes from that, unattended for a whole set.",
    note:
      "No video files, no network, no dependencies. A rendered clip has no idea a drop is coming, and the drop is the one thing the room reacts to. A shader answers in the same frame the audio arrives, runs at 60fps for eight hours, and never repeats exactly.",
    reach: "5,000 people reached",
    status: "live",
    url: "https://visualscreamai.cc",
    tags: ["Live visuals", "GLSL", "Audio analysis", "Zero-dependency"],
  },
  {
    slug: "funzo-coffee",
    name: "Funzo Coffee",
    owner: "Cafés · Egypt",
    blurb:
      "A QR menu the customer reads at the table and the owner updates from a spreadsheet. 151 items, bilingual, no app to install and no dashboard to learn.",
    note:
      "The page makes zero network requests once it loads: no fonts, no CDN, no remote images. The customer is on café wifi deciding whether to wait, so first paint is the whole product.",
    reach: "About 36,000 customers a year",
    status: "live",
    url: "https://funzo.cc",
    tags: ["Hospitality", "QR menu", "Bilingual AR/EN", "Auto price sync"],
  },
  {
    slug: "robopilot",
    name: "RoboPilot AI",
    owner: "Robotics · Engineering",
    blurb:
      "A project engineering copilot for robotics and embedded work: it proposes the architecture, names the components, and prices the build.",
    note:
      "The AI proposes architecture and assumptions only. Every price, compatibility check and risk score comes from deterministic code against an approved catalog, never a guessed number.",
    status: "in-build",
    url: "https://robo-pilot-ai-backend.vercel.app",
    tags: ["Robotics", "Embedded", "Next.js", "Deterministic pricing"],
  },
  {
    slug: "egypt-baccalaureate",
    name: "Egypt Baccalaureate AI",
    owner: "Education · Egypt",
    blurb:
      "A study platform for the new Egyptian Baccalaureate, with an AI tutor that answers in Arabic and an exam generator built on the real curriculum.",
    note:
      "Arabic-first, RTL, streaming. The curriculum is verified against the Ministry's own documents rather than scraped.",
    status: "in-build",
    url: null,
    tags: ["Education", "Arabic RTL", "FastAPI", "AI tutor"],
  },
];



export const focusAreas = [
  {
    q: "How are you driving AI transformation in Egypt?",
    a: "We are committed to empowering Egypt's digital future by integrating cutting edge AI solutions across all key sectors, driving innovation, infrastructure development, and economic growth nationwide.",
  },
  {
    q: "What is your role in Quantum AI research?",
    a: "We actively explore the intersection of quantum computing and artificial intelligence, leveraging Quantum AI to solve complex computational problems and pave the way for next generation intelligence.",
  },
  {
    q: "Why is Neural Data Compression a key research priority?",
    a: "Neural compression is at the forefront of modern AI research. We focus on optimizing deep learning models and data representation to achieve ultra efficient transmission, storage, and processing at scale.",
  },
  {
    q: "How do you support public AI education and literacy?",
    a: "We believe AI knowledge should be accessible to everyone. Through training programs, open resources, and community initiatives, we aim to democratize AI education and build a skilled talent pool for the future.",
  },
];

export type Founder = { name: string; role: string };

export const founders: Founder[] = [
  { name: "Adam Tayel", role: "AI Architect & Integration Engineer" },
  { name: "Karim Mansour", role: "AI & Automation Engineer" },
  { name: "Omar Ezz", role: "Product & UI/UX Designer" },
];

export const about = {
  who: {
    title: "Who We Are",
    body: "A team of Egyptian artists, engineers, scientists, and philosophers building the future of AGI.",
  },
  vision: {
    title: "Our Vision & Mission",
    body: "To bridge human creativity, science, and engineering to build the next generation of AGI, from Egypt.",
  },
};
