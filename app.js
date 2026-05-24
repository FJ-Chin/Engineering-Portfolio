const skills = [
  "Rapid Prototyping",
  "Product Development",
  "Medical Technology",
  "AI-Assisted Workflows",
  "Additive Manufacturing",
  "Embedded Systems",
  "Fusion 360",
  "Sensor Systems",
  "Python",
  "Microfluidics",
  "Hardware Testing",
  "Technical Communication"
];

const projects = [
  {
    title: "Verbasense",
    category: "Software",
    cover: "assets/projects/verbasense/poster.jpg",
    summary: "An AI-assisted classroom feedback concept that listens for confusion-related language and gives teachers a simple visual cue on class understanding.",
    tags: ["AI", "ESP32", "Dart", "Classroom UX"],
    features: [
      "Explores how AI can help teachers detect confusion without relying only on hand-raising.",
      "Turns classroom sentiment into a simple color-based indicator that is easy to interpret during a lesson.",
      "Combines ESP32 hardware, software prototyping, and presentation materials into a student design project."
    ],
    gallery: [
      { src: "assets/projects/verbasense/poster.jpg", caption: "Poster overview of the concept, problem space, and proposed solution." },
      { src: "assets/projects/verbasense/presentation-1.jpg", caption: "Presentation slide explaining the classroom use case and system direction." },
      { src: "assets/projects/verbasense/presentation-2.jpg", caption: "Follow-up presentation slide showing concept flow and project framing." }
    ],
    videos: [
      { src: "assets/projects/verbasense/demo-compressed.mp4", label: "Compressed web demo video" }
    ],
    productViews: [],
    showcase: null,
    docs: []
  },
  {
    title: "Snoreless",
    category: "Product",
    cover: "assets/projects/snoreless/team-photo.png",
    summary: "A sleep-health product concept developed for TECH ARTSIC 2021, focused on reducing snoring-related disruption through a practical user-facing prototype.",
    tags: ["Health Tech", "Product", "Competition"],
    features: [
      "Frames snoring as a sleep-quality and wellness problem that affects both the user and people around them.",
      "Documents the concept through prototype imagery, a project poster, final slides, and award evidence.",
      "Recognized with Merit and Best Poster Award documentation."
    ],
    gallery: [
      { src: "assets/projects/snoreless/team-photo.png", caption: "Team photo documenting the competition/project group." }
    ],
    videos: [],
    productViews: [],
    spread: {
      title: "Poster, Prototype & Awards",
      rows: [
        [
          { kind: "image", src: "assets/previews/snoreless/snoreless-poster1.jpg", caption: "Project poster" },
          { kind: "image", src: "assets/projects/snoreless/prototype.jpg", caption: "ARTSIC prototype picture" }
        ],
        [
          { kind: "image", src: "assets/previews/snoreless/merit-best-poster-award1.jpg", caption: "Merit & Best Poster Award" },
          { kind: "pdf", src: "assets/documents/snoreless/final-slides.pdf#view=FitH", caption: "Final slides preview" }
        ]
      ]
    },
    showcase: null,
    docs: []
  },
  {
    title: "Solar Powered WBGT Monitor",
    category: "Hardware",
    cover: "assets/projects/wbgt/group-photo.jpg",
    summary: "A portable solar-assisted WBGT monitor built to support outdoor heat-stress awareness, with documented enclosure views and internal electronics.",
    tags: ["Solar", "Sensors", "Field Test"],
    features: [
      "Designed as a field-ready monitoring prototype for outdoor heat-stress conditions.",
      "Combines solar-assisted power, sensor integration, casing design, and practical mounting considerations.",
      "Documented with team photo, product views, internal wiring, and final report material."
    ],
    gallery: [
      { src: "assets/projects/wbgt/group-photo.jpg", caption: "Project team photo." }
    ],
    productViews: [
      { label: "Front", src: "assets/projects/wbgt/device-front.jpg", caption: "Front view of the complete WBGT monitor prototype." },
      { label: "Side", src: "assets/projects/wbgt/device-side.jpg", caption: "Side view showing casing thickness and product profile." },
      { label: "Back", src: "assets/projects/wbgt/device-back.jpg", caption: "Back view showing rear-side construction and mounting." },
      { label: "Internals", src: "assets/projects/wbgt/device-internals.jpg", caption: "Internal electronics and wiring layout." }
    ],
    videos: [],
    spread: null,
    showcase: null,
    docs: [
      { title: "Final Report Worksheet", type: "PDF", href: "assets/documents/wbgt/final-report.pdf", preview: true }
    ]
  },
  {
    title: "Kokoni",
    category: "Product",
    cover: "assets/projects/kokoni/kokoni-presentation.jpg",
    summary: "A KOKONI 3D internship project connected to mini paint mixer development and AI-powered image-to-object workflow exploration.",
    tags: ["Design", "Prototype", "Build"],
    features: [
      "Built around fast and accurate paint dispensing through a mini paint mixer concept.",
      "Explores how AI-enabled creative workflows can support image-to-object generation and rapid prototyping.",
      "Connected to TIIDE exposure to China’s startup and innovation ecosystem."
    ],
    gallery: [
      { src: "assets/projects/kokoni/kokoni-presentation.jpg", caption: "Primary Kokoni presentation visual." },
      { src: "assets/projects/kokoni/kokoni-presentation-2.jpg", caption: "Second presentation visual for follow-up explanation." },
      { src: "assets/previews/kokoni/moxin-slide21.jpg", caption: "Moxin deck slide 21 preview." },
      { src: "assets/previews/kokoni/moxin-slide25.jpg", caption: "Moxin deck slide 25 preview." },
      { src: "assets/previews/kokoni/moxin-slide26.jpg", caption: "Moxin deck slide 26 preview." }
    ],
    videos: [],
    productViews: [],
    showcase: null,
    docs: [
      { title: "Full Moxin document", type: "Large PDF", href: "../Kokoni/Moxin.pdf", note: "Local full-document link. For GitHub Pages, upload the 125 MB PDF to Drive, GitHub Releases, or a compressed PDF and update this link." }
    ]
  },
  {
    title: "CellWave Technologies",
    category: "Research",
    cover: "assets/projects/cellwave/company-photo.jpg",
    summary: "A medtech internship project involving cell culture context, cell sorting support, PDMS mould iteration, and cartridge alignment comparison.",
    tags: ["MedTech", "Microfluidics", "PDMS"],
    features: [
      "Documents lab-facing development work through cell culture, cell sorter, and PDMS process photos.",
      "Compares cartridge alignment runs through a program-style visual layout and side-by-side video evidence.",
      "Includes final SIP report material for deeper technical review."
    ],
    gallery: [
      { src: "assets/projects/cellwave/company-photo.jpg", caption: "Company/project context photo." },
      { src: "assets/projects/cellwave/cell-culture.jpg", caption: "Cell culture work supporting the medtech project." },
      { src: "assets/projects/cellwave/cell-sorter.jpg", caption: "Cell sorter setup or related lab equipment." },
      { src: "assets/projects/cellwave/old-pdms-cutting.jpg", caption: "Earlier PDMS cutting workflow." },
      { src: "assets/projects/cellwave/pdms-mould-1.jpg", caption: "New PDMS mould iteration 1." },
      { src: "assets/projects/cellwave/pdms-mould-2.jpg", caption: "New PDMS mould iteration 2." },
      { src: "assets/projects/cellwave/pdms-mould-3.jpg", caption: "New PDMS mould iteration 3." }
    ],
    videos: [],
    productViews: [],
    showcase: {
      title: "Cartridge Alignment Program",
      layout: "alignment",
      videos: [
        { src: "assets/projects/cellwave/videos/media1.mp4", label: "1st run" },
        { src: "assets/projects/cellwave/videos/media2.mp4", label: "2nd run" },
        { src: "assets/projects/cellwave/videos/media3-2x.mp4", label: "3rd run (2x)" }
      ]
    },
    docs: [
      { title: "SIP Final Report", type: "PDF", href: "assets/documents/cellwave/sip-final-report.pdf", preview: true }
    ]
  },
  {
    title: "LiftOff 3D Project",
    category: "Hardware",
    cover: "assets/projects/liftoff/group-photo-cropped.jpg",
    summary: "A 3D design and fabrication project showing team presentation, poster communication, and a working prototype video.",
    tags: ["3D Printing", "CAD", "Fabrication"],
    features: [
      "Shows hands-on fabrication and product communication through group and presentation photos.",
      "Pairs the project poster with a working demo video so the outcome is visible, not only described.",
      "Highlights practical making, presentation, and documentation skills."
    ],
    gallery: [
      { src: "assets/projects/liftoff/group-photo-cropped.jpg", caption: "Main group photo." },
      { src: "assets/projects/liftoff/presentation-photo.jpg", caption: "Presentation photo." }
    ],
    videos: [],
    productViews: [],
    showcase: {
      title: "Poster & Demo Video",
      layout: "poster-pair",
      image: { src: "assets/previews/liftoff/liftoff-poster1.jpg", caption: "LiftOff poster preview." },
      videos: [
        { src: "assets/projects/liftoff/working-video.mp4", label: "Working prototype video" }
      ],
      link: { href: "assets/previews/liftoff/liftoff-poster1.jpg", label: "Open poster image" }
    },
    docs: []
  }
];

const skillCloud = document.querySelector("#skill-cloud");
const projectGrid = document.querySelector("#project-grid");
const filters = document.querySelectorAll(".filter");
const topbar = document.querySelector(".topbar");
const modal = document.querySelector("#project-modal");
const closeButton = document.querySelector(".close-button");
const lightbox = document.querySelector("#media-lightbox");
const lightboxContent = document.querySelector("#lightbox-content");
const visualStage = document.querySelector("#visual-stage");
const storyPanels = document.querySelectorAll(".story-panel[data-hero-mode]");
let activeHeroMode = "about";
let activeHeroIndex = 0;
let heroTimer;
let heroIsRotating = false;
let modeIsTransitioning = false;

const heroModes = {
  about: {
    interval: 4200,
    render() {
      return `
        <section class="hero-mode about">
          <figure class="hero-profile-card">
            <img src="assets/profile/profile-hero.jpg" alt="Chin Fu Jie smiling outdoors with a nature background">
            <figcaption>
              <span>About Me</span>
            </figcaption>
          </figure>
          <div class="floating-note note-a">
            <span>Builder</span>
            <strong>I enjoy turning early ideas into testable physical and digital prototypes.</strong>
          </div>
          <div class="floating-note note-b">
            <span>Direction</span>
            <strong>Medtech, rapid prototyping, AI workflows, and product systems.</strong>
          </div>
          <div class="floating-note note-c">
            <span>Mindset</span>
            <strong>Make it real, test it early, explain it clearly.</strong>
          </div>
        </section>
      `;
    }
  },
  projects: {
    interval: 3200,
    items: [
      {
        title: "Verbasense",
        meta: "AI classroom feedback",
        image: "assets/projects/verbasense/poster.jpg",
        copy: "Detects confusion cues and translates them into a simple teaching signal."
      },
      {
        title: "Snoreless",
        meta: "Sleep-health concept",
        image: "assets/projects/snoreless/prototype.jpg",
        copy: "A health-tech product concept documented through ARTSIC materials."
      },
      {
        title: "Solar Powered WBGT",
        meta: "Outdoor sensing",
        image: "assets/projects/wbgt/device-front.jpg",
        copy: "A solar-assisted field prototype for heat-stress awareness."
      },
      {
        title: "LiftOff",
        meta: "3D fabrication",
        image: "assets/projects/liftoff/group-photo-cropped.jpg",
        copy: "A making-focused project with poster, presentation, and demo evidence."
      }
    ]
  },
  internships: {
    interval: 3400,
    items: [
      {
        title: "CellWave Technologies",
        meta: "Medtech internship",
        image: "assets/projects/cellwave/company-photo.jpg",
        copy: "Cell culture context, PDMS mould iteration, and cartridge alignment evidence."
      },
      {
        title: "KOKONI 3D",
        meta: "TIIDE internship",
        image: "assets/projects/kokoni/kokoni-presentation.jpg",
        copy: "Mini paint mixer development and AI-powered image-to-object workflow exploration."
      }
    ]
  }
};

function renderSkills() {
  skillCloud.innerHTML = skills.map((skill) => `<span>${skill}</span>`).join("");
}

function renderProjects(filter = "All") {
  const visibleProjects = filter === "All"
    ? projects
    : projects.filter((project) => project.category === filter);

  projectGrid.innerHTML = visibleProjects.map((project, index) => `
    <button class="project-card" type="button" data-index="${projects.indexOf(project)}">
      <span class="project-visual">
        <img src="${project.cover}" alt="${project.title} project cover" loading="lazy">
      </span>
      <span class="section-label">${project.category}</span>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <span class="project-meta">
        ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
      </span>
    </button>
  `).join("");

  if (visibleProjects.length === 0) {
    projectGrid.innerHTML = "<p>No projects in this category yet.</p>";
  }
}

function openProject(index) {
  const project = projects[index];
  modal.dataset.project = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  document.querySelector("#modal-category").textContent = project.category;
  document.querySelector("#modal-title").textContent = project.title;
  document.querySelector("#modal-description").textContent = project.summary;
  document.querySelector("#modal-tags").innerHTML = project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("");
  document.querySelector("#modal-features").innerHTML = project.features.map((feature) => `<li>${feature}</li>`).join("");
  document.querySelector("#modal-gallery-section").hidden = project.gallery.length === 0;
  document.querySelector("#modal-product-section").hidden = project.productViews.length === 0;
  document.querySelector("#modal-showcase-section").hidden = !project.showcase;
  document.querySelector("#modal-video-section").hidden = project.videos.length === 0;
  document.querySelector("#modal-doc-section").hidden = project.docs.length === 0;
  document.querySelector("#modal-gallery").innerHTML = project.gallery.map((item, itemIndex) => `
    <figure class="${itemIndex === 0 ? "featured-media" : ""}">
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <figcaption>${item.caption}</figcaption>
    </figure>
  `).join("");
  document.querySelector("#modal-product-viewer").innerHTML = project.productViews.length ? `
    <figure class="product-stage">
      <img src="${project.productViews[0].src}" alt="${project.productViews[0].caption}">
      <figcaption>${project.productViews[0].caption}</figcaption>
    </figure>
    <div class="view-strip" role="tablist" aria-label="${project.title} product views">
      ${project.productViews.map((view, viewIndex) => `
        <button type="button" class="${viewIndex === 0 ? "active" : ""}" data-view-index="${viewIndex}">
          <img src="${view.src}" alt="">
          <span>${view.label}</span>
        </button>
      `).join("")}
    </div>
  ` : "";
  document.querySelector("#modal-showcase-title").textContent = project.showcase?.title || "Featured Materials";
  document.querySelector("#modal-showcase").className = `showcase-layout ${project.showcase?.layout || ""}`;
  document.querySelector("#modal-showcase").innerHTML = renderShowcase(project.showcase);
  renderSpread(project.spread);
  document.querySelector("#modal-videos").innerHTML = project.videos.map((video) => `
    <figure class="video-frame">
      <video controls preload="metadata" src="${video.src}"></video>
      <figcaption>${video.label}</figcaption>
    </figure>
  `).join("");
  document.querySelector("#modal-docs").innerHTML = project.docs.map((doc) => {
    if (!doc.href) {
      return `<article class="doc-card"><strong>${doc.title}</strong><span>${doc.type}</span><p>${doc.note}</p></article>`;
    }

    const image = doc.image
      ? `<img class="doc-image ${doc.tall ? "tall-doc" : ""}" src="${doc.image}" alt="${doc.title} preview" loading="lazy">`
      : "";
    const preview = doc.preview
      ? `<iframe title="${doc.title} preview" src="${doc.href}#view=FitH"></iframe>`
      : "";

    return `
      <article class="doc-card">
        ${image}
        ${preview}
        <strong>${doc.title}</strong>
        <span>${doc.type}</span>
        ${doc.note ? `<p>${doc.note}</p>` : ""}
        <a href="${doc.href}" target="_blank" rel="noreferrer">Open document</a>
      </article>
    `;
  }).join("");
  modal.showModal();
  resetModalVideos();
  requestAnimationFrame(startAutoplayVideos);
}

function renderSpread(spread) {
  let spreadSection = document.querySelector("#modal-spread-section");
  if (!spreadSection) {
    spreadSection = document.createElement("div");
    spreadSection.className = "modal-section";
    spreadSection.id = "modal-spread-section";
    spreadSection.innerHTML = `<h3 id="modal-spread-title"></h3><div class="spread-layout" id="modal-spread"></div>`;
    document.querySelector("#modal-doc-section").before(spreadSection);
  }

  spreadSection.hidden = !spread;
  if (!spread) return;

  document.querySelector("#modal-spread-title").textContent = spread.title;
  document.querySelector("#modal-spread").innerHTML = spread.rows.map((row) => `
    <div class="spread-row">
      ${row.map((item) => `
        <figure class="spread-card">
          ${item.kind === "pdf"
            ? `<iframe title="${item.caption}" src="${item.src}"></iframe>`
            : `<button class="expand-media media-button" type="button" data-kind="image" data-src="${item.src}" data-caption="${item.caption}">
                <img src="${item.src}" alt="${item.caption}" loading="lazy">
              </button>`}
          <figcaption>${item.caption}</figcaption>
        </figure>
      `).join("")}
    </div>
  `).join("");
}

function renderShowcase(showcase) {
  if (!showcase) return "";

  if (showcase.layout === "alignment") {
    return `
      ${showcase.videos.map((video) => `
        <figure class="alignment-video">
          <video autoplay muted playsinline preload="metadata" src="${video.src}"></video>
          <figcaption>${video.label}</figcaption>
        </figure>
      `).join("")}
    `;
  }

  if (showcase.layout === "comparison") {
    return `
      <button class="comparison-tile expand-media" type="button" data-kind="image" data-src="${showcase.image.src}" data-caption="${showcase.image.caption}">
        <img src="${showcase.image.src}" alt="${showcase.image.caption}" loading="lazy">
        <span>${showcase.image.caption}</span>
      </button>
      ${showcase.videos.map((video) => `
        <button class="comparison-tile expand-media" type="button" data-kind="video" data-src="${video.src}" data-caption="${video.label}">
          <video muted playsinline preload="metadata" src="${video.src}"></video>
          <span>${video.label}</span>
        </button>
      `).join("")}
    `;
  }

  if (showcase.layout === "poster-pair") {
    return `
      <figure class="showcase-image">
        <img src="${showcase.image.src}" alt="${showcase.image.caption}" loading="lazy">
        <figcaption>
          ${showcase.image.caption}
          ${showcase.link ? `<a href="${showcase.link.href}" target="_blank" rel="noreferrer">${showcase.link.label}</a>` : ""}
        </figcaption>
      </figure>
      <div class="showcase-videos">
        ${showcase.videos.map((video) => `
          <figure class="video-frame">
            <video controls preload="metadata" src="${video.src}"></video>
            <figcaption>${video.label}</figcaption>
          </figure>
        `).join("")}
      </div>
    `;
  }

  return `
    <figure class="showcase-image">
      <button class="expand-media media-button" type="button" data-kind="image" data-src="${showcase.image.src}" data-caption="${showcase.image.caption}">
        <img src="${showcase.image.src}" alt="${showcase.image.caption}" loading="lazy">
      </button>
      <figcaption>
        ${showcase.image.caption}
        ${showcase.link ? `<a href="${showcase.link.href}" target="_blank" rel="noreferrer">${showcase.link.label}</a>` : ""}
      </figcaption>
    </figure>
    <div class="showcase-videos">
      ${showcase.videos.map((video) => `
        <figure class="video-frame">
          <video controls preload="metadata" src="${video.src}"></video>
          <figcaption>${video.label}</figcaption>
        </figure>
      `).join("")}
    </div>
  `;
}

function resetModalVideos() {
  document.querySelectorAll("#project-modal video").forEach((video) => {
    video.pause();
    video.currentTime = 0;
    video.load();
  });
}

function startAutoplayVideos() {
  document.querySelectorAll("#project-modal video[autoplay]").forEach((video) => {
    video.currentTime = 0;
    video.play().catch(() => {});
  });
}

document.querySelector("#modal-product-viewer").addEventListener("click", (event) => {
  const button = event.target.closest("[data-view-index]");
  if (!button) return;
  const project = projects.find((item) => item.title === document.querySelector("#modal-title").textContent);
  const view = project.productViews[Number(button.dataset.viewIndex)];
  const stage = document.querySelector(".product-stage");
  stage.querySelector("img").src = view.src;
  stage.querySelector("img").alt = view.caption;
  stage.querySelector("figcaption").textContent = view.caption;
  document.querySelectorAll(".view-strip button").forEach((viewButton) => viewButton.classList.remove("active"));
  button.classList.add("active");
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((filterButton) => filterButton.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

projectGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".project-card");
  if (card) openProject(Number(card.dataset.index));
});

closeButton.addEventListener("click", () => modal.close());

modal.addEventListener("close", () => {
  resetModalVideos();
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

document.querySelector("#modal-showcase").addEventListener("click", (event) => {
  const button = event.target.closest(".expand-media");
  if (!button) return;
  const kind = button.dataset.kind;
  const src = button.dataset.src;
  const caption = button.dataset.caption;

  lightboxContent.innerHTML = kind === "video"
    ? `<video controls autoplay src="${src}"></video><p>${caption}</p>`
    : `<img src="${src}" alt="${caption}"><p>${caption}</p>`;
  lightbox.showModal();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("#modal-spread .expand-media");
  if (!button) return;
  lightboxContent.innerHTML = `<img src="${button.dataset.src}" alt="${button.dataset.caption}"><p>${button.dataset.caption}</p>`;
  lightbox.showModal();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target.closest(".close-button")) {
    lightbox.close();
  }
});

lightbox.addEventListener("close", () => {
  lightboxContent.innerHTML = "";
});

window.addEventListener("scroll", () => {
  topbar.dataset.elevated = String(window.scrollY > 12);
}, { passive: true });

function renderHeroVisual() {
  const mode = heroModes[activeHeroMode];
  if (!mode.items) {
    visualStage.innerHTML = mode.render();
    return;
  }

  visualStage.innerHTML = `
    <section class="hero-mode">
      <div class="rotary-stage ${activeHeroMode}">
        ${mode.items.map((item, index) => `
          <article class="rotary-card ${getRotaryPosition(index, activeHeroIndex, mode.items.length)}" data-hero-card="${index}">
            <img src="${item.image}" alt="${item.title}">
            <div>
              <span>${item.meta}</span>
              <strong>${item.title}</strong>
              <p>${item.copy}</p>
            </div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function updateRotaryPositions() {
  const mode = heroModes[activeHeroMode];
  if (!mode.items) return;
  document.querySelectorAll(".rotary-card").forEach((card) => {
    const index = Number(card.dataset.heroCard);
    card.className = `rotary-card ${getRotaryPosition(index, activeHeroIndex, mode.items.length)}`;
  });
}

function rotateHeroTo(nextIndex) {
  const mode = heroModes[activeHeroMode];
  if (!mode.items || heroIsRotating || nextIndex === activeHeroIndex) return;

  heroIsRotating = true;
  activeHeroIndex = nextIndex;
  updateRotaryPositions();

  window.setTimeout(() => {
    heroIsRotating = false;
  }, 940);
}

function getRotaryPosition(index, activeIndex, total) {
  if (index === activeIndex) return "is-active";
  const nextIndex = (activeIndex + 1) % total;
  const prevIndex = (activeIndex - 1 + total) % total;
  if (index === nextIndex) return "is-next";
  if (index === prevIndex) return "is-prev";
  return "is-back";
}

function setHeroMode(modeName) {
  if (modeName === activeHeroMode || modeIsTransitioning) return;
  modeIsTransitioning = true;
  visualStage.classList.add("mode-exit");

  window.setTimeout(() => {
    activeHeroMode = modeName;
    activeHeroIndex = 0;
    renderHeroVisual();
    restartHeroTimer();
    visualStage.classList.remove("mode-exit");
    visualStage.classList.add("mode-enter");

    window.setTimeout(() => {
      visualStage.classList.remove("mode-enter");
      modeIsTransitioning = false;
    }, 520);
  }, 260);
}

function setHeroModeImmediate(modeName) {
  activeHeroMode = modeName;
  activeHeroIndex = 0;
  renderHeroVisual();
  restartHeroTimer();
}

function restartHeroTimer() {
  clearInterval(heroTimer);
  const mode = heroModes[activeHeroMode];
  if (!mode.items) return;
  heroTimer = setInterval(() => {
    rotateHeroTo((activeHeroIndex + 1) % mode.items.length);
  }, mode.interval);
}

function syncHeroModeToScroll() {
  if (!storyPanels.length || modeIsTransitioning) return;

  const viewportFocus = window.innerHeight * 0.42;
  let closestPanel = storyPanels[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  storyPanels.forEach((panel) => {
    const rect = panel.getBoundingClientRect();
    const panelCenter = rect.top + rect.height * 0.42;
    const distance = Math.abs(panelCenter - viewportFocus);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestPanel = panel;
    }
  });

  if (closestPanel.dataset.heroMode !== activeHeroMode) {
    setHeroMode(closestPanel.dataset.heroMode);
  }
}

if (storyPanels.length) {
  window.addEventListener("scroll", syncHeroModeToScroll, { passive: true });
  window.addEventListener("resize", syncHeroModeToScroll);
  syncHeroModeToScroll();
}

visualStage.addEventListener("click", (event) => {
  const card = event.target.closest("[data-hero-card]");
  if (!card) return;
  rotateHeroTo(Number(card.dataset.heroCard));
  restartHeroTimer();
});

setHeroModeImmediate("about");
renderSkills();
renderProjects();
