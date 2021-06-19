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
const colorPicker = document.querySelector(".color-picker");
// Info modal Selectors
const btnOpenModal = document.querySelector(".btn-open-modal");
const btnCloseModal = document.querySelector(".btn-close-modal");
const infoModal = document.querySelector(".info-modal");
const overlay = document.querySelector(".overlay");
// Pen buttons Selectors
const colorBtns = document.querySelectorAll(".btn-set-color");

// CREATE DRAWING GRID
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

// ACTIVATE / DEACTIVATE DRAWING ON MOUSEDOWN
drawingGrid.addEventListener("mousedown", function (e) {
  e.preventDefault();
  drawingActive = true;
  colorGridBlock(e.target);
});
mainWrapper.addEventListener("mouseup", () => (drawingActive = false));

//COLORING GRID BLOCKS DEPENDING ON WHAT PEN IS ACTIVE
function colorGridBlock(block) {
  if (penActive === "blackPen") block.style.backgroundColor = blackColor();
  else if (penActive === "rainbowPen")
    block.style.backgroundColor = rainbowColor();
  else if (penActive === "eraserPen") block.style.backgroundColor = gridColor();
  else if (penActive === "shadePen")
    block.style.backgroundColor = addShadeColor(block);
  else if (penActive === "customPen")
    block.style.backgroundColor = customColor();
}

// HELPER FUNCTIONS
const randRGB = () => Math.floor(Math.random() * 256);

function getRgbValues(element) {
  return element.style.backgroundColor
    .match(/rgb\((\d+),\s(\d+),\s(\d+)\)/)
    .slice(1)
    .map((value) => Number(value));
}

function hexColorToRgb(hex) {
  return `rgb(${parseInt("0x" + hex.slice(1, 3))}, 
              ${parseInt("0x" + hex.slice(3, 5))}, 
              ${parseInt("0x" + hex.slice(5))})`;
}

const calcColorValue = (value, amount) =>
  value - amount > 0 ? value - amount : 0;

// PEN COLOR VALUES
const blackColor = () => `rgb(70, 70, 70)`;

const rainbowColor = () => `rgb(${randRGB()}, ${randRGB()}, ${randRGB()})`;

const gridColor = (color = "rgb(241, 204, 204)") => color;
//Color input type returns hex values, but shade pen use rgb value
const customColor = () => hexColorToRgb(colorPicker.value);

function addShadeColor(block) {
  if (block.style.backgroundColor === gridColor()) return `rgb(200, 200, 200)`;
  const [red, green, blue] = getRgbValues(block);
  return `rgb(${calcColorValue(red, 20)}, ${calcColorValue(green, 20)},
      ${calcColorValue(blue, 20)})`;
}

//INFO MODAL LOGIC
function closeModal() {
  infoModal.classList.add("hidden");
  overlay.classList.add("hidden");
}
btnOpenModal.addEventListener("click", function () {
  infoModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//GRID TOGGLE LOGIC
function switchGridOn() {
  drawingGrid.style.gridGap = "1px";
  gridToggle.textContent = "Grid on";
  gridToggle.classList.add("pen-active");
  gridOnOff = true;
}
function switchGridOff() {
  drawingGrid.style.gridGap = "0px";
  gridToggle.textContent = "Grid off";
  gridToggle.classList.remove("pen-active");
  gridOnOff = false;
}
gridToggle.addEventListener("click", function () {
  const dimension = document.querySelector(".dimension-active").dataset.size;
  !gridOnOff && +dimension !== 100 ? switchGridOn() : switchGridOff();
});

//ACTIVE PEN ON CLICK AND GET PEN DATASET VALUE
function activatePen(event) {
  const currentPen = event;
  const activePen = document.querySelector(".pen-active");
  activePen.classList.remove("pen-active");
  currentPen.classList.add("pen-active");
  return event.dataset.color;
}
// Buttons Event Handlers
for (let pen of colorBtns) {
  pen.addEventListener("click", (e) => (penActive = activatePen(e.target)));
}
//RESET / RESIZE GRID
resetBtn.addEventListener("click", function () {
  const gridSize = document.querySelector(".dimension-active").dataset.size;
  if (+gridSize === 100) switchGridOff(); //Browser sometimes crashes with grid
  makeGrid(drawingGrid, gridSize);
});
//GRID DIMENSION OPTIONS
for (let option of dimensionOptions) {
  option.addEventListener("click", function (e) {
    const currentOption = e.target;
    const activeOption = document.querySelector(".dimension-active");
    activeOption.classList.remove("dimension-active");
    currentOption.classList.add("dimension-active");
  });
}
// Draw grid for first visit
makeGrid(drawingGrid, 16);
