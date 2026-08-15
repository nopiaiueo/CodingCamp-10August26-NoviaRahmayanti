// 1. JAM REAL-TIME & SAPAAN
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  
  const timeString = now.toLocaleTimeString('id-ID');
  document.getElementById('clock').innerText = timeString;
  
  let greet = "Selamat Malam";
  if (hours >= 5 && hours < 12) greet = "Selamat Pagi";
  else if (hours >= 12 && hours < 15) greet = "Selamat Siang";
  else if (hours >= 15 && hours < 18) greet = "Selamat Sore";
  
  document.getElementById('greeting').innerText = greet;
}
setInterval(updateClock, 1000);
updateClock();

// 2. FOCUS TIMER (25 MENIT)
let timeLeft = 25 * 60;
let timerInterval = null;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
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

stopBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 25 * 60;
  updateTimerDisplay();
});

updateTimerDisplay();

// 3. TO-DO LIST (BISA TAMBAH, HAPUS, & DISIMPAN)
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Ambil tugas dari LocalStorage saat halaman dimuat
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function saveAndRenderTasks() {
  localStorage.setItem('myTasks', JSON.stringify(tasks));
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.margin = '8px 0';
    
    // Teks Tugas (Bisa diklik untuk tandai selesai)
    const taskSpan = document.createElement('span');
    taskSpan.innerText = task.text;
    if (task.completed) {
      taskSpan.style.textDecoration = 'line-through';
      taskSpan.style.color = 'gray';
    }
    taskSpan.style.cursor = 'pointer';
    taskSpan.addEventListener('click', () => toggleTask(index));
    
    // Tombol Hapus
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '❌';
    deleteBtn.style.padding = '2px 6px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.addEventListener('click', () => deleteTask(index));
    
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Fungsi Tambah Tugas
function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return alert('Ketik tugasnya dulu ya!');
  
  tasks.push({ text: text, completed: false });
  taskInput.value = '';
  saveAndRenderTasks();
}

// Fungsi Tandai Selesai / Belum
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRenderTasks();
}

// Fungsi Hapus Tugas
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRenderTasks();
}

// Listener Tombol Tambah & Tombol Enter
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Tampilkan tugas yang ada saat pertama kali dibuka
saveAndRenderTasks();
