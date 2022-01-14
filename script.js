const THROTTLE_MS = 0;
let lastTime, pathSel, alt;

const x = d3.scaleLinear(
  [200, 0],
  [0, innerWidth]
);
const y = d3.scaleLinear(
  [0, document.body.scrollHeight],
  [0, innerHeight]
);
const area = d3.area(
  (d, i, arr) => x(arr.length - i - 1),
  d => y(d.y0),
  d => y(d.y1)
)

const positions = [];

window.addEventListener("scroll", function(e) {
  const time = new Date();
  if (time - lastTime < THROTTLE_MS) return;
  if (alt) {
    const {y0} = positions.pop();
    window.scroll(0, y0);
  } else {
    positions.push({
      y0: scrollY, 
      y1: scrollY + innerHeight,
      time
    });
  }
  lastTime = time;
  render();
})

window.addEventListener("keydown", function(e) {
  if (e.key === "Alt") alt = true;
})

window.addEventListener("keyup", function(e) {
  if (e.key === "Alt") alt = false;
})

init();

function init() {
  pathSel = d3.select("body").append("svg").append("path");
}

function render() {
  pathSel.attr("d", area(positions))
}

