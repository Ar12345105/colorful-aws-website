const hue = document.getElementById('hue');
const toggle = document.getElementById('toggle-theme');
const root = document.documentElement;

function setHue(val){
  root.style.setProperty('--hue', val);
  localStorage.setItem('hue', val);
}
function setTheme(mode){
  if(mode === 'dark'){
    root.classList.add('dark'); toggle.textContent = 'Light'; toggle.setAttribute('aria-pressed', 'true');
  } else {
    root.classList.remove('dark'); toggle.textContent = 'Dark'; toggle.setAttribute('aria-pressed', 'false');
  }
  localStorage.setItem('theme', mode);
}
hue.addEventListener('input', e => setHue(e.target.value));
toggle.addEventListener('click', () => {
  const isDark = root.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

// Load preferences
(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const savedHue = localStorage.getItem('hue'); if(savedHue) { hue.value = savedHue; setHue(savedHue); }
  const savedTheme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);
})();
