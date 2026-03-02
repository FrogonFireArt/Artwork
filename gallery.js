// ============================================================
//  gallery.js — Portfolio Logic
//  Handles the gallery, filters, lightbox, and UI interactions.
//  You don't need to edit this file.
// ============================================================


// ── STATE ────────────────────────────────────────────────────
let currentCategory = "all";
let currentLightboxIndex = 0;


// ── FILTERING ────────────────────────────────────────────────

// Returns the subset of ARTWORKS that match the active category tab,
// sorted by the artwork's  order  field for that category.
//
// How ordering works:
//   - Each artwork can have a single order number:   order: 1
//   - Or per-category orders:   order: { "all": 2, "2D": 1, "Animation": 3 }
//   - Artworks without an order value fall to the end, sorted by id.
function getFilteredArtworks() {
  const filtered = currentCategory === "all"
    ? [...ARTWORKS]
    : ARTWORKS.filter(artwork => {
        const categories = Array.isArray(artwork.category)
          ? artwork.category
          : [artwork.category];
        return categories.includes(currentCategory);
      });

  return filtered.sort((a, b) => {
    const orderA = getOrderValue(a, currentCategory);
    const orderB = getOrderValue(b, currentCategory);
    if (orderA !== orderB) return orderA - orderB;
    return a.id - b.id; // fallback: sort by id when order is equal
  });
}

// Reads the order value for a specific category from an artwork.
// Supports both  order: 1  and  order: { "all": 1, "2D": 2 }
function getOrderValue(artwork, category) {
  if (artwork.order === undefined) return Infinity; // no order = goes last
  if (typeof artwork.order === "number") return artwork.order;
  // Per-category object — try the specific category, then "all", then Infinity
  return artwork.order[category] ?? artwork.order["all"] ?? Infinity;
}

// Called when a filter tab is clicked
function filterCat(button) {
  const gallery = document.getElementById("gallery");

  // Fade the gallery out, swap content, then fade back in
  gallery.classList.add("is-fading");
  setTimeout(() => {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentCategory = button.dataset.cat;
    renderGallery();
    gallery.classList.remove("is-fading");
    // Scroll back to the top of the content area when switching categories
    document.getElementById("page-content").scrollTo({ top: 0, behavior: "smooth" });
  }, 220);
}


// ── GALLERY RENDERING ────────────────────────────────────────

function renderGallery() {
  const gallery  = document.getElementById("gallery");
  const empty    = document.getElementById("emptyState");
  const filtered = getFilteredArtworks();

  empty.style.display = filtered.length === 0 ? "block" : "none";
  gallery.innerHTML = "";
  updateFilterCounts();

  filtered.forEach((artwork, index) => {
    const card = buildArtworkCard(artwork, index);
    gallery.appendChild(card);
  });
}

// Builds and returns a single artwork card element
function buildArtworkCard(artwork, index) {
  const card = document.createElement("div");
  card.className = "artwork-card";
  card.style.animationDelay = (index * 0.035) + "s";

  const isPixelArt  = artwork.pixelArt === true;
  const badgeLabel  = getBadgeLabel(artwork.mediaType);
  const mediaHTML   = buildCardMediaHTML(artwork, isPixelArt, badgeLabel);

  card.innerHTML = `
    ${mediaHTML}
    <div class="card-info">
      <p class="card-title">${artwork.title}</p>
    </div>
  `;

  card.addEventListener("click", () => openLightbox(index));
  return card;
}

// Returns "Image", "GIF", or "Video" for the badge
function getBadgeLabel(mediaType) {
  if (mediaType === "video") return "Video";
  if (mediaType === "gif")   return "GIF";
  return "Image";
}

// Returns the HTML string for the media portion of a card
function buildCardMediaHTML(artwork, isPixelArt, badgeLabel) {
  const pixelClass = isPixelArt ? " card-media--pixel-art" : "";
  const badge      = `<span class="card-type-badge">${badgeLabel}</span>`;

  if (artwork.mediaType === "video") {
    return `
      <div class="card-media-wrap">
        ${badge}
        <video class="card-media" src="${artwork.src}" autoplay loop muted playsinline></video>
      </div>
    `;
  }

  if (isPixelArt) {
    return `
      <div class="card-media-wrap">
        ${badge}
        <div class="card-media${pixelClass}">
          <img src="${artwork.src}" alt="${artwork.title}">
        </div>
      </div>
    `;
  }

  return `
    <div class="card-media-wrap">
      <div class="card-media">
        ${badge}
        <img src="${artwork.src}" alt="${artwork.title}">
      </div>
    </div>
  `;
}


// ── FILTER COUNTS ────────────────────────────────────────────

// Updates the number shown in each filter tab pill
function updateFilterCounts() {
  // Total count on the "All" tab
  const allCountEl = document.getElementById("count-all");
  if (allCountEl) allCountEl.textContent = ARTWORKS.length;

  // Count per category tab
  document.querySelectorAll(".filter-btn[data-cat]").forEach(button => {
    const cat = button.dataset.cat;
    if (cat === "all") return;

    const countEl = document.getElementById("count-" + cat);
    if (!countEl) return;

    const count = ARTWORKS.filter(artwork => {
      const categories = Array.isArray(artwork.category)
        ? artwork.category
        : [artwork.category];
      return categories.includes(cat);
    }).length;

    countEl.textContent = count;
  });
}


// ── LIGHTBOX ─────────────────────────────────────────────────

function openLightbox(index) {
  currentLightboxIndex = index;
  const filtered = getFilteredArtworks();

  populateLightbox(filtered[index], filtered);

  document.getElementById("lightbox").classList.add("is-open");
  document.getElementById("page-content").classList.add("is-blurred");
}

// Fills the lightbox with the artwork's media and info
function populateLightbox(artwork, filtered) {
  const mediaWrap = document.getElementById("lbMedia");

  // Crossfade to the new media
  mediaWrap.style.opacity    = "0";
  mediaWrap.style.transition = "opacity 0.18s ease";

  setTimeout(() => {
    mediaWrap.innerHTML = buildLightboxMediaHTML(artwork);
    mediaWrap.style.opacity = "1";
  }, 180);

  // Update text fields
  document.getElementById("lbTitle").textContent = artwork.title;
  document.getElementById("lbDesc").textContent  = artwork.desc;

  const categories = Array.isArray(artwork.category)
    ? artwork.category
    : [artwork.category];
  document.getElementById("lbCat").textContent = categories.join("  ·  ");

  // Show or hide prev/next arrows
  const prevBtn = document.querySelector(".lightbox-nav--prev");
  const nextBtn = document.querySelector(".lightbox-nav--next");
  prevBtn.style.visibility = currentLightboxIndex > 0 ? "visible" : "hidden";
  nextBtn.style.visibility = currentLightboxIndex < filtered.length - 1 ? "visible" : "hidden";
}

// Returns the HTML for the media element inside the lightbox
function buildLightboxMediaHTML(artwork) {
  if (artwork.mediaType === "video") {
    return `<video class="lightbox-media" src="${artwork.src}" autoplay loop muted playsinline controls></video>`;
  }
  const pixelClass = artwork.pixelArt === true ? " lightbox-media--pixel-art" : "";
  return `<img class="lightbox-media${pixelClass}" src="${artwork.src}" alt="${artwork.title}">`;
}

// Navigate to the previous or next artwork inside the lightbox
function navigateLightbox(event, direction) {
  event.stopPropagation();
  const filtered = getFilteredArtworks();
  const nextIndex = currentLightboxIndex + direction;
  if (nextIndex < 0 || nextIndex >= filtered.length) return;
  currentLightboxIndex = nextIndex;
  populateLightbox(filtered[currentLightboxIndex], filtered);
}

// Closes the lightbox — only if clicking the backdrop or the × button
function closeLightbox(event) {
  const lightbox = document.getElementById("lightbox");
  const clickedBackdrop   = event && event.target === lightbox;
  const clickedCloseBtn   = event && event.target.classList.contains("lightbox-close");
  const calledDirectly    = !event;

  if (!clickedBackdrop && !clickedCloseBtn && !calledDirectly) return;

  lightbox.classList.remove("is-open");
  document.getElementById("page-content").classList.remove("is-blurred");

  // Clear media after the fade-out transition finishes
  setTimeout(() => {
    document.getElementById("lbMedia").innerHTML = "";
  }, 380);
}

// Keyboard navigation
document.addEventListener("keydown", event => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape")     closeLightbox(null);
  if (event.key === "ArrowRight") navigateLightbox(event,  1);
  if (event.key === "ArrowLeft")  navigateLightbox(event, -1);
});


// ── EMAIL COPY ───────────────────────────────────────────────

function copyEmail(button) {
  const email = button.dataset.email;
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById("copyToast");
    toast.classList.add("is-visible");
    setTimeout(() => toast.classList.remove("is-visible"), 2200);
  });
}


// ── INIT ─────────────────────────────────────────────────────
renderGallery();
