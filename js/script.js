// 1. SAPAAN NAMA KUSTOM & JAM REAL-TIME (Challenge 1)
const userName = "Novia"; // Nama Kustom Kamu

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  
  document.getElementById('clock').innerText = now.toLocaleTimeString('id-ID');
  
  let greet = "Selamat Malam";
  if (hours >= 5 && hours < 12) greet = "Selamat Pagi";
  else if (hours >= 12 && hours < 15) greet = "Selamat Siang";
  else if (hours >= 15 && hours < 18) greet = "Selamat Sore";
  
  document.getElementById('greeting').innerText = `${greet}, ${userName}! ✨`;
}
setInterval(updateClock, 1000);
updateClock();

// 2. LIGHT / DARK MODE (Challenge 2)
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  themeToggleBtn.innerText = isDark ? "☀️ Mode Terang" : "🌙 Mode Gelap";
});

// 3. FOCUS TIMER & EDIT DURASI (Challenge 3)
let defaultMinutes = 25;
let timeLeft = defaultMinutes * 60;
let timerInterval = null;

const timerDisplay = document.getElementById('timer');
const timerLabel = document.getElementById('timer-label');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function setTimerDuration(mins) {
  clearInterval(timerInterval);
  timerInterval = null;
  defaultMinutes = mins;
  timeLeft = mins * 60;
  timerLabel.innerText = mins;
  updateTimerDisplay();
}

document.getElementById('start-btn').addEventListener('click', () => {
  if (timerInterval !== null) return;
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Waktu fokus selesai!");
    }
  }, 1000);
});

document.getElementById('stop-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

document.getElementById('reset-btn').addEventListener('click', () => {
  setTimerDuration(defaultMinutes);
});

updateTimerDisplay();

// 4. TO-DO LIST (LOCAL STORAGE)
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('myDashboardTasks')) || [];

function saveAndRenderTasks() {
  localStorage.setItem('myDashboardTasks', JSON.stringify(tasks));
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.innerText = task.text;
    if (task.completed) {
      span.style.textDecoration = 'line-through';
      span.style.opacity = '0.6';
    }
    span.style.cursor = 'pointer';
    span.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveAndRenderTasks();
    };
    
    const delBtn = document.createElement('button');
    delBtn.innerText = '🗑️';
    delBtn.className = 'btn-danger';
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveAndRenderTasks();
    };
    
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

document.getElementById('add-btn').onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return alert("Ketik tugasnya dulu ya!");
  tasks.push({ text: text, completed: false });
  taskInput.value = '';
  saveAndRenderTasks();
};
saveAndRenderTasks();

// 5. QUICK LINKS (LOCAL STORAGE)
const linkNameInput = document.getElementById('link-name');
const linkUrlInput = document.getElementById('link-url');
const linksContainer = document.getElementById('quick-links-container');
let quickLinks = JSON.parse(localStorage.getItem('myDashboardLinks')) || [
  { name: 'Google', url: 'https://google.com' },
  { name: 'GitHub', url: 'https://github.com' }
];

function saveAndRenderLinks() {
  localStorage.setItem('myDashboardLinks', JSON.stringify(quickLinks));
  linksContainer.innerHTML = '';
  
  quickLinks.forEach((link) => {
    const a = document.createElement('a');
    a.href = link.url.startsWith('http') ? link.url : `https://${link.url}`;
    a.target = '_blank';
    a.className = 'link-btn';
    a.innerText = link.name;
    linksContainer.appendChild(a);
  });
}

document.getElementById('add-link-btn').onclick = () => {
  const name = linkNameInput.value.trim();
  const url = linkUrlInput.value.trim();
  if (!name || !url) return alert("Isi nama dan URL websitenya!");
  quickLinks.push({ name, url });
  linkNameInput.value = '';
  linkUrlInput.value = '';
  saveAndRenderLinks();
};
saveAndRenderLinks();
