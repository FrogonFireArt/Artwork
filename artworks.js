// ============================================================
//  artworks.js — Your Artwork Collection
//  This is the ONLY file you need to edit to add new artwork.
// ============================================================
//
//  HOW TO ADD AN ARTWORK
//  Copy one of the blocks below, paste it inside the array,
//  and fill in your details. Don't forget the comma after
//  the closing } of the block above it.
//
//  FIELDS:
//
//    id         A unique number. Just keep counting up (1, 2, 3…).
//
//    title      The artwork title shown in the lightbox.
//
//    category   Which filter tab it appears under.
//               One category:   "2D"
//               Multiple tabs:  ["Pixel Art", "Animation"]
//
//    desc       Short description shown in the lightbox. Use "" to leave it blank.
//
//    src        Path to the image file. IMPORTANT: folder names are case-sensitive
//               on GitHub and localhost. Use the exact same capitalisation as the
//               actual folder on disk.
//               Example:  "images/2D/my-art.jpg"  not  "images/2d/my-art.jpg"
//
//    mediaType  "image"  → JPG, PNG, WEBP
//               "gif"    → animated GIF
//               "video"  → MP4, WEBM
//
//    pixelArt   Add  pixelArt: true  for pixel art.
//               This keeps it sharp and centered instead of stretched.
//               Leave this line out entirely for normal artwork.
//
//    order      Controls position within each tab. Lower = appears first.
//               Same position everywhere:   order: 1
//               Per-tab positions:          order: { "all": 1, "2D": 2 }
//               Leave out entirely to sort by id automatically.
//
// ============================================================


const ARTWORKS = [

  // ── 2D ─────────────────────────────────────────────────
  {
    id: 1,
    title: "Lucia - OC",
    category: "2D",
    order: { "all": 1, "2D": 1 },
    desc: "",
    src: "images/2D/Lucia.webp",
    mediaType: "image"
  },

  // ── Pixel Art + Animation ───────────────────────────────
  {
    id: 2,
    title: "Ronin - Animation",
    category: ["Pixel Art", "Animation"],
    order: { "all": 2, "Pixel Art": 1, "Animation": 1 },
    desc: "Animation made with Spine2D",
    src: "images/Animation/RoninAnimation.gif",
    mediaType: "image",
    pixelArt: true
  },
  {
    id: 3,
    title: "Kitsune Vendor",
    category: ["Pixel Art", "Animation"],
    order: { "all": 3, "Pixel Art": 2, "Animation": 2 },
    desc: "Animation made with Spine2D",
    src: "images/Animation/Vendor.gif",
    mediaType: "gif",
    pixelArt: true
  },

  // ── Commission ──────────────────────────────────────────
  {
    id: 4,
    title: "Commission - Lancer Ronin Animation",
    category: ["Pixel Art", "Animation", "Commission"],
    order: {},
    desc: "Animation made using Spine2D",
    src: "images/Animation/LancerRonin.gif",
    mediaType: "gif",
    pixelArt: true
  },

  {
    id: 5,
    title: "Commission - Lancer Archer Animation",
    category: ["Pixel Art", "Animation", "Commission"],
    order: {},
    desc: "Animation made with Spine2D",
    src: "images/Animation/LancerArcher.gif",
    mediaType: "gif",
    pixelArt: true
  },

  {
    id: 6,
    title: "Commission - Lancer Witch Animation",
    category: ["Pixel Art", "Animation", "Commission"],
    order: {},
    desc: "Animation made using Spine2D",
    src: "images/Animation/LancerWitch.gif",
    mediaType: "gif",
    pixelArt: true
  },
  
  {
    id: 7,
    title: "Commission - Rock Altar Death Animation",
    category: ["Pixel Art", "Animation", "Commission"],
    order: { "all": 7, "Pixel Art": 3, "Animation": 6, "Commission": 4 },
    desc: "Animation made with Aseprite",
    src: "images/Animation/Altar_Death.gif",
    mediaType: "gif",
    pixelArt: true
  },
  {
    id: 8,
    title: "Commission - Barrier VFX Animation",
    category: ["Pixel Art", "Animation", "Commission"],
    order: {},
    desc: "Animation made with Aseprite",
    src: "images/Animation/Barrier.gif",
    mediaType: "gif",
    pixelArt: true
  },

  { 
    id: 9,
    title: "Commission - Spider Animation",
    category: ["Pixel Art", "Animation", "Commission"],
    order: {},
    desc: "",
    src: "images/Animation/Spider.gif",
    mediaType: "gif",
    pixelArt: true
  },

  {
    id: 10,
    title: "Commission - Skill Icons",
    category: ["Pixel Art", "UI", "Commission"],
    order: {},
    desc: "",
    src: "images/UI/Skill_Icons.webp",
    mediaType: "image",
    pixelArt: true
  },
  {
    id: 11,
    title: "Commission - UI Skill Upgrade Screen",
    category: ["Pixel Art", "UI", "Commission"],
    order: {},
    desc: "",
    src: "images/UI/Upgrade.webp",
    mediaType: "image",
    pixelArt: true
  },

  

  // ── UI ──────────────────────────────────────────────────
  {
    id: 12,
    title: "Gates of Yomi - Item Selection Screen",
    category: ["2D", "UI"],
    order: {},
    desc: "",
    src: "images/UI/UI1.webp",
    mediaType: "image"
  },
  {
    id: 13,
    title: "Gates of Yomi - Abilities Selection Screen",
    category: ["2D", "UI"],
    order: {},
    desc: "",
    src: "images/UI/UI2.webp",
    mediaType: "image"
  },

];


// ============================================================
//  PLACEHOLDER HELPER
//  Used only for placeholder tiles. Delete once all real images are in.
// ============================================================
function makePlaceholderSVG(width, height, bgColor, emoji) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      <text
        x="50%" y="54%"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="${Math.floor(height * 0.22)}"
        fill="rgba(255,255,255,0.1)"
        font-family="serif"
      >${emoji}</text>
    </svg>
  `.trim();
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
