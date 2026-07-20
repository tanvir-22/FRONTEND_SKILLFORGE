const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const si = require("react-icons/si");
const lucide = require("lucide-react");

const OUT_DIR = path.join(__dirname, "..", "public", "course-thumbnails");

const GRADIENTS = {
  programming: ["#1e3a8a", "#3b82f6"],
  "video-editing": ["#581c87", "#db2777"],
  design: ["#c2410c", "#f43f5e"],
  marketing: ["#065f46", "#10b981"],
};

const courses = [
  { slug: "complete-javascript-react-bootcamp", title: "The Complete JavaScript & React Bootcamp", category: "programming", icon: si.SiJavascript },
  { slug: "python-for-data-analysis", title: "Python for Data Analysis", category: "programming", icon: si.SiPython },
  { slug: "fullstack-nodejs-mongodb-masterclass", title: "Full-Stack Node.js & MongoDB Masterclass", category: "programming", icon: si.SiNodedotjs },
  { slug: "cinematic-video-editing-premiere-pro", title: "Cinematic Video Editing with Premiere Pro", category: "video-editing", icon: lucide.Film },
  { slug: "motion-graphics-after-effects", title: "Motion Graphics with After Effects", category: "video-editing", icon: lucide.Wand2 },
  { slug: "color-grading-audio-mixing-for-video", title: "Color Grading & Audio Mixing for Video", category: "video-editing", icon: lucide.SlidersHorizontal },
  { slug: "uiux-design-systems-figma", title: "UI/UX Design Systems with Figma", category: "design", icon: si.SiFigma },
  { slug: "photoshop-digital-illustration", title: "Photoshop for Digital Illustration", category: "design", icon: lucide.PenTool },
  { slug: "user-research-usability-testing", title: "User Research & Usability Testing", category: "design", icon: lucide.ClipboardCheck },
  { slug: "digital-marketing-seo-fundamentals", title: "Digital Marketing & SEO Fundamentals", category: "marketing", icon: si.SiGoogleads },
  { slug: "social-media-marketing-mastery", title: "Social Media Marketing Mastery", category: "marketing", icon: si.SiInstagram },
  { slug: "freelancing-personal-branding-creatives", title: "Freelancing & Personal Branding for Creatives", category: "marketing", icon: lucide.Briefcase },
];

function wrapTitle(title, maxCharsPerLine) {
  const words = title.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxCharsPerLine && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function renderIconMarkup(IconComponent) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color: "#ffffff", size: 120 })
  );
}

function buildThumbnail({ title, category, icon }) {
  const [from, to] = GRADIENTS[category];
  const iconMarkup = renderIconMarkup(icon);
  const lines = wrapTitle(title, 22);
  const textStartY = 500 - (lines.length - 1) * 27;

  const textLines = lines
    .map(
      (line, i) =>
        `<text x="60" y="${textStartY + i * 54}" font-size="40" font-weight="700" fill="#ffffff" font-family="Arial, Helvetica, sans-serif">${escapeXml(
          line
        )}</text>`
    )
    .join("\n");

  return `<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bg)" />
  <circle cx="700" cy="90" r="140" fill="rgba(255,255,255,0.08)" />
  <circle cx="40" cy="560" r="180" fill="rgba(255,255,255,0.06)" />
  <g transform="translate(60,60)" opacity="0.95">${iconMarkup}</g>
  ${textLines}
</svg>`;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const course of courses) {
  const svg = buildThumbnail(course);
  const outPath = path.join(OUT_DIR, `${course.slug}.svg`);
  fs.writeFileSync(outPath, svg, "utf-8");
  console.log(`Wrote ${outPath}`);
}
