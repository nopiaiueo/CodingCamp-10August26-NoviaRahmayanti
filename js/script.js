// Jam Real-time & Sapaan
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  document.getElementById('clock').innerText = now.toLocaleTimeString();
  
  let greet = "Selamat Malam";
  if (hours < 12) greet = "Selamat Pagi";
  else if (hours < 15) greet = "Selamat Siang";
  else if (hours < 18) greet = "Selamat Sore";
  
  document.getElementById('greeting').innerText = greet;
}
setInterval(updateClock, 1000);
updateClock();
