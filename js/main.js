"use strict";
//GLOBAL VARIABLES
let drawingActive = false;
let currentBlockColor;
//DOM Selectors
const drawingGrid = document.querySelector(".drawing-grid");
const mainWrapper = document.querySelector(".main-wrapper");
const blackPen = document.querySelector(".btn-set-black-pan");
const rainbowPen = document.querySelector(".btn-set-rainbow-pen");
const eraserPen = document.querySelector(".btn-set-eraser-pen");
// CREATE GRID
function createGrid(gridElement, size) {
  gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}
function fillGrid(gridElement, number) {
  const numOfElements = number ** 2;
  for (let i = 0; i < numOfElements; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    gridElement.insertAdjacentElement("beforeend", block);
    block.addEventListener("mouseenter", function (e) {
      if (drawingActive) colorGridBlock(e.target, currentBlockColor());
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
  colorGridBlock(e.target, currentBlockColor());
});
mainWrapper.addEventListener("mouseup", () => (drawingActive = false));
//GRID BLOCK BACKGROUND COLOR OPTIONS
function colorGridBlock(block, color) {
  block.style.backgroundColor = color;
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
function addShadeToColor() {}

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
////////////////////////////////////////////////////
blackPen.addEventListener("click", () => (currentBlockColor = blackColor));
rainbowPen.addEventListener("click", () => (currentBlockColor = rainbowColor));
eraserPen.addEventListener("click", () => (currentBlockColor = gridColor));
////////////////////////////////////////////////////
//TEST
makeGrid(drawingGrid, 32);
currentBlockColor = blackColor;
