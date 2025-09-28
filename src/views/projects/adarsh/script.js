const songs = [
  { title: "Song 1", file: "songs/Jhol  Coke Studio Pakistan  Season 15  Maanu x Annural Khalid - Coke Studio Pakistan.mp3" },
  { title: "Song 2", file: "songs/Lokah - Promo Video Song 4K  Thani Lokah Murakkaari  Jakes Bejoy  Jyoti Nooran  Reble  MuRi - Dulquer Salmaan.mp3" },
  { title: "Song 3", file: "songs/Monica - Video Song  COOLIE  Superstar Rajinikanth  Sun Pictures  Lokesh  Anirudh  Pooja Hegde - Sun TV.mp3" }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const playlistEl = document.getElementById("playlist");

// Load playlist in UI
songs.forEach((song, index) => {
  const div = document.createElement("div");
  div.textContent = song.title;
  div.addEventListener("click", () => {
    currentSong = index;
    loadSong(currentSong);
    playSong();
  });
  playlistEl.appendChild(div);
});

function updatePlaylistUI() {
  [...playlistEl.children].forEach((el, i) => {
    el.classList.toggle("active", i === currentSong);
  });
}

function loadSong(index) {
  audio.src = songs[index].file;
  title.textContent = songs[index].title;
  updatePlaylistUI();
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶️";
}

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

// Load first song on start
loadSong(currentSong);
