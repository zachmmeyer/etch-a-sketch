function generateContainers(gridSize, sketchContainer, individualContainer) {
  for (let i = 0; i < gridSize; i += 1) {
    sketchContainer.appendChild(individualContainer.cloneNode(true));
    sketchContainer.childNodes[i].classList.add(`${i}`);
    if (sketchContainer.childNodes[i].classList.contains('0')) {
      sketchContainer.childNodes[i].classList.add('top-left-corner');
    }
    if (sketchContainer.childNodes[i].classList.contains(gridSize - 1)) {
      sketchContainer.childNodes[i].classList.add('bottom-right-corner');
    }
    if (
      sketchContainer.childNodes[i].classList.contains(
        gridSize - Math.sqrt(gridSize),
      )
    ) {
      sketchContainer.childNodes[i].classList.add('bottom-left-corner');
    }
    if (
      sketchContainer.childNodes[i].classList.contains(Math.sqrt(gridSize) - 1)
    ) {
      sketchContainer.childNodes[i].classList.add('top-right-corner');
    }
  }
}

function gridTemplateString(gridSize) {
  const gridSizeRt = Math.sqrt(gridSize);
  let gridString = '';
  for (let i = 0; i < gridSizeRt; i += 1) {
    gridString += 'auto';
    if (i < gridSizeRt - 1) {
      gridString += ' ';
    }
  }
  return gridString;
}

function borderHandler(gridSize, sketchContainer) {
  const gridSizeRt = Math.sqrt(gridSize);
  let leftNum = 0;
  let rightNum = 0;
  for (let i = 0; i < gridSize; i += 1) {
    leftNum += 1;
    rightNum += 1;
    if (
      leftNum === gridSizeRt
      && sketchContainer.childNodes[i + 1] !== undefined
    ) {
      sketchContainer.childNodes[i + 1].classList.add('left-side');
      leftNum = 0;
    }
    if (
      rightNum === gridSizeRt
      && sketchContainer.childNodes[i] !== gridSize
      && sketchContainer.childNodes[i] !== gridSizeRt - 1
    ) {
      sketchContainer.childNodes[i].classList.add('right-side');
      rightNum = 0;
    }
  }
  for (let i = 0; i < gridSizeRt; i += 1) {
    if (i !== 0 && i !== gridSizeRt) {
      sketchContainer.childNodes[i].classList.add('top-side');
    }
  }
  for (let i = gridSize - 1; i > gridSize - 1 - gridSizeRt; i -= 1) {
    sketchContainer.childNodes[i].classList.add('bottom-side');
  }
}

function resizeGrid() {
  const gridSize = 36;
  const sketchContainer = document.querySelector('.sketch-container');
  const individualContainer = document.createElement('div');
  individualContainer.classList.add('individual-container');
  const newGridSize = gridTemplateString(gridSize);
  sketchContainer.setAttribute(
    'style',
    `grid-template-columns: ${newGridSize}; grid-template-rows: ${newGridSize};`,
  );
  generateContainers(gridSize, sketchContainer, individualContainer);
  borderHandler(gridSize, sketchContainer);
}

function main() {
  resizeGrid();
}

main();

/*
  TODO: Add Event Listener for moving slider.
  TODO: Attach slider to gridSize. Run resize on slider on move. Sq slider value to get gridSize.
*/
