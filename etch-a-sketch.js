/* 
Odin Project - Project: Etch-a-Sketch
etch-a-sketch.js

Contents:
  A - core variable and function definitions
    A1 - grid control vars and firstRun declarations
    A2 - grid and button element references
    A3 - core function definitions
      A3a - setGridSides()
      A3b - setGridTemplateColumns()
      A3c - addSquare()
      A3d - addGridSquares()
      A3e - removeGridSquares()
      A3f - squarePaint()
      A3g - addSquareListeners()
      A3h - removeSquareListeners()
      A3i - updateGrid()
      A3j - buttonPrompt()
  B - default view execution
    B1 - button event listener
    B2 - initial draw with default grid
*/

// A - core variable and function definitions

// A1 - grid vars and firstRun declarations
let gridSides;
let gridSize;
let gridSquareCount;
let gridTemplateColumnsString;
let firstRun = true;

// A2 - squareGrid and gridButton element references
const squareGrid = document.querySelector('.squareGrid');
const gridButton = document.querySelector('button');

// A3 - core function definitions

// A3a
function setGridSides (sideCount) {
  gridSides = sideCount;
  gridSquareCount = sideCount**2;
  gridSize = document.defaultView.innerWidth * 0.7;
}

// A3b
function setGridTemplateColumns () {
  gridTemplateColumnsString = "auto";
  for (let i = 1; i < gridSides; i++) {
    gridTemplateColumnsString += " auto";
  }
  squareGrid.style.gridTemplateColumns = gridTemplateColumnsString;
}

// A3c
function addSquare () {
  const squareDiv = document.createElement('div');
  squareDiv.style.background = '#95a8b0';
  // squareDiv.style.border = '2px solid #36454d';
  squareDiv.style.borderRadius = '2px';
  squareDiv.style.height = (gridSize / gridSides) + 'px';
  squareDiv.style.width = (gridSize / gridSides) + 'px';
  squareGrid.appendChild(squareDiv);
}

// A3d
function addGridSquares () {
  for (let i = 0; i < gridSquareCount; i++) {
    addSquare();
  }
}

// A3e
function removeGridSquares () {
  const squareList = document.querySelectorAll('.squareGrid div');
  squareList.forEach( (squareDiv) => {
    squareGrid.removeChild(squareDiv);
  });
}

// A3f
function squarePaint() {
  this.style.backgroundColor = '#342a5f';
}

// A3g
function addSquareListeners () {
  const squareList = document.querySelectorAll('.squareGrid div');
  squareList.forEach( (squareDiv) => {
    squareDiv.addEventListener('mouseover', squarePaint);
  });
}

// A3h
function removeSquareListeners () {
  const squareList = document.querySelectorAll('.squareGrid div');
  squareList.forEach( (squareDiv) => {
    squareDiv.removeEventListener('mouseover', squarePaint);
  });
}

// A3i
function updateGrid (sideCount) {
  if (!firstRun) {
    removeSquareListeners();
    removeGridSquares();
  }
  firstRun = false;
  setGridSides(sideCount);
  setGridTemplateColumns();
  addGridSquares();
  addSquareListeners();
}

// A3j
function buttonPrompt () {
  gridSides = window.prompt("Please enter a number (greater than zero and less"
                            + "than 100) for square grid divisions.", "16")*1;
  while (!(typeof(gridSides) == 'number') || gridSides < 1 || gridSides > 99) {
    gridSides = window.prompt("Error! Please, I beg you, enter a number which "
                              + "is greater than zero and less than 100.",
                              "16")*1;
  }
  updateGrid(gridSides);
}

// B - default view execution

// B1 - button event listener
gridButton.addEventListener('click', buttonPrompt);

// B2 - initial draw with default grid
updateGrid(16);