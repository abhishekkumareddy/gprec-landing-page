// Theme: respect system, allow toggle, store preference
(function(){
  const root = document.documentElement;
  const stored = localStorage.getItem('gt-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    localStorage.setItem('gt-theme', current);
  });
})();

// AOS init (subtle)
AOS.init({ duration: 800, once: true });

// Update nav active state based on scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('section[id]')];
  const links = [...document.querySelectorAll('.nav-link[href^="#"]')];

  function onScroll(){
    const y = window.scrollY + 120;
    let activeId = sections[0]?.id;
    for (const s of sections){
      if (y >= s.offsetTop) activeId = s.id;
    }
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});
