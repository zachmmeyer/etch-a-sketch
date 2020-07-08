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

function gridArrayFill (gridSize) {
    let gridArray = [];
    let mdArray = [];
    const gridSizeRt = Math.sqrt(gridSize);
    for (let i = 0; i < gridSize; i++) {
        gridArray.push(i);
        if (gridArray.length == gridSizeRt) {
            mdArray.push(gridArray.splice(0,gridSizeRt));
        }
    }
    return mdArray;
}

function borderHandler (gridArray) {
    
}

function main () {
    let gridSize = 36;
    const sketchContainer = document.querySelector('.sketch-container');
    const individualContainer = document.createElement('div');
    individualContainer.classList.add('individual-container');
    const newGridSize = gridTemplateString(gridSize);
    sketchContainer.setAttribute('style', `grid-template-columns: ${newGridSize}; grid-template-rows: ${newGridSize};`);
    generateContainers(gridSize,sketchContainer,individualContainer);
    const gridArray = gridArrayFill(gridSize);
    borderHandler(gridArray);
}

main();

/*

0  1  2  3  4  5
6  7  8  9  10 11
12 13 14 15 16 17
18 19 20 21 22 23
24 25 26 27 28 29
30 31 32 33 34 35



Slider range 4 - 30, number picked is grid size.

-------------------------------------------------

All borders are now 2px, except the outer walls. Easy enough to do with math.

*/
