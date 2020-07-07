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
        sketchContainer.childNodes[i].classList.add(`${i}`);
        if (sketchContainer.childNodes[i].classList.contains('0')){
            sketchContainer.childNodes[i].classList.add('top-left-corner');
        }
        if (sketchContainer.childNodes[i].classList.contains(gridSize-1)) {
            sketchContainer.childNodes[i].classList.add('bottom-right-corner');
        }
        if (sketchContainer.childNodes[i].classList.contains(gridSize-(Math.sqrt(gridSize)))) {
           sketchContainer.childNodes[i].classList.add('bottom-left-corner')
        }
        if (sketchContainer.childNodes[i].classList.contains(Math.sqrt(gridSize)-1)) {
            sketchContainer.childNodes[i].classList.add('top-right-corner');
        }
    }
    return;
}

function main () {
    let gridSize = 36;
    const sketchContainer = document.querySelector('.sketch-container');
    const individualContainer = document.createElement('div');
    individualContainer.classList.add('individual-container');
    const newGridSize = gridTemplateString(gridSize);
    sketchContainer.setAttribute('style', `grid-template-columns: ${newGridSize}; grid-template-rows: ${newGridSize};`);
    generateContainers(gridSize,sketchContainer,individualContainer);
}

main();

/*

All borders are now 2px, except the outer walls. Easy enough to do with math.

*/
