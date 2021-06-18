"use strict";
//GLOBAL VARIABLES
let drawingActive = false;
let penActive = "blackPen";
let gridOnOff = false;
//DOM Selectors
const drawingGrid = document.querySelector(".drawing-grid");
const mainWrapper = document.querySelector(".main-wrapper");
const gridToggle = document.querySelector(".btn-toggle-grid");
const resetBtn = document.querySelector(".btn-reset-resize-grid");
const dimensionOptions = document.querySelectorAll(".dimension-option");
// CREATE GRID
function createGrid(gridElement, size) {
  gridElement.innerHTML = null;
  gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}
function fillGrid(gridElement, number) {
  const numOfElements = number ** 2;
  for (let i = 0; i < numOfElements; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.backgroundColor = gridColor();
    gridElement.insertAdjacentElement("beforeend", block);
    block.addEventListener("mouseenter", function (e) {
      if (drawingActive) colorGridBlock(e.target);
    });
  }
}
function makeGrid(gridElement, size) {
  createGrid(gridElement, size);
  fillGrid(gridElement, size);
}
// ACTIVATE / DEACTIVATE DRAWING WITH MOUSE HOLD
drawingGrid.addEventListener("mousedown", function (e) {
  e.preventDefault();
  drawingActive = true;
  colorGridBlock(e.target);
});
mainWrapper.addEventListener("mouseup", () => (drawingActive = false));
//GRID BLOCK BACKGROUND COLOR OPTIONS
function colorGridBlock(block) {
  if (penActive === "blackPen") block.style.backgroundColor = blackColor();
  else if (penActive === "rainbowPen")
    block.style.backgroundColor = rainbowColor();
  else if (penActive === "eraserPen") block.style.backgroundColor = gridColor();
  else if (penActive === "shadePen")
    block.style.backgroundColor = addShadeColor(block);
}
// Helper functions
const randRGB = () => Math.floor(Math.random() * 256);

function getRgbValues(element) {
  return element.style.backgroundColor
    .match(/rgb\((\d+),\s(\d+),\s(\d+)\)/)
    .slice(1)
    .map((value) => Number(value));
}

const calcColorValue = (value, amount) =>
  value - amount > 0 ? value - amount : 0;
// Color functions
const blackColor = () => `rgb(70, 70, 70)`;

const rainbowColor = () => `rgb(${randRGB()}, ${randRGB()}, ${randRGB()})`;

const gridColor = (color = "rgb(241, 204, 204)") => color;

function addShadeColor(block) {
  if (block.style.backgroundColor === gridColor()) return `rgb(200, 200, 200)`;
  const [red, green, blue] = getRgbValues(block);
  return `rgb(${calcColorValue(red, 20)}, ${calcColorValue(green, 20)},
      ${calcColorValue(blue, 20)})`;
}

//INFO MODAL LOGIC
const btnOpenModal = document.querySelector(".btn-open-modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const infoModal = document.querySelector(".info-modal");
const overlay = document.querySelector(".overlay");

btnOpenModal.addEventListener("click", function () {
  infoModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
btnCloseModal.addEventListener("click", function () {
  infoModal.classList.add("hidden");
  overlay.classList.add("hidden");
});
overlay.addEventListener("click", function () {
  infoModal.classList.add("hidden");
  overlay.classList.add("hidden");
});
//Grid toggle
function switchGridOn() {
  drawingGrid.style.gridGap = "1px";
  gridToggle.textContent = "Grid on";
  gridOnOff = true;
}
function switchGridOff() {
  drawingGrid.style.gridGap = "0px";
  gridToggle.textContent = "Grid off";
  gridOnOff = false;
}
gridToggle.addEventListener("click", function () {
  const dimension = document.querySelector(".dimension-active").dataset.size;
  !gridOnOff && +dimension !== 100 ? switchGridOn() : switchGridOff();
});
//activate pan
function activatePen(event) {
  const currentPen = event;
  const activePen = document.querySelector(".pen-active");
  activePen.classList.remove("pen-active");
  currentPen.classList.add("pen-active");
  return event.dataset.color;
}
// Buttons Event Handlers
const colorBtns = document.querySelectorAll(".btn-set-color");
for (let pen of colorBtns) {
  pen.addEventListener("click", (e) => (penActive = activatePen(e.target)));
}
resetBtn.addEventListener("click", function () {
  const gridSize = document.querySelector(".dimension-active").dataset.size;
  if (+gridSize === 100) switchGridOff();
  makeGrid(drawingGrid, gridSize);
});
//Dimension options
for (let option of dimensionOptions) {
  option.addEventListener("click", function (e) {
    const currentOption = e.target;
    const activeOption = document.querySelector(".dimension-active");
    activeOption.classList.remove("dimension-active");
    currentOption.classList.add("dimension-active");
  });
}
makeGrid(drawingGrid, 16);
