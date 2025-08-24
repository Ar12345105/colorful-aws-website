// --- Random & Manual Color Picker Functionality ---
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function randomize() {
  const c1 = randomColor();
  const c2 = randomColor();
  const c3 = randomColor();
  document.body.style.background = `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;
}

function applyColors() {
  const c1 = document.getElementById("color1").value;
  const c2 = document.getElementById("color2").value;
  const c3 = document.getElementById("color3").value;
  document.body.style.background = `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;
}

// --- Hue Slider & Theme Toggle ---
const hue = document.getElementById('hue');
const toggle = document.getElementById('toggle-theme');
const root = document.documentElement;

function setHue(val){
  root.style.setProperty('--hue', val);
  localStorage.setItem('hue', val);
}

function setTheme(mode){
  if(mode === 'dark'){
    root.classList.add('dark');
    toggle.textContent = 'Light';
    toggle.setAttribute('aria-pressed', 'true');
  } else {
    root.classList.remove('dark');
    toggle.textContent = 'Dark';
    toggle.setAttribute('aria-pressed', 'false');
  }
  localStorage.setItem('theme', mode);
}

hue.addEventListener('input', e => setHue(e.target.value));
toggle.addEventListener('click', () => {
  const isDark = root.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

// --- Load Saved Preferences ---
(() => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const savedHue = localStorage.getItem('hue');
  if(savedHue) { hue.value = savedHue; setHue(savedHue); }

  const savedTheme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);
})();
