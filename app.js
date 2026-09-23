const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const compactLayout = window.matchMedia('(max-width: 900px)');
const phoneLayout = window.matchMedia('(max-width: 620px)');
const projects = portfolio.projects;
const modal = document.querySelector('#project-modal');
const lightbox = document.querySelector('#media-lightbox');
const carousels = [];
const carouselInterval = 3450;
let mediaCleanup = () => {};
let dialogOwnsHistory = false;

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}
function icon(name) { return `<i data-lucide="${name}" aria-hidden="true"></i>`; }
function refreshIcons() { window.lucide?.createIcons({ attrs: { 'aria-hidden': 'true' } }); }
function projectURL(id) { return `project.html?project=${encodeURIComponent(id)}`; }
function getProject(id) { return projects.find(project => project.id === id); }
function cover(project, eager = false) {
  return `<span class="cover fit-${project.coverFit} tone-${project.tone}"><img src="assets/thumbnails/${project.id}-720.webp" srcset="assets/thumbnails/${project.id}-720.webp 720w, assets/thumbnails/${project.id}-1440.webp 1440w" sizes="(max-width: 620px) 85vw, (max-width: 900px) 50vw, 350px" alt="${escapeHTML(project.shortTitle)}" width="720" height="450" draggable="false" loading="${eager ? 'eager' : 'lazy'}"></span>`;
}

function renderProjects(filter = 'All') {
  const grid = document.querySelector('#project-grid');
  if (!grid) return;
  const visible = projects.filter(project => filter === 'All' || project.filters.includes(filter));
  grid.innerHTML = visible.map(project => `
    <a class="project-card" href="${projectURL(project.id)}" data-open-project="${project.id}">
      ${cover(project)}
      <div class="project-card-body">
        <span class="eyebrow">${escapeHTML(project.category)}</span>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.summary)}</p>
        <p class="project-role">${escapeHTML(project.role)}</p>
        <div class="card-bottom"><span>${escapeHTML(project.id === 'snoreless' ? project.outcome : project.status)}</span>${icon('arrow-up-right')}</div>
      </div>
    </a>`).join('');
  document.querySelector('#project-count').textContent = `${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`;
  refreshIcons();
}

function renderHome() {
  const skills = document.querySelector('#skill-cloud');
  if (!skills) return;
  skills.innerHTML = portfolio.skills.map(skill => `<span>${escapeHTML(skill)}</span>`).join('');
  document.querySelector('#experience-list').innerHTML = portfolio.experience.map((item, index) => `
    <article class="experience-entry"><div class="experience-entry-clip"><div class="experience-entry-content${item.project ? ' has-preview' : ''}">${internshipPreview(item, index)}<p class="experience-date">${escapeHTML(item.date)}</p>
      <h3><button type="button" data-open-internship="${index}" aria-expanded="false" aria-controls="internship-content">${escapeHTML(item.organisation)} ${icon('chevron-down')}</button></h3><p class="role">${escapeHTML(item.role)}</p>
      <p>${escapeHTML(item.text)}</p>
    </div></div></article>`).join('');
  document.querySelector('#leadership-list').innerHTML = portfolio.leadership.map((item, index) => `
    <article class="leadership-entry">${icon(['network', 'heart-handshake', 'users'][index] || 'users')}<p class="role">${escapeHTML(item.role)}</p><h3>${escapeHTML(item.organisation)}</h3><p>${escapeHTML(item.context)}</p></article>`).join('');
  const recognition = [...portfolio.recognition].sort((a, b) => Number(a.kind === 'Project funding') - Number(b.kind === 'Project funding'));
  document.querySelector('#recognition-list').innerHTML = recognition.map(item => {
    const tag = item.project ? 'a' : 'article';
    return `<${tag} class="recognition-row${item.kind === 'Project funding' ? ' recognition-funding' : ''}" ${item.project ? `href="${projectURL(item.project)}" data-open-project="${item.project}"` : ''}>
      ${icon(item.kind === 'Scholarship' ? 'graduation-cap' : item.kind === 'Project funding' ? 'sprout' : 'award')}
      <div><span class="eyebrow">${escapeHTML(item.kind)}</span><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.context)}</p></div>
      ${item.project ? icon('arrow-up-right') : '<span></span>'}</${tag}>`;
  }).join('');
  renderProjects();
  document.querySelectorAll('[data-carousel]').forEach(element => {
    const ids = element.dataset.carousel === 'projects' ? ['verbasense', 'snoreless', 'wbgt', 'liftoff'] : ['cellwave', 'kokoni'];
    carousels.push(element.dataset.carousel === 'projects'
      ? setupFocusGlide(element, ids.map(getProject))
      : setupCarousel(element, ids.map(getProject)));
  });
  setupInternships();
}

function internshipPreview(item, index) {
  const project = getProject(item.project);
  if (!project) return '';
  return `<button class="internship-preview" type="button" data-open-internship="${index}" aria-label="Explore ${escapeHTML(item.organisation)}" aria-expanded="false" aria-controls="internship-content" style="--preview-delay:${index * -3}s" hidden>
    ${cover(project)}<img class="preview-photo" src="${project.gallery[0].src}" alt="${escapeHTML(project.gallery[0].caption)}" loading="lazy" width="216" height="168">
  </button>`;
}

function setupCarousel(element, items) {
  function positionFor(index, focus) {
    if (index === focus) return 'is-active';
    if (items.length === 2) return index > focus ? 'is-next' : 'is-prev';
    if (index === (focus + 1) % items.length) return 'is-next';
    if (index === (focus - 1 + items.length) % items.length) return 'is-prev';
    return 'is-back';
  }
  element.style.setProperty('--carousel-interval', `${carouselInterval}ms`);
  element.innerHTML = `<div class="rotary-track">${items.map((project, index) => `
    <a class="rotary-card ${positionFor(index, 0)}" href="${projectURL(project.id)}" draggable="false" data-internship-project="${project.id}" data-slide="${index}" aria-label="${escapeHTML(project.title)}" aria-expanded="false" aria-controls="internship-content">
      ${cover(project)}<span class="rotary-open" aria-hidden="true">${icon('arrow-up-right')}</span><span class="rotary-copy"><span class="eyebrow">${escapeHTML(project.category)}</span><strong>${escapeHTML(project.shortTitle)}</strong><p>${escapeHTML(project.summary)}</p></span>
    </a>`).join('')}</div>
    <div class="carousel-controls">
      <button class="icon-button" type="button" data-carousel-prev aria-label="Previous project" title="Previous project">${icon('arrow-left')}</button>
      <div class="carousel-dots">${items.map((item, index) => `<button class="carousel-dot" type="button" data-carousel-dot="${index}" aria-label="Show ${escapeHTML(item.shortTitle)}" aria-current="${index === 0}"></button>`).join('')}</div>
      <button class="icon-button" type="button" data-carousel-next aria-label="Next project" title="Next project">${icon('arrow-right')}</button>
      <button class="icon-button" type="button" data-carousel-pause aria-label="Pause automatic rotation" title="Pause automatic rotation" aria-pressed="false">${icon('pause')}</button>
      <span class="carousel-status" aria-hidden="true">01 / ${String(items.length).padStart(2, '0')}</span>
    </div><p class="sr-only" data-carousel-announcement role="status"></p>`;
  const track = element.querySelector('.rotary-track');
  const cards = [...track.children];
  const pause = element.querySelector('[data-carousel-pause]');
  let active = 0;
  let userPaused = false;
  let inView = false;
  let focused = false;
  let touching = false;
  let explicitPlay = false;
  let timer;
  let scrollTimer;
  let pointerStart = null;
  let suppressClick = false;
  let suppressTimer;
  let layerTimer;
  let fadeAnimations = [];

  function setLayers() {
    cards.forEach((card, index) => { card.style.zIndex = index === active ? '2' : '1'; });
  }
  function clearHandoff() {
    clearTimeout(layerTimer);
    fadeAnimations.forEach(animation => animation.cancel());
    fadeAnimations = [];
  }

  function refreshTimer() {
    clearTimeout(timer);
    const canRotate = inView && !element.closest('.experience-section')?.classList.contains('has-open-internship') && !userPaused && (!focused || explicitPlay) && !touching && !reducedMotion.matches && !document.hidden && !modal?.open;
    element.dataset.rotating = String(canRotate);
    if (canRotate) {
      const dot = element.querySelector('.carousel-dot[aria-current="true"]');
      dot.getAnimations({ subtree: true }).filter(animation => animation.animationName === 'carousel-progress').forEach(animation => { animation.currentTime = 0; });
      timer = setTimeout(() => { go(active + 1, false); }, carouselInterval);
    }
  }
  function paint(manual = false) {
    cards.forEach((card, index) => {
      ['is-active', 'is-next', 'is-prev', 'is-back'].forEach(position => card.classList.toggle(position, position === positionFor(index, active)));
      card.tabIndex = compactLayout.matches || index === active ? 0 : -1;
    });
    element.querySelectorAll('[data-carousel-dot]').forEach(dot => dot.setAttribute('aria-current', String(Number(dot.dataset.carouselDot) === active)));
    element.querySelector('.carousel-status').textContent = `${String(active + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    if (manual) element.querySelector('[data-carousel-announcement]').textContent = `${items[active].title}, ${active + 1} of ${items.length}`;
    refreshTimer();
  }
  function go(index, manual = true) {
    const next = (index + items.length) % items.length;
    const changed = next !== active;
    if (!changed && !compactLayout.matches) { refreshTimer(); return; }
    const fade = changed && !compactLayout.matches && !reducedMotion.matches;
    const opacities = fade ? cards.map(card => Number(getComputedStyle(card).opacity)) : [];
    clearHandoff();
    active = next;
    if (compactLayout.matches) track.scrollTo({ left: slideOffset(active), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    paint(manual);
    if (!fade) { setLayers(); return; }
    // Exchange whole-card layers only after the departing card has faded from the crossing.
    fadeAnimations = cards.map((card, cardIndex) => card.animate(cardIndex === active
      ? [{ opacity: opacities[cardIndex] }, { opacity: 1 }]
      : [{ opacity: opacities[cardIndex] }, { opacity: .06, offset: .3 }, { opacity: .06, offset: .48 }, { opacity: .48 }],
    { duration: 1500, easing: 'ease-in-out' }));
    layerTimer = setTimeout(setLayers, 650);
  }
  function slideOffset(index) {
    return Math.min(cards[index].offsetLeft, Math.max(0, track.scrollWidth - track.clientWidth));
  }
  function syncScroll() {
    if (!compactLayout.matches || !track.clientWidth) return;
    const nearest = cards.reduce((best, card, index) => Math.abs(slideOffset(index) - track.scrollLeft) < Math.abs(slideOffset(best) - track.scrollLeft) ? index : best, 0);
    if (nearest !== active) { active = nearest; paint(); }
  }
  element.addEventListener('click', event => {
    if (suppressClick) {
      suppressClick = false;
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const dot = event.target.closest('[data-carousel-dot]');
    if (dot) go(Number(dot.dataset.carouselDot));
    if (event.target.closest('[data-carousel-next]')) go(active + 1);
    if (event.target.closest('[data-carousel-prev]')) go(active - 1);
    if (event.target.closest('[data-carousel-pause]')) {
      userPaused = !userPaused;
      explicitPlay = !userPaused;
      pause.innerHTML = icon(userPaused ? 'play' : 'pause');
      const label = userPaused ? 'Resume automatic rotation' : 'Pause automatic rotation';
      pause.setAttribute('aria-label', label);
      pause.setAttribute('title', label);
      pause.setAttribute('aria-pressed', String(userPaused));
      refreshIcons();
      refreshTimer();
    }
  });
  element.addEventListener('keydown', event => {
    focused = true;
    explicitPlay = false;
    refreshTimer();
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    go(active + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(syncScroll, 160);
  }, { passive: true });
  element.addEventListener('pointerdown', () => { focused = false; refreshTimer(); });
  track.addEventListener('pointerdown', event => {
    touching = true;
    pointerStart = { x: event.clientX, y: event.clientY };
    refreshTimer();
  });
  const releasePointer = event => {
    if (!touching) return;
    touching = false;
    if (pointerStart && !compactLayout.matches && event.type !== 'pointercancel') {
      const dx = event.clientX - pointerStart.x;
      const dy = event.clientY - pointerStart.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        suppressClick = true;
        clearTimeout(suppressTimer);
        suppressTimer = setTimeout(() => { suppressClick = false; }, 400);
        go(active + (dx < 0 ? 1 : -1));
      }
    }
    pointerStart = null;
    refreshTimer();
  };
  window.addEventListener('pointerup', releasePointer);
  window.addEventListener('pointercancel', releasePointer);
  element.addEventListener('focusin', event => { focused = event.target.matches(':focus-visible'); refreshTimer(); });
  element.addEventListener('focusout', event => {
    const staysInside = element.contains(event.relatedTarget);
    focused = staysInside && event.relatedTarget?.matches(':focus-visible');
    if (!staysInside) explicitPlay = false;
    refreshTimer();
  });
  const observer = new IntersectionObserver(entries => { inView = entries[0].intersectionRatio >= .35; refreshTimer(); }, { threshold: [0, .35, .75] });
  observer.observe(track);
  const onPreferenceChange = () => {
    clearHandoff();
    setLayers();
    pause.disabled = reducedMotion.matches;
    pause.title = reducedMotion.matches ? 'Automatic rotation disabled by reduced motion' : (userPaused ? 'Resume automatic rotation' : 'Pause automatic rotation');
    pause.setAttribute('aria-label', pause.title);
    track.scrollLeft = compactLayout.matches ? slideOffset(active) : 0;
    paint();
  };
  new ResizeObserver(() => {
    if (compactLayout.matches && !touching && track.clientWidth) track.scrollTo({left: slideOffset(active), behavior: 'instant'});
  }).observe(track);
  compactLayout.addEventListener('change', onPreferenceChange);
  reducedMotion.addEventListener('change', onPreferenceChange);
  document.addEventListener('visibilitychange', refreshTimer);
  onPreferenceChange();
  return { refresh: refreshTimer };
}

function setupFocusGlide(element, items) {
  const repeatedItems = Array.from({ length: items.length * 3 }, (_, index) => items[index % items.length]);
  element.innerHTML = `<div class="glide-stage">
    <div class="glide-belt">${repeatedItems.map((project, index) => `
      <a class="glide-post" href="${projectURL(project.id)}" data-glide-project="${index}" draggable="false" aria-label="Explore ${escapeHTML(project.title)}" aria-expanded="false" aria-controls="glide-details">
        ${cover(project)}
        <span class="glide-copy"><span class="glide-meta"><span class="eyebrow">${escapeHTML(project.category)}</span><span class="glide-open" aria-hidden="true">${icon('arrow-up-right')}</span></span><strong>${escapeHTML(project.shortTitle)}</strong><p>${escapeHTML(project.summary)}</p></span>
      </a>`).join('')}</div>
    <section class="glide-details" id="glide-details" aria-labelledby="glide-title" hidden>
      <button class="icon-button glide-close" type="button" aria-label="Collapse project" title="Collapse project">${icon('x')}</button>
      <div class="glide-story"><div class="glide-hero-slot" aria-hidden="true"></div>
        <article class="glide-article"><header class="glide-heading"><span class="eyebrow" data-glide-category></span><h3 id="glide-title"></h3></header>
          <div class="glide-body"><p data-glide-summary></p><p class="glide-approach"></p>
          <dl><div><dt>My focus</dt><dd data-glide-role></dd></div><div><dt>Outcome</dt><dd data-glide-outcome></dd></div></dl>
          <a class="text-link" data-glide-full>Full case study ${icon('arrow-up-right')}</a></div>
        </article>
      </div>
    </section>
  </div>
  <div class="glide-controls">
    <button class="icon-button" type="button" data-glide-prev aria-label="Previous project" title="Previous project">${icon('arrow-left')}</button>
    <div class="glide-dots">${items.map((project, index) => `<button class="glide-dot" type="button" data-glide-dot="${index}" aria-label="Show ${escapeHTML(project.shortTitle)}" aria-current="${index === 0}"></button>`).join('')}</div>
    <button class="icon-button" type="button" data-glide-next aria-label="Next project" title="Next project">${icon('arrow-right')}</button>
    <button class="icon-button" type="button" data-glide-pause aria-label="Pause automatic rotation" title="Pause automatic rotation" aria-pressed="false">${icon('pause')}</button>
    <span class="glide-count" aria-hidden="true">01 / 04</span>
  </div><p class="sr-only" data-glide-status role="status"></p>`;
  const stage = element.querySelector('.glide-stage');
  const belt = element.querySelector('.glide-belt');
  const cards = [...element.querySelectorAll('.glide-post')];
  const dots = [...element.querySelectorAll('.glide-dot')];
  const details = element.querySelector('.glide-details');
  const controls = element.querySelector('.glide-controls');
  const pause = element.querySelector('[data-glide-pause]');
  const close = element.querySelector('.glide-close');
  const status = element.querySelector('[data-glide-status]');
  const heroSlot = element.querySelector('.glide-hero-slot');
  const mod = (value, length = items.length) => ((value % length) + length) % length;
  let position = 0, selected = null, active = -1;
  let width = 0, cardWidth = 350, cardHeight = 390, collapsedHeight = 490;
  let focusScale = 1.1;
  let inView = false, userPaused = false, phonePaused = false, keyboardFocus = false, explicitPlay = false;
  let busy = false, pointerStart = null, suppressClick = false;
  let manual = null, frameId = 0, previousTime = null, settleTimer, suppressTimer;
  let galleryReady = false, cleanupGallery = () => {};
  let collapsePromise = null;
  const transitionDuration = () => reducedMotion.matches ? 0 : 850;

  function pose(index) {
    const distance = mod(position - index + cards.length / 2, cards.length) - cards.length / 2;
    if (phoneLayout.matches) {
      // A shallow orbit keeps the nearest post readable and hides the rear half of the ring.
      const angle = distance * Math.PI / 2;
      const depth = Math.cos(angle), front = Math.max(0, depth);
      const scale = .54 + (focusScale - .54) * front;
      const opacity = Math.abs(distance) > 2 ? 0 : depth >= 0
        ? .12 + .88 * Math.pow(front, 1.4) : .12 * Math.max(0, 1 + depth / .25) ** 2;
      return { x: width / 2 - Math.sin(angle) * width * .56 - cardWidth * scale / 2,
        y: 16 + cardHeight * (focusScale - scale) / 2 - (1 - depth) * 54,
        scale, opacity, muted: .3 * (1 - front) };
    }
    const fraction = position - Math.floor(position);
    const slot = Math.round(distance - fraction);
    const backScale = compactLayout.matches ? .76 : .7;
    const gap = compactLayout.matches ? 14 : 22;
    const focusAt = offset => Math.exp(-Math.pow((fraction + offset) * 1.5, 2));
    const widthAt = offset => cardWidth * (backScale + (focusScale - backScale) * focusAt(offset));
    // Pack scaled card edges, then move the focus between the two central cards.
    let center = width / 2 + fraction * ((widthAt(0) + widthAt(-1)) / 2 + gap);
    const direction = Math.sign(slot);
    for (let offset = 0; offset !== slot; offset += direction) {
      center += direction * ((widthAt(offset) + widthAt(offset + direction)) / 2 + gap);
    }
    const focus = focusAt(slot);
    const scale = widthAt(slot) / cardWidth;
    return { x: center - cardWidth * scale / 2, y: 16 + (1 - focus) * 26, scale, opacity: 1, muted: .48 * (1 - focus) };
  }
  function place(card, point) {
    card.style.transform = `translate3d(${point.x}px,${point.y}px,0) scale(${point.scale})`;
    card.style.opacity = point.opacity;
    card.style.zIndex = String(Math.round(point.scale * 100));
  }
  function draw() {
    cards.forEach((card, index) => {
      const point = pose(index);
      card.style.setProperty('--glide-mute', point.muted);
      place(card, point);
      const projectIndex = index % items.length;
      const nearestCopy = mod(projectIndex + Math.round((position - projectIndex) / items.length) * items.length, cards.length);
      card.tabIndex = index === nearestCopy ? 0 : -1;
      card.inert = point.opacity < .08 || point.x >= width || point.x + cardWidth * point.scale <= 0;
    });
    const next = mod(Math.round(position));
    if (active !== next) {
      active = next;
      dots.forEach((dot, index) => dot.setAttribute('aria-current', String(index === active)));
      element.querySelector('.glide-count').textContent = `${String(active + 1).padStart(2, '0')} / 04`;
    }
  }
  function sizeCards() {
    cards.forEach(card => { card.style.width = cardWidth + 'px'; card.style.height = cardHeight + 'px'; });
  }
  function drawExpanded() {
    if (selected === null) return;
    const slot = (heroSlot.querySelector('.image-gallery-track') || heroSlot).getBoundingClientRect();
    const bounds = stage.getBoundingClientRect();
    cards.forEach((card, index) => {
      if (index === selected) {
        card.style.setProperty('--glide-mute', 0);
        card.style.width = slot.width + 'px'; card.style.height = slot.height + 'px';
        place(card, { x: slot.left - bounds.left, y: slot.top - bounds.top, scale: 1, opacity: galleryReady ? 0 : 1 });
        card.style.zIndex = '5';
      } else {
        const point = pose(index);
        point.x += point.x < width / 2 ? -100 : 100;
        point.scale *= .88; point.opacity = 0;
        place(card, point);
      }
    });
    stage.style.height = details.scrollHeight + 12 + 'px';
  }
  function measure() {
    const nextWidth = stage.clientWidth;
    const changed = width !== nextWidth;
    focusScale = compactLayout.matches ? 1.1 : 1.16;
    if (changed) {
      width = nextWidth;
      cardWidth = Math.min(compactLayout.matches ? 350 : 380, width * .79);
    }
    if (changed || (selected === null && !busy)) {
      cards.forEach(card => { card.style.width = cardWidth + 'px'; });
      const copyHeight = Math.max(...cards.map(card => card.querySelector('.glide-copy').offsetHeight));
      let imageHeight = cardWidth * .625;
      if (!compactLayout.matches) {
        // Reserve room for the heading, controls and breathing space after section navigation.
        const intro = document.querySelector('.work-intro');
        const available = innerHeight - document.querySelector('.topbar').offsetHeight - 24
          - intro.offsetHeight - parseFloat(getComputedStyle(intro).marginBottom) - controls.offsetHeight - 22;
        imageHeight = Math.min(imageHeight, Math.max(128, (available - 36) / focusScale - copyHeight - 2));
      }
      stage.style.setProperty('--glide-image-height', imageHeight + 'px');
      cardHeight = Math.max(width < 500 ? 330 : 0, imageHeight + copyHeight + 2);
      collapsedHeight = Math.ceil(cardHeight * focusScale + 36);
    }
    if (selected !== null) drawExpanded();
    else if (!busy) { sizeCards(); stage.style.height = collapsedHeight + 'px'; draw(); }
  }
  function canPlay() {
    return !(phoneLayout.matches ? phonePaused : userPaused) && (!keyboardFocus || explicitPlay) && !reducedMotion.matches;
  }
  function paintPause() {
    const paused = phoneLayout.matches ? phonePaused : userPaused;
    const label = paused ? 'Resume automatic rotation' : 'Pause automatic rotation';
    pause.setAttribute('aria-label', label); pause.title = label;
    pause.setAttribute('aria-pressed', String(paused));
    pause.innerHTML = icon(paused ? 'play' : 'pause');
    refreshIcons();
  }
  function canAnimate() {
    return inView && !document.hidden && !modal?.open && !lightbox?.open && !busy && selected === null && !pointerStart;
  }
  function refresh() {
    const animate = canAnimate();
    element.dataset.rotating = String(animate && canPlay());
    if (animate && (canPlay() || manual)) {
      if (!frameId) { previousTime = null; frameId = requestAnimationFrame(frame); }
    } else { cancelAnimationFrame(frameId); frameId = 0; previousTime = null; }
  }
  function frame(now) {
    frameId = 0;
    const dt = previousTime === null ? 0 : Math.min((now - previousTime) / 1000, .05);
    previousTime = now;
    if (!canAnimate()) { refresh(); return; }
    if (manual) {
      manual.elapsed += dt;
      const t = Math.min(manual.elapsed / manual.duration, 1);
      const eased = manual.release ? 1 - (1 - t) ** 3 : t * t * (3 - 2 * t);
      position = manual.from + (manual.to - manual.from) * eased;
      if (t === 1) manual = null;
    } else if (canPlay()) {
      const velocity = phoneLayout.matches ? .22 + 1.9 * Math.sin(Math.PI * position) ** 2 : .4 + 2.1 * Math.sin(Math.PI * position) ** 2;
      position += dt * velocity / (phoneLayout.matches ? 4.8 : 5.8);
    }
    draw();
    if (manual || canPlay()) frameId = requestAnimationFrame(frame);
    else refresh();
  }
  function go(target, duration = .85, release = false) {
    if (selected !== null || busy) return;
    manual = { from: position, to: target, elapsed: 0, duration, release };
    status.textContent = items[mod(Math.round(target))].title;
    if (reducedMotion.matches) { position = target; manual = null; draw(); }
    refresh();
  }
  function stepProject(direction) {
    // Count rapid presses from the requested destination, even while it is still moving.
    go((manual?.to ?? Math.round(position)) + direction);
  }
  function expand(index) {
    if (selected !== null || busy) return;
    selected = index; manual = null; busy = true;
    refresh();
    const project = repeatedItems[index];
    galleryReady = false;
    element.dataset.galleryReady = 'false';
    heroSlot.removeAttribute('aria-hidden');
    heroSlot.innerHTML = renderImageGallery(project);
    heroSlot.firstElementChild.inert = true;
    element.querySelector('[data-glide-category]').textContent = project.category;
    element.querySelector('#glide-title').textContent = project.title;
    element.querySelector('[data-glide-summary]').textContent = project.summary;
    element.querySelector('.glide-approach').textContent = project.contribution;
    element.querySelector('[data-glide-role]').textContent = project.role;
    element.querySelector('[data-glide-outcome]').textContent = project.outcome;
    const full = element.querySelector('[data-glide-full]');
    full.href = projectURL(project.id); full.dataset.openProject = project.id;
    refreshIcons();
    details.hidden = false;
    cleanupGallery = setupImageGallery(heroSlot.firstElementChild);
    controls.inert = true;
    cards.forEach((card, i) => {
      card.inert = i !== index;
      card.classList.toggle('is-selected', i === index);
      card.setAttribute('aria-expanded', String(i === index));
    });
    stage.classList.add('is-morphing');
    void stage.offsetWidth;
    element.dataset.expanded = 'true';
    drawExpanded();
    if (cards[index].matches(':focus-visible')) close.focus({ preventScroll: true });
    status.textContent = `${project.title} expanded`;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      busy = false; galleryReady = true;
      element.dataset.galleryReady = 'true';
      heroSlot.firstElementChild.inert = false;
      cards[index].inert = true;
      drawExpanded();
      stage.classList.remove('is-morphing');
    }, transitionDuration() + 120);
  }
  function collapse(forNavigation = false) {
    if (selected === null) return collapsePromise || Promise.resolve();
    let completeCollapse;
    collapsePromise = new Promise(resolve => { completeCollapse = resolve; });
    const opener = cards[selected], keyboard = !forNavigation && details.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
    const bounds = stage.getBoundingClientRect();
    busy = true;
    cleanupGallery(); cleanupGallery = () => {};
    galleryReady = false;
    element.dataset.galleryReady = 'false';
    heroSlot.firstElementChild.inert = true;
    clearTimeout(settleTimer);
    stage.classList.add('is-morphing');
    selected = null;
    element.dataset.expanded = 'false';
    details.inert = true;
    cards.forEach(card => { card.classList.remove('is-selected'); card.setAttribute('aria-expanded', 'false'); });
    sizeCards(); draw(); stage.style.height = collapsedHeight + 'px';
    if (!forNavigation && bounds.top + collapsedHeight < 120) {
      window.scrollTo({ top: window.scrollY + bounds.top - document.querySelector('.topbar').offsetHeight - 24, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    }
    settleTimer = setTimeout(() => {
      details.hidden = true; details.inert = false; controls.inert = false;
      heroSlot.innerHTML = ''; heroSlot.setAttribute('aria-hidden', 'true');
      cards.forEach(card => { card.inert = false; });
      busy = false; stage.classList.remove('is-morphing');
      measure();
      if (keyboard) opener.focus({ preventScroll: true });
      status.textContent = 'Selected projects';
      refresh();
      completeCollapse();
      collapsePromise = null;
    }, transitionDuration());
    return collapsePromise;
  }
  element.addEventListener('click', event => {
    const card = event.target.closest('[data-glide-project]');
    if (suppressClick && event.target.closest('.glide-belt')) { suppressClick = false; event.preventDefault(); event.stopPropagation(); return; }
    if (card) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (selected !== null) collapse(); else expand(Number(card.dataset.glideProject));
    }
    const dot = event.target.closest('[data-glide-dot]');
    if (dot) { const index = Number(dot.dataset.glideDot); go(index + Math.round((position - index) / items.length) * items.length); }
    if (event.target.closest('[data-glide-next]')) stepProject(1);
    if (event.target.closest('[data-glide-prev]')) stepProject(-1);
    if (event.target.closest('.glide-close')) collapse();
    if (event.target.closest('[data-glide-pause]')) {
      if (phoneLayout.matches) phonePaused = !phonePaused; else userPaused = !userPaused;
      explicitPlay = !(phoneLayout.matches ? phonePaused : userPaused);
      paintPause();
      if (phoneLayout.matches && phonePaused) go(Math.round(position), .55);
      else refresh();
    }
  });
  belt.addEventListener('pointerdown', event => {
    if (selected !== null || busy || event.button !== 0 || !event.isPrimary) return;
    keyboardFocus = false;
    manual = null;
    suppressClick = false;
    clearTimeout(suppressTimer);
    const backScale = compactLayout.matches ? .76 : .7;
    pointerStart = { id: event.pointerId, x: event.clientX, y: event.clientY, position,
      stride: phoneLayout.matches ? width * .88 : cardWidth * (focusScale + backScale) / 2 + (compactLayout.matches ? 14 : 22),
      direction: phoneLayout.matches ? -1 : 1,
      dragging: false, lastX: event.clientX, lastTime: event.timeStamp, velocity: 0 };
    refresh();
  });
  window.addEventListener('pointermove', event => {
    const gesture = pointerStart;
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (!gesture.dragging) {
      if (Math.abs(dy) > 8 && Math.abs(dy) > Math.abs(dx) && event.pointerType === 'touch') {
        pointerStart = null;
        refresh();
        return;
      }
      if (Math.abs(dx) < 7 || (event.pointerType === 'touch' && Math.abs(dx) < Math.abs(dy))) return;
      gesture.dragging = true;
      belt.setPointerCapture(event.pointerId);
      element.classList.add('is-dragging');
    }
    event.preventDefault();
    const elapsed = Math.max(1, event.timeStamp - gesture.lastTime);
    gesture.velocity = elapsed > 100 ? 0 : gesture.velocity * .65 + (event.clientX - gesture.lastX) / elapsed * .35;
    gesture.lastX = event.clientX;
    gesture.lastTime = event.timeStamp;
    position = gesture.position + dx / gesture.stride * gesture.direction;
    draw();
  }, { passive: false });
  function finishDrag(event, cancelled = false) {
    const gesture = pointerStart;
    if (!gesture || (event?.pointerId !== undefined && event.pointerId !== gesture.id)) return;
    pointerStart = null;
    element.classList.remove('is-dragging');
    if (belt.hasPointerCapture(gesture.id)) belt.releasePointerCapture(gesture.id);
    if (gesture.dragging) {
      suppressClick = true;
      clearTimeout(suppressTimer);
      suppressTimer = setTimeout(() => { suppressClick = false; }, 450);
      const velocity = !cancelled && event && event.timeStamp - gesture.lastTime < 90 ? gesture.velocity : 0;
      const momentum = Math.max(-.35, Math.min(.35, velocity * 160 / gesture.stride * gesture.direction));
      go(Math.round(position + momentum), cancelled ? .3 : .45, true);
    }
    refresh();
  }
  window.addEventListener('pointerup', event => finishDrag(event));
  window.addEventListener('pointercancel', event => finishDrag(event, true));
  belt.addEventListener('lostpointercapture', event => finishDrag(event, true));
  belt.addEventListener('dragstart', event => { if (selected === null) event.preventDefault(); });
  window.addEventListener('blur', () => finishDrag(null, true));
  element.addEventListener('keydown', event => {
    if (event.key === 'Escape' && pointerStart) { event.preventDefault(); finishDrag(null, true); return; }
    if (event.key === 'Escape' && selected !== null) { event.preventDefault(); collapse(); return; }
    keyboardFocus = true; explicitPlay = false;
    if (selected === null && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault(); stepProject(event.key === 'ArrowRight' ? 1 : -1);
    }
    refresh();
  });
  element.addEventListener('focusin', event => {
    if (!event.target.matches(':focus-visible')) return;
    keyboardFocus = true;
    const card = event.target.closest('[data-glide-project]');
    if (card && selected === null) {
      const index = Number(card.dataset.glideProject);
      go(index + Math.round((position - index) / items.length) * items.length);
    }
    refresh();
  });
  element.addEventListener('focusout', event => {
    if (!element.contains(event.relatedTarget)) { keyboardFocus = false; explicitPlay = false; refresh(); }
  });
  const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; refresh(); }, { threshold: 0 });
  observer.observe(stage);
  new ResizeObserver(measure).observe(element);
  new ResizeObserver(measure).observe(document.querySelector('.work-intro'));
  window.addEventListener('resize', measure, { passive: true });
  document.fonts?.ready.then(measure);
  document.addEventListener('visibilitychange', () => { if (document.hidden) finishDrag(null, true); refresh(); });
  const preferenceChanged = () => { pause.disabled = reducedMotion.matches; paintPause(); refresh(); };
  reducedMotion.addEventListener('change', preferenceChanged);
  phoneLayout.addEventListener('change', () => { explicitPlay = false; finishDrag(null, true); measure(); preferenceChanged(); });
  measure(); preferenceChanged();
  return { refresh, closeForNavigation: id => ['projects', 'compiled'].includes(id) ? Promise.resolve() : collapse(true) };
}

function renderInternship(item) {
  const project = getProject(item.project);
  return `<div class="internship-overview${project ? '' : ' internship-pending'}">
    <div class="internship-copy-window"><div class="internship-copy"><header class="internship-heading"><p class="eyebrow">${escapeHTML(item.date)}</p><h3 id="internship-title">${escapeHTML(item.organisation)}</h3>
      <p class="internship-role">${escapeHTML(item.role)}</p></header><div class="internship-summary"><p>${escapeHTML(project?.summary || item.text)}</p>
      ${project ? `<dl><div><dt>My focus</dt><dd>${escapeHTML(project.role)}</dd></div><div><dt>Outcome</dt><dd>${escapeHTML(project.outcome)}</dd></div></dl>` : '<p class="internship-pending-note">Project details and images forthcoming.</p>'}
    </div></div></div>${project ? `<figure class="internship-hero">${renderImageGallery(project)}</figure>` : ''}
    </div>${project ? `<div class="case-story">${[['The problem', project.problem], ['My contribution', project.contribution], ['The result', project.result]].map(([title, text]) => `<div class="internship-fold"><section class="internship-fold-content"><h4>${title}</h4><p>${escapeHTML(text)}</p></section></div>`).join('')}</div>
    ${renderMedia(project, true)}${documents(project)}` : ''}`;
}

function setupInternships() {
  const section = document.querySelector('.experience-section');
  const stage = section.querySelector('.experience-stage');
  const overview = section.querySelector('.experience-layout');
  const panel = section.querySelector('.internship-reveal');
  const details = section.querySelector('.internship-details');
  const content = section.querySelector('#internship-content');
  const closeButton = section.querySelector('[aria-label="Collapse internship"]');
  let active = null, opener = null, revision = 0, heightAnimation = null;
  let animations = [], layers = [], overviewLayers = [], cleanupMedia = () => {};
  let sourceCard = null;
  let closePromise = null;
  const previews = [...section.querySelectorAll('.internship-preview')];
  const previewToggle = section.querySelector('[data-preview-pause]');
  let previewsInView = false, previewsPaused = false;
  function refreshPreviews() {
    previews.forEach(preview => { preview.hidden = !phoneLayout.matches; });
    previewToggle.hidden = !phoneLayout.matches || active !== null;
    previewToggle.disabled = reducedMotion.matches;
    section.dataset.previewMotion = String(phoneLayout.matches && previewsInView && !previewsPaused && active === null && !section.classList.contains('has-open-internship') && !reducedMotion.matches && !document.hidden && !modal?.open && !lightbox?.open);
  }
  previewToggle.addEventListener('click', () => {
    previewsPaused = !previewsPaused;
    const label = `${previewsPaused ? 'Resume' : 'Pause'} internship previews`;
    previewToggle.setAttribute('aria-label', label); previewToggle.title = label;
    previewToggle.setAttribute('aria-pressed', String(previewsPaused));
    previewToggle.innerHTML = icon(previewsPaused ? 'play' : 'pause');
    refreshIcons(); refreshPreviews();
  });
  new IntersectionObserver(entries => { previewsInView = entries[0].isIntersecting; refreshPreviews(); }).observe(overview);
  phoneLayout.addEventListener('change', refreshPreviews);
  reducedMotion.addEventListener('change', refreshPreviews);
  document.addEventListener('visibilitychange', refreshPreviews);
  carousels.push({ refresh: refreshPreviews, closeForNavigation: id => id === 'experience' ? Promise.resolve() : close({ align: false, restoreFocus: false }) });
  refreshPreviews();
  const visible = { transform: 'none', clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 };
  const tuckedUp = { transform: 'translateY(-100%)', clipPath: visible.clipPath };
  function motionState(element, properties) {
    const style = getComputedStyle(element);
    return Object.fromEntries(Object.keys(properties).map(property => [property, style[property]]));
  }
  function slide(element, from, to, duration, delay = 0) {
    const animation = element.animate([from, to], { duration: reducedMotion.matches ? 0 : duration, delay: reducedMotion.matches ? 0 : delay, fill: 'both', easing: 'cubic-bezier(.22,.75,.25,1)' });
    animations.push(animation);
    return animation;
  }
  function heroOrigin(hero, cover) {
    const target = hero.getBoundingClientRect();
    const origin = cover?.getBoundingClientRect();
    const track = cover?.closest('.rotary-track, .experience-list')?.getBoundingClientRect();
    if (!origin || !track || !origin.width || origin.right <= track.left || origin.left >= track.right) {
      return { transform: 'translateY(-32px) scale(.92)', clipPath: 'inset(0% 0% 100% 0%)' };
    }
    return { transform: `translate(${origin.left - target.left}px,${origin.top - target.top}px) scale(${origin.width / target.width},${origin.height / target.height})`, clipPath: visible.clipPath };
  }
  function prepareLayers() {
    const hero = content.querySelector('.internship-hero');
    const copy = content.querySelector('.internship-copy-window');
    const stacked = !hero || copy.offsetTop > hero.offsetTop + hero.offsetHeight / 2;
    // Mobile titles sit above the gallery; animate the two text blocks independently.
    const textParts = phoneLayout.matches ? [copy.querySelector('header'), copy.querySelector('.internship-summary')] : [copy.querySelector('.internship-copy')];
    layers = textParts.map(element => ({ element, closed: phoneLayout.matches
      ? { ...visible, transform: 'translateY(12px)', opacity: 0 }
      : { ...visible, transform: stacked ? 'translateY(calc(-100% - 28px))' : 'translateX(calc(-100% - 32px))' }, duration: 900, delay: 180 }));
    if (hero) layers.push({ element: hero, closed: heroOrigin(hero, sourceCard?.querySelector('.cover')), duration: 1000, delay: 0 });
    content.querySelectorAll('.internship-fold-content').forEach((element, index) => {
      layers.push({ element, closed: element.closest('.internship-media-fold')
        ? { transform: 'translateY(-52px)', clipPath: 'inset(0% 0% 100% 0%)' }
        : tuckedUp, duration: 780, delay: 260 + Math.min(index * 45, 180) });
    });
    [section.querySelector('.internship-toolbar'), section.querySelector('.internship-return')].forEach(element => {
      layers.push({ element, closed: { transform: 'translateY(-16px)', clipPath: 'inset(0% 0% 100% 0%)' }, duration: 500, delay: 240 });
    });
    overviewLayers = [];
    overview.querySelectorAll('.experience-entry').forEach(element => {
      overviewLayers.push({ element: element.querySelector('.experience-entry-content'), closed: tuckedUp, duration: 300, delay: 0 });
      overviewLayers.push({ element, closed: { transform: 'none', clipPath: 'inset(0% 100% 0% 0%)' }, duration: 180, delay: 150 });
    });
    overview.querySelectorAll('.rotary-track, .carousel-controls').forEach(element => {
      overviewLayers.push({ element, closed: { transform: 'translateY(-24px)', clipPath: 'inset(0% 0% 100% 0%)' }, duration: 330, delay: 0 });
    });
  }

  function stopAnimations() {
    const height = stage.getBoundingClientRect().height;
    stage.style.height = height + 'px';
    heightAnimation?.cancel();
    animations.forEach(animation => animation.cancel());
    animations = [];
    return height;
  }
  function paint() {
    section.classList.toggle('has-open-internship', active !== null || stage.classList.contains('is-morphing'));
    section.querySelectorAll('[data-open-internship]').forEach(button => button.setAttribute('aria-expanded', String(Number(button.dataset.openInternship) === active)));
    section.querySelectorAll('[data-internship-project]').forEach(card => card.setAttribute('aria-expanded', String(active !== null && portfolio.experience[active].project === card.dataset.internshipProject)));
    carousels.forEach(carousel => carousel.refresh());
  }
  function alignExperience() {
    const top = scrollY + section.querySelector('.section-label').getBoundingClientRect().top - document.querySelector('.topbar').offsetHeight - 24;
    window.scrollTo({ top, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }
  async function open(index, source) {
    if (!portfolio.experience[index] || active !== null || closePromise) return;
    const token = ++revision;
    const keyboard = source.matches(':focus-visible');
    cleanupMedia();
    sourceCard = phoneLayout.matches ? section.querySelector(`.internship-preview[data-open-internship="${index}"]`)
      : section.querySelector(`[data-internship-project="${portfolio.experience[index].project}"]`);
    active = index;
    opener = section.querySelector(`h3 [data-open-internship="${index}"]`);
    paint();
    content.innerHTML = renderInternship(portfolio.experience[index]);
    content.querySelectorAll(':scope > .case-section').forEach(block => {
      const fold = document.createElement('div');
      fold.className = 'internship-fold internship-media-fold';
      block.before(fold);
      fold.append(block);
      block.classList.add('internship-fold-content');
    });
    const leadImage = content.querySelector('.internship-hero .image-gallery-slide:not([data-gallery-clone]) img');
    if (leadImage) {
      const trigger = opener;
      trigger.setAttribute('aria-busy', 'true');
      leadImage.loading = 'eager';
      await leadImage.decode().catch(() => {});
      trigger.removeAttribute('aria-busy');
      if (token !== revision) return;
    }
    const oldHeight = stopAnimations();
    stage.classList.add('is-morphing');
    overview.inert = true;
    panel.hidden = false;
    panel.inert = false;
    refreshIcons();
    const nextHeight = details.offsetHeight;
    stage.style.height = nextHeight + 'px';
    const duration = reducedMotion.matches ? 0 : 1220;
    heightAnimation = stage.animate([{ height: oldHeight + 'px' }, { height: nextHeight + 'px' }], { duration, easing: 'cubic-bezier(.22,.75,.25,1)' });
    prepareLayers();
    sourceCard?.classList.add('is-morph-source');
    // Only the picture and clipped contents move; neither view travels as a page-sized block.
    layers.forEach(({ element, closed, duration, delay }) => slide(element, closed, visible, duration, delay));
    const retract = overviewLayers.map(({ element, closed, duration, delay }) => slide(element, visible, closed, duration, delay));
    Promise.all(retract.map(animation => animation.finished.catch(() => {}))).then(() => {
      if (token === revision) overview.hidden = true;
    });
    alignExperience();
    if (keyboard) closeButton.focus({ preventScroll: true });
    await Promise.all([heightAnimation, ...animations].map(animation => animation.finished.catch(() => {})));
    if (token !== revision) return;
    overview.hidden = true;
    animations.forEach(animation => animation.cancel());
    animations = [];
    stage.classList.remove('is-morphing');
    stage.style.height = '';
    cleanupMedia = setupCaseMedia(content);
    paint();
  }
  function close(options = {}) {
    if (closePromise) return closePromise;
    if (active === null) return Promise.resolve(false);
    closePromise = restoreOverview(options).finally(() => { closePromise = null; });
    return closePromise;
  }
  async function restoreOverview({ align = true, restoreFocus = true } = {}) {
    const token = ++revision;
    const keyboard = restoreFocus && panel.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
    if (panel.hidden) {
      active = null;
      sourceCard = null;
      content.innerHTML = '';
      paint();
      return true;
    }
    const previousParts = new Map(layers.map(({ element, closed }) => [element, motionState(element, closed)]));
    const previousOverview = new Map(overviewLayers.map(({ element, closed }) => [element, overview.hidden ? closed : motionState(element, closed)]));
    const oldHeight = stopAnimations();
    cleanupMedia(); cleanupMedia = () => {};
    active = null;
    stage.classList.add('is-morphing');
    overview.hidden = false;
    overview.inert = true;
    panel.inert = true;
    paint();
    const nextHeight = overview.offsetHeight;
    if (align) alignExperience();
    const hero = content.querySelector('.internship-hero');
    const heroTarget = hero && heroOrigin(hero, sourceCard?.querySelector('.cover'));
    layers.forEach(({ element, closed }) => slide(element, previousParts.get(element), element === hero ? heroTarget : closed, element === hero ? 780 : 600, element === hero ? 160 : 0));
    overviewLayers.forEach(({ element }) => slide(element, previousOverview.get(element), visible, 540, 400));
    stage.style.height = nextHeight + 'px';
    heightAnimation = stage.animate([{ height: oldHeight + 'px' }, { height: nextHeight + 'px' }], { duration: reducedMotion.matches ? 0 : 1000, easing: 'cubic-bezier(.4,0,.2,1)' });
    await Promise.all([heightAnimation, ...animations].map(animation => animation.finished.catch(() => {})));
    if (token !== revision) return false;
    panel.hidden = true;
    content.innerHTML = '';
    overview.inert = false;
    stage.classList.remove('is-morphing');
    stage.style.height = '';
    animations.forEach(animation => animation.cancel());
    animations = [];
    layers = []; overviewLayers = [];
    sourceCard?.classList.remove('is-morph-source');
    sourceCard = null;
    paint();
    if (keyboard) opener?.focus({ preventScroll: true });
    return true;
  }
  section.addEventListener('click', event => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (event.target.closest('[data-close-internship]')) { close(); return; }
    const source = event.target.closest('[data-open-internship], [data-internship-project]');
    if (!source) return;
    event.preventDefault();
    const index = source.hasAttribute('data-internship-project')
      ? portfolio.experience.findIndex(item => item.project === source.dataset.internshipProject)
      : Number(source.dataset.openInternship);
    open(index, source);
  });
  section.addEventListener('keydown', event => {
    if (event.key === 'Escape' && active !== null && !lightbox?.open && !modal?.open) { event.preventDefault(); close(); }
  });
  const resizeObserver = new ResizeObserver(() => {
    if (heightAnimation?.playState === 'running') {
      const height = (active === null ? overview : details).offsetHeight;
      heightAnimation.effect.setKeyframes([{ height: heightAnimation.effect.getKeyframes()[0].height }, { height: height + 'px' }]);
      stage.style.height = height + 'px';
    }
  });
  resizeObserver.observe(details);
  resizeObserver.observe(overview);
  reducedMotion.addEventListener('change', () => {
    if (!reducedMotion.matches) return;
    heightAnimation?.finish();
    animations.forEach(animation => animation.finish());
  });
}

function setupProfile() {
  const scene = document.querySelector('.profile-scene');
  if (!scene) return;
  const card = scene.querySelector('.profile-card');
  const reset = () => { card.style.removeProperty('--tilt-x'); card.style.removeProperty('--tilt-y'); };
  scene.addEventListener('pointermove', event => {
    if (reducedMotion.matches || event.pointerType !== 'mouse') return;
    const bounds = scene.getBoundingClientRect();
    const x = Math.max(-.5, Math.min(.5, (event.clientX - bounds.left) / bounds.width - .5));
    const y = Math.max(-.5, Math.min(.5, (event.clientY - bounds.top) / bounds.height - .5));
    card.style.setProperty('--tilt-x', `${-y * 18}deg`);
    card.style.setProperty('--tilt-y', `${x * 24}deg`);
  });
  scene.addEventListener('pointerleave', reset);
  reducedMotion.addEventListener('change', reset);
  scene.querySelectorAll('[data-profile-action]').forEach(note => {
    let resetTimer;
    note.addEventListener('click', () => {
      clearTimeout(resetTimer);
      note.classList.remove('is-playing');
      // Restart the short effect even when the same note is tapped again.
      void note.offsetWidth;
      note.classList.add('is-playing');
      resetTimer = setTimeout(() => note.classList.remove('is-playing'), reducedMotion.matches ? 700 : 1800);
    });
  });
  new IntersectionObserver(entries => scene.classList.toggle('is-visible', entries[0].isIntersecting)).observe(scene);
}

function setupNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const header = document.querySelector('.topbar');
  const navToggle = header.querySelector('[data-mobile-nav-toggle]');
  const sectionLabel = navToggle.querySelector('[data-mobile-section]');
  let labelAnimation;
  const links = [...nav.querySelectorAll('a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  let activeId = '';
  let target = null;
  let frame = 0;
  let settleTimer;
  let navigationRevision = 0;

  function setMenu(open, restoreFocus = false) {
    const expanded = phoneLayout.matches && open;
    header.classList.toggle('is-menu-open', expanded);
    navToggle.setAttribute('aria-expanded', String(expanded));
    nav.inert = phoneLayout.matches && !expanded;
    if (restoreFocus && phoneLayout.matches) navToggle.focus({ preventScroll: true });
  }
  function refreshMobileMenu() {
    navToggle.hidden = !phoneLayout.matches;
    header.classList.toggle('has-mobile-navigation', phoneLayout.matches);
    setMenu(false);
    setActive(activeId || 'about', false);
  }

  function setActive(id, centre = true) {
    const link = links.find(item => item.hash === '#' + id);
    if (!link) return;
    const changed = id !== activeId;
    activeId = id;
    if (sectionLabel.textContent !== link.textContent) {
      labelAnimation?.cancel();
      sectionLabel.textContent = link.textContent;
      if (phoneLayout.matches && !reducedMotion.matches) labelAnimation = sectionLabel.animate([
        { opacity: 0, transform: 'translateY(4px)' }, { opacity: 1, transform: 'none' }
      ], { duration: 260, easing: 'ease-out' });
    }
    links.forEach(item => {
      item.classList.toggle('is-active', item === link);
      if (item === link) item.setAttribute('aria-current', 'location');
      else item.removeAttribute('aria-current');
    });
    nav.style.setProperty('--nav-left', link.offsetLeft + 'px');
    nav.style.setProperty('--nav-width', link.offsetWidth + 'px');
    if (changed && centre && nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({ left: Math.max(0, link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2), behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    }
  }
  function sync() {
    frame = 0;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    if (target) {
      if (target.y === null) return;
      if (Math.abs(window.scrollY - target.y) <= 2) target = null;
      else return;
    }
    const line = window.scrollY + header.offsetHeight + 50;
    let current = sections[0];
    for (const section of sections) if (section.getBoundingClientRect().top + window.scrollY <= line) current = section;
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) current = sections.at(-1);
    setActive(current.id);
  }
  function navigate(id, updateHistory = true) {
    id = ({ home: 'about', internships: 'experience' })[id] || id;
    const section = document.getElementById(id);
    if (!section) return;
    const heading = section.querySelector('.section-label') || section.querySelector('.library-header > div') || section;
    const y = id === 'about' ? 0 : Math.min(Math.max(0, heading.getBoundingClientRect().top + scrollY - header.offsetHeight - 24), Math.max(0, document.documentElement.scrollHeight - innerHeight));
    target = { id, y };
    setActive(id === 'compiled' ? 'projects' : id);
    if (updateHistory) history.pushState({}, '', '#' + id);
    window.scrollTo({ top: y, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => { target = null; sync(); }, 1400);
  }
  navToggle.addEventListener('click', () => setMenu(!header.classList.contains('is-menu-open')));
  navToggle.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setMenu(true); links.find(link => link.classList.contains('is-active'))?.focus(); }
  });
  nav.addEventListener('click', event => { if (phoneLayout.matches && event.target.closest('a')) setMenu(false); });
  header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('is-menu-open')) { event.preventDefault(); setMenu(false, true); }
  });
  header.addEventListener('focusout', event => { if (!header.contains(event.relatedTarget)) setMenu(false); });
  document.addEventListener('pointerdown', event => { if (!header.contains(event.target)) setMenu(false); });
  phoneLayout.addEventListener('change', refreshMobileMenu);
  document.addEventListener('click', async event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || link.hash === '#main') return;
    if (!document.getElementById(link.hash.slice(1))) return;
    event.preventDefault();
    const request = ++navigationRevision;
    // Close other inline sections before measuring the destination on any screen size.
    target = { id: link.hash.slice(1), y: null };
    setActive(target.id === 'compiled' ? 'projects' : target.id);
    await Promise.all(carousels.map(carousel => carousel.closeForNavigation?.(link.hash.slice(1))));
    if (request !== navigationRevision) return;
    navigate(link.hash.slice(1));
  });
  window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(sync); }, { passive: true });
  window.addEventListener('wheel', () => { target = null; }, { passive: true });
  window.addEventListener('touchstart', () => { target = null; }, { passive: true });
  window.addEventListener('keydown', event => { if (['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown'].includes(event.key)) target = null; });
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    setActive(activeId || 'about', false);
  }).observe(header);
  document.fonts?.ready.then(() => setActive(activeId || 'about', false));
  window.addEventListener('popstate', event => {
    if (location.hash.startsWith('#project-')) return;
    if (modal?.open) {
      modal.close();
      if (Number.isFinite(event.state?.portfolioScroll)) window.scrollTo({ top: event.state.portfolioScroll, behavior: 'instant' });
    } else if (location.hash) navigate(location.hash.slice(1), false);
  });
  refreshMobileMenu();
  sync();
  if (location.hash && !location.hash.startsWith('#project-')) requestAnimationFrame(() => navigate(location.hash.slice(1), false));
}

function imageFigure(item, className = '') {
  return `<figure class="${className}"><button class="media-button" type="button" data-image="${item.src}" data-caption="${escapeHTML(item.caption)}" aria-label="Enlarge: ${escapeHTML(item.caption)}">
    <img src="${item.src}" alt="${escapeHTML(item.caption)}" loading="lazy" ${item.position ? `style="object-position:${item.position}"` : ''}><span class="media-zoom">${icon('maximize-2')}</span>
    </button><figcaption>${escapeHTML(item.caption)}</figcaption></figure>`;
}
function projectImages(project) {
  const extra = {
    snoreless: [
      { src: 'assets/previews/snoreless/snoreless-poster1.jpg', caption: 'Snoreless project poster.' },
      { src: 'assets/projects/snoreless/prototype.jpg', caption: 'Presenting Snoreless at ARTSIC.' },
      { src: 'assets/previews/snoreless/merit-best-poster-award1.jpg', caption: 'Merit & Best Poster Award' }
    ],
    liftoff: [{ src: 'assets/previews/liftoff/liftoff-poster1.jpg', caption: 'LiftOff project poster.' }],
    kokoni: [
      { src: 'assets/previews/kokoni/moxin-slide21.jpg', caption: 'From a sketch to an editable Blender model. Slide 21.' },
      { src: 'assets/previews/kokoni/moxin-slide25.jpg', caption: 'The Blender plug-in. Slide 25.' }
    ]
  };
  const images = [{ src: project.cover, preview: `assets/thumbnails/${project.id}-720.webp`, caption: project.gallery.find(item => item.src === project.cover)?.caption || project.title },
    ...project.gallery, ...(project.views || []), ...(extra[project.id] || [])];
  return images.filter((item, index) => images.findIndex(other => other.src === item.src) === index);
}
function renderImageGallery(project) {
  const images = projectImages(project);
  const slide = (item, index, clone = false) => `
    <div class="image-gallery-slide" data-gallery-index="${index}" ${clone ? 'data-gallery-clone aria-hidden="true" inert' : `role="group" aria-roledescription="slide" aria-label="${index + 1} of ${images.length}"${index ? ' inert' : ''}`}>
      <button class="media-button" type="button" data-image="${escapeHTML(item.src)}" data-caption="${escapeHTML(item.caption)}" aria-label="Enlarge: ${escapeHTML(item.caption)}">
        <img src="${escapeHTML(item.preview || item.src)}" alt="${escapeHTML(item.caption)}" loading="${index === 0 ? 'eager' : 'lazy'}" draggable="false" width="720" height="450">
      </button>
      ${images.length > 1 ? `<button class="image-gallery-edge" type="button" data-gallery-prev aria-label="Previous image" title="Previous image">${icon('chevron-left')}</button><button class="image-gallery-edge" type="button" data-gallery-next aria-label="Next image" title="Next image">${icon('chevron-right')}</button>` : ''}
      <button class="image-gallery-zoom" type="button" data-image="${escapeHTML(item.src)}" data-caption="${escapeHTML(item.caption)}" aria-label="Expand image" title="Expand image">${icon('maximize-2')}</button>
    </div>`;
  return `<div class="image-gallery" data-image-gallery role="region" aria-roledescription="carousel" aria-label="${escapeHTML(project.title)} images">
    <div class="image-gallery-track" tabindex="0" aria-label="Project images">${images.length > 1 ? slide(images.at(-1), images.length - 1, true) : ''}${images.map((item, index) => slide(item, index)).join('')}${images.length > 1 ? slide(images[0], 0, true) : ''}</div>
    <div class="image-gallery-dots" ${images.length < 2 ? 'hidden' : ''}>${images.map((item, index) => `<button type="button" data-gallery-dot="${index}" aria-label="Show image ${index + 1} of ${images.length}" aria-current="${index === 0}" title="${escapeHTML(item.caption)}"></button>`).join('')}</div>
    <p class="image-gallery-caption" data-gallery-caption aria-live="polite" aria-atomic="true">${escapeHTML(images[0].caption)}</p>
  </div>`;
}
function setupImageGallery(viewer) {
  viewer.dataset.galleryInitialized = 'true';
  const track = viewer.querySelector('.image-gallery-track');
  const slides = [...track.children];
  const originals = slides.filter(slide => !slide.hasAttribute('data-gallery-clone'));
  const count = originals.length, offset = count > 1 ? 1 : 0;
  const dots = [...viewer.querySelectorAll('[data-gallery-dot]')];
  const caption = viewer.querySelector('[data-gallery-caption]');
  const controller = new AbortController();
  const options = { signal: controller.signal };
  let index = 0, drag = null, suppressClick = false, suppressTimer, settleTimer;
  let width = track.clientWidth;
  const mod = value => (value % count + count) % count;
  const slot = () => Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / (width || 1))));
  const paint = () => {
    if (width !== track.clientWidth) return;
    const next = mod(slot() - offset);
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === next)));
    originals.forEach((slide, i) => { slide.inert = i !== next; });
    if (next !== index) caption.textContent = originals[next].querySelector('.media-button').dataset.caption;
    index = next;
  };
  const scrollToSlot = (next, instant = false) => track.scrollTo({ left: next * width, behavior: instant || reducedMotion.matches ? 'instant' : 'smooth' });
  // Duplicate end slides make the wrap a one-photo swipe, then rebase without visible movement.
  const settle = () => {
    clearTimeout(settleTimer);
    if (drag || !offset || width !== track.clientWidth) return;
    const current = slot();
    if (current === 0 || current === count + 1) scrollToSlot(mod(current - offset) + offset, true);
    paint();
  };
  const go = next => {
    if (count < 2) return;
    settle();
    scrollToSlot(next < 0 ? 0 : next >= count ? count + 1 : next + offset);
  };
  viewer.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; return; }
    const dot = event.target.closest('[data-gallery-dot]');
    if (dot) go(Number(dot.dataset.galleryDot));
    if (event.target.closest('[data-gallery-prev]')) go(index - 1);
    if (event.target.closest('[data-gallery-next]')) go(index + 1);
  }, { ...options, capture: true });
  viewer.addEventListener('keydown', event => {
    if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      go(event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }, options);
  track.addEventListener('scroll', () => {
    if (width !== track.clientWidth) return;
    paint(); clearTimeout(settleTimer); settleTimer = setTimeout(settle, 160);
  }, { ...options, passive: true });
  track.addEventListener('scrollend', settle, options);
  // Touch uses native scrolling; mouse drags provide the same direct manipulation on laptops.
  track.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    settle(); clearTimeout(suppressTimer); suppressClick = false;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: track.scrollLeft, moved: false };
  }, options);
  track.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    if (!drag.moved && Math.abs(event.clientY - drag.y) > Math.abs(dx) + 6) { drag = null; return; }
    if (!drag.moved && Math.abs(dx) < 6) return;
    if (!drag.moved) { drag.moved = true; track.setPointerCapture(event.pointerId); track.classList.add('is-dragging'); }
    event.preventDefault(); track.scrollLeft = drag.left - dx;
  }, options);
  const finishDrag = event => {
    if (!drag || (event?.pointerId !== undefined && event.pointerId !== drag.id)) return;
    const previous = drag; drag = null;
    const target = slot();
    if (track.hasPointerCapture(previous.id)) track.releasePointerCapture(previous.id);
    track.classList.remove('is-dragging');
    if (previous.moved) {
      suppressClick = true; suppressTimer = setTimeout(() => { suppressClick = false; }, 450);
      scrollToSlot(target);
    }
  };
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => track.addEventListener(type, finishDrag, options));
  track.addEventListener('dragstart', event => event.preventDefault(), options);
  window.addEventListener('blur', finishDrag, options);
  const resize = new ResizeObserver(() => {
    if (track.clientWidth && track.clientWidth !== width) { width = track.clientWidth; scrollToSlot(index + offset, true); }
  });
  scrollToSlot(offset, true); resize.observe(track); paint();
  return () => { controller.abort(); resize.disconnect(); clearTimeout(suppressTimer); clearTimeout(settleTimer); };
}
function gallery(project) {
  const compact = project.id === 'cellwave' ? 'compact-gallery' : project.id === 'liftoff' ? 'liftoff-gallery' : '';
  return `<section class="case-section"><h3>${project.id === 'cellwave' ? 'In the lab' : 'Project gallery'}</h3><div class="gallery-grid ${compact}">${project.gallery.map((item, index) => imageFigure(item, index === 0 && project.id !== 'liftoff' ? 'featured' : '')).join('')}</div></section>`;
}
function videoFigure(src, caption, poster = '') {
  return `<figure class="video-frame"><video controls playsinline preload="metadata" src="${src}" ${poster ? `poster="${poster}"` : ''}></video><figcaption>${escapeHTML(caption)}</figcaption></figure>`;
}
function documents(project) {
  if (!project.documents.length) return '';
  return `<section class="case-section"><h3>Reports & presentations</h3><div class="doc-grid">${project.documents.map(doc => `
    <a class="doc-link" href="${doc.href}" target="_blank" rel="noreferrer"><img src="${doc.preview}" alt="" loading="lazy" width="110" height="90"><div><strong>${escapeHTML(doc.title)}</strong><span>${escapeHTML(doc.meta)}</span></div>${icon('arrow-up-right')}</a>`).join('')}</div></section>`;
}
function renderMedia(project, imagesInGallery = false) {
  if (project.media === 'verbasense') return `<section class="case-section"><h3>The feedback system in action</h3>${videoFigure('assets/projects/verbasense/demo-compressed.mp4', 'Verbasense prototype demonstration.', 'assets/projects/verbasense/poster.jpg')}</section>${gallery(project)}`;
  if (project.media === 'cellwave') return `
    <section class="case-section alignment-section"><div class="media-section-heading alignment-heading"><h3>Cartridge Alignment Program</h3><div><button class="icon-button" type="button" data-replay-alignment aria-label="Replay all alignment videos" title="Replay all alignment videos">${icon('rotate-ccw')}</button><button class="icon-button" type="button" data-pause-alignment aria-label="Pause all alignment videos" title="Pause all alignment videos">${icon('pause')}</button></div></div>
      <div class="alignment-grid">${['media1.mp4', 'media2.mp4', 'media3-2x.mp4'].map((file, i) => `<figure><video data-visible-play controls muted playsinline preload="metadata" poster="assets/thumbnails/alignment-${i + 1}.jpg" src="assets/projects/cellwave/videos/${file}"></video><figcaption>${['1st run', '2nd run', '3rd run · 2x speed'][i]}</figcaption></figure>`).join('')}</div>
    </section>
    ${imagesInGallery ? '' : `<section class="case-section"><h3>From hand-cut parts to repeatable moulding</h3><p>I proposed casting the PDMS parts in a mould, then tested successive PLA and resin iterations. The resulting workflow was adopted into standard procedure.</p><div class="before-after">
      ${imageFigure({ src: 'assets/projects/cellwave/old-pdms-cutting.jpg', caption: 'Before: manual cutting and punching.' })}
      ${imageFigure({ src: 'assets/projects/cellwave/pdms-mould-3.jpg', caption: 'After: a PDMS part from the mould development process.' })}
    </div></section>${gallery(project)}`}`;
  if (project.media === 'wbgt') return `
    <section class="case-section"><h3>A closer look at the prototype</h3><div class="product-viewer">
      <div class="product-track">${project.views.map(view => imageFigure(view)).join('')}</div>
      <div class="product-controls"><button class="icon-button" type="button" data-product-prev aria-label="Previous product view" title="Previous view">${icon('chevron-left')}</button>
      <div class="product-dots">${project.views.map((view, i) => `<button class="product-dot" type="button" data-product-dot="${i}" aria-current="${i === 0}" aria-label="Show ${view.label.toLowerCase()} view"><img src="${view.src}" alt="" loading="lazy"><span>${view.label}</span></button>`).join('')}</div>
      <button class="icon-button" type="button" data-product-next aria-label="Next product view" title="Next view">${icon('chevron-right')}</button></div>
    </div></section>${gallery(project)}`;
  if (project.media === 'snoreless') return `
    <section class="case-section"><h3>The concept & its recognition</h3>
      <div class="spread-row">${imageFigure({ src: 'assets/previews/snoreless/snoreless-poster1.jpg', caption: 'Snoreless project poster.' })}${imageFigure({ src: 'assets/projects/snoreless/prototype.jpg', caption: 'Presenting Snoreless at ARTSIC.' })}</div>
      <div class="award-row">${imageFigure({ src: 'assets/previews/snoreless/merit-best-poster-award1.jpg', caption: 'Merit & Best Poster Award' })}
      <figure><a class="document-preview" href="assets/documents/snoreless/final-slides.pdf" target="_blank" rel="noreferrer"><img src="assets/previews/snoreless/slides-cover.jpg" alt="Snoreless presentation preview" loading="lazy"><span>View the presentation ${icon('arrow-up-right')}</span></a><figcaption>Design and presentation slides.</figcaption></figure></div>
    </section>${gallery(project)}`;
  if (project.media === 'liftoff') return `
    <section class="case-section"><h3>A seat that helps you stand</h3><div class="poster-pair">
      <figure><div class="ratio-media"><button class="media-button" type="button" data-image="assets/previews/liftoff/liftoff-poster1.jpg" data-caption="LiftOff project poster" aria-label="Enlarge LiftOff project poster"><img src="assets/previews/liftoff/liftoff-poster1.jpg" alt="LiftOff project poster" loading="lazy"><span class="media-zoom">${icon('maximize-2')}</span></button></div><figcaption>The mechanism and project overview.</figcaption></figure>
      <figure><div class="ratio-media"><video data-match-ratio controls playsinline preload="metadata" src="assets/projects/liftoff/working-video.mp4" poster="assets/thumbnails/liftoff-demo.jpg"></video></div><figcaption>Original working-prototype demonstration.</figcaption></figure>
    </div></section>${gallery(project)}`;
  return imagesInGallery ? '' : `<section class="case-section"><h3>From sketch to Blender</h3><div class="slide-grid">
    ${imageFigure({ src: 'assets/previews/kokoni/moxin-slide21.jpg', caption: 'The workflow: initial sketch, KOKONI AI, and an editable Blender model. Slide 21.' })}
    ${imageFigure({ src: 'assets/previews/kokoni/moxin-slide25.jpg', caption: 'The Blender plug-in. Slide 25.' })}
    ${imageFigure({ src: 'assets/previews/kokoni/moxin-slide26.jpg', caption: 'Image-to-model results in Blender. Slide 26.' })}
    </div></section>${gallery(project)}`;
}
function renderCase(project, fullPage = false) {
  const heading = fullPage ? 'h1' : 'h2';
  return `<header class="case-header"><p class="section-label">${escapeHTML(project.category)}</p><${heading} id="${fullPage ? 'project-title' : 'modal-title'}">${escapeHTML(project.title)}</${heading}>
    <p class="case-summary">${escapeHTML(project.summary)}</p><p class="case-outcome">${icon(project.id === 'snoreless' ? 'award' : 'check-circle-2')}${escapeHTML(project.outcome)}</p>
    <dl class="case-meta"><div><dt>Context</dt><dd>${escapeHTML(project.context)}</dd></div><div><dt>Focus</dt><dd>${escapeHTML(project.role)}</dd></div><div><dt>Tools & methods</dt><dd>${project.tags.map(escapeHTML).join(' · ')}</dd></div></dl></header>
    <div class="case-story"><section><h3>The problem</h3><p>${escapeHTML(project.problem)}</p></section><section><h3>${escapeHTML(project.contributionTitle)}</h3><p>${escapeHTML(project.contribution)}</p></section><section><h3>The result</h3><p>${escapeHTML(project.result)}</p></section></div>
    ${renderMedia(project)}${documents(project)}
    <div class="case-page-footer"><a class="text-link" href="mailto:fujie.chin@gmail.com">Discuss this project ${icon('arrow-up-right')}</a><button class="button" type="button" data-copy-project="${project.id}">${icon('link')} Copy project link</button><span class="muted" data-copy-status role="status"></span></div>`;
}

function setupCaseMedia(root, scrollRoot = null) {
  const cleanups = [];
  root.querySelectorAll('[data-image-gallery]').forEach(viewer => cleanups.push(setupImageGallery(viewer)));
  const videos = [...root.querySelectorAll('video')];
  const visibilityVideos = [...root.querySelectorAll('[data-visible-play]')];
  const states = new Map(visibilityVideos.map(video => [video, { started: false, visible: false, visibilityPaused: false, userPaused: false }]));
  const pauseAlignment = root.querySelector('[data-pause-alignment]');
  function paintAlignment() {
    if (!pauseAlignment) return;
    const paused = visibilityVideos.every(video => video.paused || video.ended);
    const label = `${paused ? 'Play' : 'Pause'} all alignment videos`;
    pauseAlignment.setAttribute('aria-label', label); pauseAlignment.title = label;
    pauseAlignment.innerHTML = icon(paused ? 'play' : 'pause'); refreshIcons();
  }
  const sizeAlignmentControls = () => visibilityVideos.forEach(video => { video.controls = !phoneLayout.matches; });
  sizeAlignmentControls();
  phoneLayout.addEventListener('change', sizeAlignmentControls);
  async function play(video, state) {
    try { await video.play(); state.started = true; state.visibilityPaused = false; } catch { /* Shared and native controls remain available when autoplay is blocked. */ }
    paintAlignment();
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const video = entry.target;
      const state = states.get(video);
      state.visible = entry.isIntersecting && entry.intersectionRatio >= .35;
      if (state.visible && !reducedMotion.matches && !document.hidden && !state.userPaused && !video.ended && (!state.started || state.visibilityPaused)) play(video, state);
      else if (!state.visible && !video.paused) { state.visibilityPaused = true; video.pause(); }
    }
  }, { root: scrollRoot, threshold: [0, .35] });
  visibilityVideos.forEach(video => {
    const state = states.get(video);
    video.addEventListener('pause', () => { if (state.visible && !state.visibilityPaused && !video.ended) state.userPaused = true; paintAlignment(); });
    video.addEventListener('play', () => { state.started = true; state.userPaused = false; paintAlignment(); });
    video.addEventListener('ended', paintAlignment);
    observer.observe(video);
  });
  root.querySelector('[data-replay-alignment]')?.addEventListener('click', () => {
    visibilityVideos.forEach(video => { const state = states.get(video); state.userPaused = false; state.visibilityPaused = false; video.currentTime = 0; play(video, state); });
  });
  root.querySelector('[data-pause-alignment]')?.addEventListener('click', () => {
    if (visibilityVideos.every(video => video.paused || video.ended)) {
      const restart = visibilityVideos.every(video => video.ended);
      visibilityVideos.forEach(video => {
        if (restart) video.currentTime = 0;
        if (!video.ended) { states.get(video).userPaused = false; play(video, states.get(video)); }
      });
    } else visibilityVideos.forEach(video => { states.get(video).userPaused = true; video.pause(); });
    paintAlignment();
  });
  const visibilityChange = () => {
    if (document.hidden) visibilityVideos.forEach(video => { if (!video.paused) { states.get(video).visibilityPaused = true; video.pause(); } });
    else visibilityVideos.forEach(video => { const state = states.get(video); if (state.visible && state.visibilityPaused && !state.userPaused && !reducedMotion.matches) play(video, state); });
  };
  document.addEventListener('visibilitychange', visibilityChange);
  const motionChange = () => { if (reducedMotion.matches) visibilityVideos.forEach(video => video.pause()); };
  reducedMotion.addEventListener('change', motionChange);
  root.querySelectorAll('[data-match-ratio]').forEach(video => {
    const setRatio = () => { if (video.videoWidth && video.videoHeight) video.closest('.poster-pair').style.setProperty('--video-ratio', video.videoWidth / video.videoHeight); };
    video.addEventListener('loadedmetadata', setRatio);
    setRatio();
  });
  const viewer = root.querySelector('.product-viewer');
  if (viewer) {
    const track = viewer.querySelector('.product-track');
    const dots = [...viewer.querySelectorAll('[data-product-dot]')];
    let index = 0;
    const paint = () => {
      index = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
      viewer.querySelector('[data-product-prev]').disabled = index === 0;
      viewer.querySelector('[data-product-next]').disabled = index === dots.length - 1;
    };
    const go = next => track.scrollTo({ left: Math.max(0, Math.min(dots.length - 1, next)) * track.clientWidth, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    viewer.addEventListener('click', event => {
      const dot = event.target.closest('[data-product-dot]');
      if (dot) go(Number(dot.dataset.productDot));
      if (event.target.closest('[data-product-prev]')) go(index - 1);
      if (event.target.closest('[data-product-next]')) go(index + 1);
    });
    viewer.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); go(index + (event.key === 'ArrowRight' ? 1 : -1)); }
    });
    track.addEventListener('scroll', paint, { passive: true });
    paint();
  }
  paintAlignment();
  cleanups.push(() => observer.disconnect(), () => document.removeEventListener('visibilitychange', visibilityChange), () => reducedMotion.removeEventListener('change', motionChange), () => phoneLayout.removeEventListener('change', sizeAlignmentControls));
  return () => { cleanups.forEach(cleanup => cleanup()); videos.forEach(video => video.pause()); };
}

function openProject(id, updateHistory = true) {
  const project = getProject(id);
  if (!project || !modal) return;
  mediaCleanup();
  if (updateHistory) {
    history.replaceState({ ...history.state, portfolioScroll: window.scrollY }, '');
    history.pushState({ projectDialog: id }, '', '#project-' + id);
  }
  dialogOwnsHistory = updateHistory || Boolean(history.state?.projectDialog);
  document.querySelector('#modal-content').innerHTML = renderCase(project);
  document.querySelector('#full-project-link').href = projectURL(id);
  modal.dataset.project = id;
  if (!modal.open) modal.showModal();
  modal.scrollTop = 0;
  document.body.classList.add('dialog-open');
  mediaCleanup = setupCaseMedia(document.querySelector('#modal-content'), modal);
  refreshIcons();
  carousels.forEach(carousel => carousel.refresh());
}
function closeProject() {
  if (dialogOwnsHistory && history.state?.projectDialog) history.back();
  else {
    modal?.close();
    if (location.hash.startsWith('#project-')) history.replaceState({}, '', '#projects');
  }
}
modal?.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
modal?.addEventListener('close', () => {
  mediaCleanup();
  mediaCleanup = () => {};
  document.querySelector('#modal-content').innerHTML = '';
  if (!lightbox?.open) document.body.classList.remove('dialog-open');
  carousels.forEach(carousel => carousel.refresh());
});
lightbox?.addEventListener('close', () => {
  document.querySelector('#lightbox-image').removeAttribute('src');
  if (!modal?.open) document.body.classList.remove('dialog-open');
});
for (const dialog of [modal, lightbox].filter(Boolean)) {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
      if (dialog === modal) closeProject(); else lightbox.close();
    }
  });
}

document.addEventListener('click', async event => {
  if (event.defaultPrevented) return;
  const opener = event.target.closest('[data-open-project]');
  if (opener && modal && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
    event.preventDefault();
    openProject(opener.dataset.openProject);
    return;
  }
  if (event.target.closest('[data-close-project]')) closeProject();
  if (event.target.closest('[data-close-lightbox]')) lightbox.close();
  const image = event.target.closest('[data-image]');
  if (image && lightbox) {
    const imageElement = document.querySelector('#lightbox-image');
    imageElement.src = image.dataset.image;
    imageElement.alt = image.dataset.caption;
    document.querySelector('#lightbox-caption').textContent = image.dataset.caption;
    lightbox.showModal();
    document.body.classList.add('dialog-open');
  }
  const filter = event.target.closest('[data-filter]');
  if (filter) {
    const anchor = document.querySelector('.library-header');
    const oldTop = anchor.getBoundingClientRect().top;
    document.querySelectorAll('[data-filter]').forEach(button => {
      button.classList.toggle('active', button === filter);
      button.setAttribute('aria-pressed', String(button === filter));
    });
    renderProjects(filter.dataset.filter);
    const delta = anchor.getBoundingClientRect().top - oldTop;
    if (Math.abs(delta) > 1) window.scrollBy({ top: delta, behavior: 'instant' });
  }
  const copy = event.target.closest('[data-copy-project]');
  if (copy) {
    const url = new URL(projectURL(copy.dataset.copyProject), location.href);
    const status = copy.parentElement.querySelector('[data-copy-status]');
    try { await navigator.clipboard.writeText(url.href); status.textContent = 'Link copied'; }
    catch {
      status.innerHTML = '<input aria-label="Project link" readonly>';
      const input = status.querySelector('input');
      input.value = url.href;
      input.focus();
      input.select();
    }
  }
});

renderHome();
setupProfile();
setupNavigation();
const projectPage = document.querySelector('#project-page-content');
if (projectPage) {
  const project = getProject(new URLSearchParams(location.search).get('project'));
  if (project) {
    document.title = project.title + ' | Chin Fu Jie';
    document.querySelector('meta[name="description"]').content = project.summary;
    projectPage.innerHTML = renderCase(project, true);
    mediaCleanup = setupCaseMedia(projectPage);
  } else {
    document.title = 'Project not found | Chin Fu Jie';
    projectPage.innerHTML = '<div class="empty-state"><h1>Project not found.</h1><p>Explore the portfolio to find a project.</p><a class="button primary" href="index.html#compiled">View projects</a></div>';
  }
}
window.addEventListener('popstate', () => {
  if (location.hash.startsWith('#project-')) openProject(location.hash.slice(9), false);
});
if (location.hash.startsWith('#project-')) openProject(location.hash.slice(9), false);
refreshIcons();
