function generateContainers(gridSize, sketchContainer, individualContainer) {
  for (let i = 0; i < gridSize; i += 1) {
    sketchContainer.appendChild(individualContainer.cloneNode(true));
    const SKETCHCONTAINER = sketchContainer.childNodes[i].classList;
    SKETCHCONTAINER.add(`${i}`);
    switch (true) {
      case SKETCHCONTAINER.contains('0'):
        SKETCHCONTAINER.add('top-left-corner');
        break;
      case SKETCHCONTAINER.contains(gridSize - 1):
        SKETCHCONTAINER.add('bottom-right-corner');
        break;
      case SKETCHCONTAINER.contains(gridSize - Math.sqrt(gridSize)):
        SKETCHCONTAINER.add('bottom-left-corner');
        break;
      case SKETCHCONTAINER.contains(Math.sqrt(gridSize) - 1):
        SKETCHCONTAINER.add('top-right-corner');
        break;
      default:
        break;
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
    const SKETCHCONTAINER = sketchContainer.childNodes[i].classList;
    if (
      i !== 0
      && i !== gridSizeRt
      && !SKETCHCONTAINER.contains('top-right-corner')
    ) {
      SKETCHCONTAINER.add('top-side');
    }
  }
  for (let i = gridSizeMinusOne; i > gridSizeMinusOne - gridSizeRt; i -= 1) {
    const SKETCHCONTAINER = sketchContainer.childNodes[i].classList;
    if (
      i !== gridSize - gridSizeRt
      && !SKETCHCONTAINER.contains('bottom-right-corner')
      && !SKETCHCONTAINER.contains('bottom-left-corner')
    ) {
      SKETCHCONTAINER.add('bottom-side');
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

function paintContainers() {
  const containers = document.querySelectorAll('.individual-container');
  const button = document.querySelector('.clear-grid');
  for (const container of containers) {
    let backgroundOpacity = 0.1;
    container.addEventListener('mouseover', () => {
      container.style.backgroundColor = `rgba(0,0,0,${backgroundOpacity})`;
      backgroundOpacity += 0.1;
    });
    button.addEventListener('click', () => {
      container.style.backgroundColor = 'rgba(0,0,0,0)';
      backgroundOpacity = 0.1;
    });
  }
}

function main() {
  const gridSize = 16;
  resizeGrid(gridSize);
  paintContainers();
  const slider = document.querySelector('.slider');
  slider.addEventListener('input', (e) => {
    const squaredInput = e.target.value * e.target.value;
    resizeGrid(squaredInput);
    paintContainers();
  });
}

main();

// TODO: Rainbow button
// TODO: Take closer look at borderHandler to possibly optimize better.
// TODO: Add button to toggle grid on and off.
