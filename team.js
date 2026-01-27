/* Team carousel — remove this file + the <script> tag to disable */
(function () {
  const track = document.getElementById('teamTrack');
  const prevBtn = document.getElementById('teamPrev');
  const nextBtn = document.getElementById('teamNext');
  const dotsWrap = document.getElementById('teamDots');
  if (!track) return;

  const cards = track.querySelectorAll('.team-card');
  const cardCount = cards.length;
  let dotCount = 0;

  function getVisibleCount() {
    const cardW = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    return Math.floor((track.offsetWidth + gap) / (cardW + gap));
  }

  function buildDots() {
    const visible = getVisibleCount();
    dotCount = Math.max(1, cardCount - visible + 1);
    dotsWrap.innerHTML = '';
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('span');
      dot.className = 'team-dot' + (i === 0 ? ' active' : '');
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll('.team-dot');
    if (!dots.length) return;
    const cardW = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    const idx = Math.round(track.scrollLeft / (cardW + gap));
    dots.forEach((d, i) => d.classList.toggle('active', i === Math.min(idx, dotCount - 1)));
  }

  function scrollBy(dir) {
    const cardW = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(track).gap) || 24;
    track.scrollBy({ left: dir * (cardW + gap), behavior: 'smooth' });
  }

  prevBtn?.addEventListener('click', () => scrollBy(-1));
  nextBtn?.addEventListener('click', () => scrollBy(1));
  track.addEventListener('scroll', updateDots, { passive: true });

  buildDots();
  window.addEventListener('resize', buildDots);
})();
