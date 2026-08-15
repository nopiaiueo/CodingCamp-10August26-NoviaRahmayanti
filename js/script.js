// 1. JAM REAL-TIME & SAPAAN
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  
  // Format jam 00:00:00
  const timeString = now.toLocaleTimeString('id-ID');
  document.getElementById('clock').innerText = timeString;
  
  // Logic Sapaan
  let greet = "Selamat Malam";
  if (hours >= 5 && hours < 12) greet = "Selamat Pagi";
  else if (hours >= 12 && hours < 15) greet = "Selamat Siang";
  else if (hours >= 15 && hours < 18) greet = "Selamat Sore";
  
  document.getElementById('greeting').innerText = greet;
}

// Jalankan jam setiap 1 detik
setInterval(updateClock, 1000);
updateClock();


// 2. FOCUS TIMER (25 MENIT)
let timeLeft = 25 * 60; // 25 menit dalam detik
let timerInterval = null;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  // Menambahkan angka 0 di depan jika < 10 (contoh: 09:05)
  timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Tombol Start
startBtn.addEventListener('click', () => {
  if (timerInterval !== null) return; // Mencegah klik ganda
  
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

// Tombol Stop
stopBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

// Tombol Reset
resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timeLeft = 25 * 60;
  updateTimerDisplay();
});

// Jalankan tampilan awal timer
updateTimerDisplay();
