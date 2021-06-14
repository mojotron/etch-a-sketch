"use strict";
//DOM Selectors
const drawingGrid = document.querySelector(".drawing-grid");
//Create grid element by passing in container element and size of square grid
//-simply add to grid element a grid template properties with size
function createGrid(gridElement, size) {
  gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}
//To fill grid with
function fillGrid(gridElement, number) {
  const numOfElements = number ** 2;
  for (let i = 0; i < numOfElements; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    gridElement.insertAdjacentElement("beforeend", block);
  }
}
//Make grid
function makeGrid(gridElement, size) {
  createGrid(gridElement, size);
  fillGrid(gridElement, size);
}
//TEST
makeGrid(drawingGrid, 16);
