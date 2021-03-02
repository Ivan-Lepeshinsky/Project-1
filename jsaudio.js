let max = 100,
  player,
  song,
  fname,
  prev,
  play,
  next,
  bar,
  progress,
  volume,
  loop;

function init() {
  song = document.getElementById("song");
  fname = document.getElementById("fname");
  prev = document.getElementById("prev");
  play = document.getElementById("play");
  next = document.getElementById("next");
  bar = document.getElementById("bar");
  progress = document.getElementById("progress");
  volume = document.getElementById("volume");

  //   prev.addEventListener("click", back);
  play.addEventListener("click", push);
  next.addEventListener("click", nxt);
  bar.addEventListener("click", move);
  volume.addEventListener("change", level);
}
addEventListener("load", init);
addEventListener("load", dranddrpstrt);
function push() {
  if (!song.paused && !song.ended) {
    song.pause();
    play.innerHTML =
      '<span class="material-icons" id="play"> play_arrow </span>';
    clearInterval(loop);
  } else {
    song.play();
    play.innerHTML = '<span class="material-icons" id="play"> pause </span>';
    loop = setInterval(status, 1000);
  }
}
function status() {
  if (!song.ended) {
    let size = parseInt((song.currentTime * max) / song.duration);
    progress.style.width = `${size}px`;
  } else {
    progress.style.width = "0";
    play.innerHTML =
      '<span class="material-icons" id="play"> play_arrow </span>';
    clearInterval(loop);
  }
}
function move(e) {
  if (!song.ended) {
    let mouseX = e.pageX - bar.offsetLeft;
    let newTime = (mouseX * song.duration) / max;
    song.currentTime = newTime;
    progress.style.width = `${mouseX}px`;
  }
}

function level() {
  song.volume = volume.value;
}

let myList = "";
let list = "";
let div = "";
function dranddrpstrt() {
  myList = document.getElementById("playlist");
  myList.addEventListener("dragstart", function (e) {
    e.preventDefault();
    playlist.style.cssText = "visibility: visible";
  });
  myList.addEventListener("dragenter", function (e) {
    e.preventDefault();
  });
  myList.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  myList.addEventListener("drop", dropped);
}
function dropped(e) {
  e.preventDefault();
  list = e.dataTransfer.files;
  for (i = 0; i < list.length; i++)
    div += `<div onclick="namelist('${list[i].name}')">${list[i].name}</div>`;
  playlist.innerHTML = div;
}

function namelist(f) {
  fname.innerHTML = `Сейчас проигрывается:${f}`;
  song.src = `../media/${f}`;
  push();
}
function nxt() {
  r = song.src;
  push();
}
