// 1. CLOCK & DATE & GREETING
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  
  // Format Jam
  const timeString = now.toLocaleTimeString('en-US', { hour12: false });
  document.getElementById('clock').innerText = timeString;
  
  // Format Tanggal
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').innerText = now.toLocaleDateString('en-US', options);
  
  // Greeting
  let greet = "Good Evening";
  if (hours >= 5 && hours < 12) greet = "Good Morning";
  else if (hours >= 12 && hours < 17) greet = "Good Afternoon";
  
  document.getElementById('greeting').innerText = greet;
}
setInterval(updateClock, 1000);
updateClock();

// 2. FOCUS TIMER
let timeLeft = 25 * 60;
let timerInterval = null;

const timerDisplay = document.getElementById('timer');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
      alert("Timer finished!");
    }
  }, 1000);
});

document.getElementById('stop-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

document.getElementById('reset-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 25 * 60;
  updateTimerDisplay();
});
updateTimerDisplay();

// 3. TASKS
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem('myDashboardTasks')) || [
  { text: 'belanja', completed: false },
  { text: 'belajar', completed: false }
];

function saveAndRenderTasks() {
  localStorage.setItem('myDashboardTasks', JSON.stringify(tasks));
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    const leftDiv = document.createElement('div');
    leftDiv.className = 'task-left';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveAndRenderTasks();
    };
    
    const span = document.createElement('span');
    span.className = `task-text ${task.completed ? 'completed' : ''}`;
    span.innerText = task.text;
    
    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);
    
    const delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';
    delBtn.className = 'btn btn-danger';
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveAndRenderTasks();
    };
    
    li.appendChild(leftDiv);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

document.getElementById('add-task-btn').onclick = () => {
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ text: text, completed: false });
  taskInput.value = '';
  saveAndRenderTasks();
};
saveAndRenderTasks();

// 4. QUICK LINKS
const linkNameInput = document.getElementById('link-name');
const linkUrlInput = document.getElementById('link-url');
const linksContainer = document.getElementById('quick-links-container');
let quickLinks = JSON.parse(localStorage.getItem('myDashboardLinks')) || [
  { name: 'Google', url: 'https://google.com' },
  { name: 'Gmail', url: 'https://mail.google.com' },
  { name: 'Calendar', url: 'https://calendar.google.com' }
];

function saveAndRenderLinks() {
  localStorage.setItem('myDashboardLinks', JSON.stringify(quickLinks));
  linksContainer.innerHTML = '';
  
  quickLinks.forEach((link, index) => {
    const chip = document.createElement('div');
    chip.className = 'link-chip';
    
    const a = document.createElement('a');
    a.href = link.url.startsWith('http') ? link.url : `https://${link.url}`;
    a.target = '_blank';
    a.style.color = 'white';
    a.style.textDecoration = 'none';
    a.innerText = link.name;
    
    const removeBtn = document.createElement('span');
    removeBtn.className = 'remove-link';
    removeBtn.innerText = '✕';
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      quickLinks.splice(index, 1);
      saveAndRenderLinks();
    };
    
    chip.appendChild(a);
    chip.appendChild(removeBtn);
    linksContainer.appendChild(chip);
  });
}

document.getElementById('add-link-btn').onclick = () => {
  const name = linkNameInput.value.trim();
  const url = linkUrlInput.value.trim();
  if (!name || !url) return;
  quickLinks.push({ name, url });
  linkNameInput.value = '';
  linkUrlInput.value = '';
  saveAndRenderLinks();
};
saveAndRenderLinks();
