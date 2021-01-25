let rgbDrawBool = false;
let blackDrawBool = true;
const colorSelectionText = document.querySelector('.color-selection');

const clearGrid = document.querySelector('.clear-grid');
clearGrid.addEventListener('click', () => {
  const containers = document.querySelectorAll('.individual-container');
  for (const container of containers) {
    container.style.backgroundColor = 'rgba(0,0,0,0)';
    backgroundOpacity = 0.1;
  }
});

const rgbDraw = document.querySelector('.rainbow-draw');
rgbDraw.addEventListener('click', () => {
  colorSelectionText.innerHTML = 'Color Selection: Rainbow';
  const containers = document.querySelectorAll('.individual-container');
  for (const container of containers) {
    container.style.backgroundColor = 'rgba(0,0,0,0)';
    container.dataset.backgroundOpacity = 0;
  }
  blackDrawBool = false;
  rgbDrawBool = true;
  
});

const blackDraw = document.querySelector('.black-draw');
blackDraw.addEventListener('click', () => {
  const containers = document.querySelectorAll('.individual-container');
  for (const container of containers) {
    container.style.backgroundColor = 'rgba(0,0,0,0)';
    container.dataset.backgroundOpacity = 0;
  }
  blackDrawBool = true;
  rgbDrawBool = false;
  colorSelectionText.innerHTML = 'Color Selection: Black';
});

function paintContainers() {
  const containers = document.querySelectorAll('.individual-container');
  for (const container of containers) {
    container.dataset.backgroundOpacity = 0;
    container.addEventListener('mouseover', () => {
      if (blackDrawBool === true) {
        container.dataset.backgroundOpacity = Number(container.dataset.backgroundOpacity) + 0.1;
        container.style.backgroundColor = `rgba(0,0,0,${container.dataset.backgroundOpacity})`;
      } else if (rgbDrawBool === true) {
        container.style.backgroundColor = `rgba(${randomColor()},${randomColor()},${randomColor()},1)`;
      }
    });
  }
}

function generateContainers(gridSize, sketchContainer, individualContainer) {
  for (let i = 0; i < gridSize; i += 1) {
    sketchContainer.appendChild(individualContainer.cloneNode());
    const sketchContainerClassList = sketchContainer.childNodes[i].classList;
    sketchContainerClassList.add(`${i}`);

    if (sketchContainerClassList.contains('0')) {
      sketchContainerClassList.add('top-left-corner');
    } else if (sketchContainerClassList.contains(gridSize - 1)) {
      sketchContainerClassList.add('bottom-right-corner');
    } else if (sketchContainerClassList.contains(gridSize - Math.sqrt(gridSize))) {
      sketchContainerClassList.add('bottom-left-corner');
    } else if (sketchContainerClassList.contains(Math.sqrt(gridSize) - 1)) {
      sketchContainerClassList.add('top-right-corner')
    };
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
  const gridSizeMinusOne = gridSize - 1;
  for (let i = 0; i < gridSize; i += 1) {
    leftNum += 1;
    rightNum += 1;
    if (
      leftNum === gridSizeRt
      && sketchContainer.childNodes[i + 1] !== undefined
      && i !== gridSizeMinusOne - gridSizeRt
    ) {
      sketchContainer.childNodes[i + 1].classList.add('left-side');
      leftNum = 0;
    }
    if (
      rightNum === gridSizeRt
      && sketchContainer.childNodes[i] !== gridSize
      && sketchContainer.childNodes[i] !== gridSizeRt - 1
      && !sketchContainer.childNodes[i].classList.contains('bottom-right-corner')
    ) {
      sketchContainer.childNodes[i].classList.add('right-side');
      rightNum = 0;
    }
  }
  for (let i = 0; i < gridSizeRt; i += 1) {
    const sketchContainerClassList = sketchContainer.childNodes[i].classList;
    if (
      i !== 0
      && i !== gridSizeRt
      && !sketchContainerClassList.contains('top-right-corner')
    ) {
      sketchContainerClassList.add('top-side');
    }
  }
  for (let i = gridSizeMinusOne; i > gridSizeMinusOne - gridSizeRt; i -= 1) {
    const sketchContainerClassList = sketchContainer.childNodes[i].classList;
    if (
      i !== gridSize - gridSizeRt
      && !sketchContainerClassList.contains('bottom-right-corner')
      && !sketchContainerClassList.contains('bottom-left-corner')
    ) {
      sketchContainerClassList.add('bottom-side');
    }
  }
}

function gridCleaner(sketchContainer) {
  if (sketchContainer.childNodes.length === undefined) {
    return;
  }
  while (sketchContainer.childNodes.length > 0) {
    sketchContainer.childNodes[0].remove();
  }
}

function resizeGrid(gridSize) {
  const sketchContainer = document.querySelector('.sketch-container');
  const individualContainer = document.createElement('div');
  individualContainer.classList.add('individual-container');
  const newGridSize = gridTemplateString(gridSize);
  gridCleaner(sketchContainer);
  sketchContainer.setAttribute(
    'style',
    `grid-template-columns: ${newGridSize}; grid-template-rows: ${newGridSize};`,
  );
  generateContainers(gridSize, sketchContainer, individualContainer);
  borderHandler(gridSize, sketchContainer);
}

function randomColor() {
  return Math.floor(Math.random() * 256);
}




function main() {
  const gridSize = 16;
  resizeGrid(gridSize);
  paintContainers();
  const slider = document.querySelector('.slider');
  slider.addEventListener('input', (e) => {
    const colorSelectionText = document.querySelector('.color-selection');
    const squaredInput = e.target.value * e.target.value;
    resizeGrid(squaredInput);
    paintContainers();
    colorSelectionText.innerHTML = 'Color Selection: Black';
  });
}

main();

// TODO: Take closer look at borderHandler to possibly optimize better.
// TODO: Add button to toggle grid on and off.
