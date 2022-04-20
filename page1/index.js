var rows = 4;
var columns = 4;

var currTile;
var otherTile; 

var turns = 0;


var imgOrder = ["14", "3", "6", "1", "7", "9", "5", "2", "13", "4", "11", "10", "8", "12", "15", "16"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {

           
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            
            tile.addEventListener("dragstart", dragStart);  
            tile.addEventListener("dragover", dragOver);    
            tile.addEventListener("dragenter", dragEnter);  
            tile.addEventListener("dragleave", dragLeave);  
            tile.addEventListener("drop", dragDrop);        
            tile.addEventListener("dragend", dragEnd);      

            document.getElementById("board").append(tile);

        }
    }
}

function dragStart() {
    currTile = this; 
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; 
}

function dragEnd() {
    if (!otherTile.src.includes("16.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-"); 
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }


}