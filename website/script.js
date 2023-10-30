const bar = document.getElementById("header"),
  scroll_down = document.getElementById("scroll-down");
let startProductBarPos = -1;

const sections = [
  document.getElementById("section-singapore"),
  document.getElementById("section-sport"),
  document.getElementById("section-scouting"),
  document.getElementById("section-family"),
  document.getElementById("section-programmeren"),
];

window.onscroll = function () {
  if (startProductBarPos < 0) startProductBarPos = findPosY(bar);

  if (pageYOffset > startProductBarPos) {
    bar.style.position = "fixed";
    bar.style.top = 0;
    sections[0].style.height = "450px";
    sections[0].style.paddingTop = "70px";
  } else {
    bar.style.position = "relative";
    sections[0].style.height = "400px";
    sections[0].style.paddingTop = "20px";
  }
};

function findPosY(obj) {
  let curtop = 0;
  if (typeof obj.offsetParent != "undefined" && obj.offsetParent) {
    while (obj.offsetParent) {
      curtop += obj.offsetTop;
      obj = obj.offsetParent;
    }
    curtop += obj.offsetTop;
  } else if (obj.y) curtop += obj.y;
  return curtop;
}

function scrollDown() {
  window.scrollTo(0, window.innerHeight);
}

function scrollToElem(elemNum) {
  sections[elemNum].scrollIntoView({ block: "center" });
}
