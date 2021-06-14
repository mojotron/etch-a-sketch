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
    block.addEventListener("mouseover", function (e) {
      if (active) e.target.style.backgroundColor = "black";
    });
  }
}
//Activate/Dactivate drawing mode
let active = false;
drawingGrid.addEventListener("click", function (e) {
  active = active ? false : true;
  if (active && e.target.classList.contains("block")) {
    e.target.style.backgroundColor = "black";
  }
});
//Make grid
function makeGrid(gridElement, size) {
  createGrid(gridElement, size);
  fillGrid(gridElement, size);
}
//TEST
makeGrid(drawingGrid, 100);
////////////////////////////////////////////////////
//Info modal
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
