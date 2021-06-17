"use strict";
//GLOBAL VARIABLES
let drawingActive = false;
let penActive = "blackPen";
//DOM Selectors
const drawingGrid = document.querySelector(".drawing-grid");
const mainWrapper = document.querySelector(".main-wrapper");
const blackPen = document.querySelector(".btn-set-black-pan");
const rainbowPen = document.querySelector(".btn-set-rainbow-pen");
const shadePen = document.querySelector(".btn-set-shade-pen");
const eraserPen = document.querySelector(".btn-set-eraser-pen");
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

function blackColor() {
  return `rgb(70, 70, 70)`;
}
function randomNumber(number) {
  return Math.floor(Math.random() * number);
}
function rainbowColor() {
  return `rgb(${randomNumber(255)}, ${randomNumber(255)}, ${randomNumber(
    255
  )})`;
}
function gridColor(color = "rgb(241, 204, 204)") {
  return color;
}
function getRgbValues(element) {
  return element.style.backgroundColor
    .match(/rgb\((\d+),\s(\d+),\s(\d+)\)/)
    .slice(1)
    .map((value) => Number(value));
}
function subtractColorValue(value, amount) {
  return value - amount > 0 ? value - amount : 0;
}
function addShadeColor(block) {
  if (block.style.backgroundColor === gridColor()) return `rgb(200, 200, 200)`;
  const [red, green, blue] = getRgbValues(block);
  return `rgb(
      ${subtractColorValue(red, 20)}, 
      ${subtractColorValue(green, 20)},
      ${subtractColorValue(blue, 20)})`;
}

//INFO MODAL LOGIC
const btnOpenModal = document.querySelector(".btn-open-modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const infoModal = document.querySelector(".info-modal");
function toggleHiddenClass(element) {
  element.classList.toggle("hidden");
}
btnOpenModal.addEventListener("click", function () {
  infoModal.classList.remove("hidden");
});
btnCloseModal.addEventListener("click", function () {
  infoModal.classList.add("hidden");
});
// Buttons Event Handlers
blackPen.addEventListener("click", () => (penActive = "blackPen"));
rainbowPen.addEventListener("click", () => (penActive = "rainbowPen"));
shadePen.addEventListener("click", () => (penActive = "shadePen"));
eraserPen.addEventListener("click", () => (penActive = "eraserPen"));
resetBtn.addEventListener("click", function () {
  const gridSize = document.querySelector(".dimension-active").dataset.size;
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
makeGrid(drawingGrid, 32);
