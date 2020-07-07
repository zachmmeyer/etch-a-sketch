function gridTemplateString (gridSize) {
    const gridSizeRt = Math.sqrt(gridSize);
    let gridString = '';
    for (let i = 0; i < gridSizeRt; i++) {
        gridString += 'auto';
        if (i < (gridSizeRt-1)) {
            gridString += ' ';
        }
    }
    return gridString;
}

function generateContainers (gridSize,sketchContainer,individualContainer) {
    for (let i = 0; i < gridSize; i++) {
        sketchContainer.appendChild(individualContainer.cloneNode(true));
        sketchContainer.childNodes[i].setAttribute('data-key', `${i}`);
    }
    return;
}

function main () {
    let gridSize = 16;
    const sketchContainer = document.querySelector('.sketch_container');
    const individualContainer = document.createElement('div');
    individualContainer.classList.add('individual_container');
    const newGridSize = gridTemplateString(gridSize);
    sketchContainer.setAttribute('style', `grid-template-columns: ${newGridSize}; grid-template-rows: ${newGridSize};`);
    generateContainers(gridSize,sketchContainer,individualContainer);
}

main();