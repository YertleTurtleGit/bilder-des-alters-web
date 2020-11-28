"use strict";
const CUBE = document.getElementById("cube");
const MENU_ITEMS = document.getElementsByClassName("menu-item");
const CONTENT_PARTS = document.getElementsByClassName("content-part");
var currentMenuItemIndex = 0;
var introRotated = false;
function wheeling(event) {
    if (!introRotated) {
        setTimeout(function () {
            introRotated = true;
        }, 1000);
        CUBE.style.transform = "rotateX(0deg)";
        CUBE.style.transform = "translateZ(-100px)";
        changeIndex(0);
    }
    else {
        if (event.deltaY < 0) {
            previousIndex();
        }
        else {
            nextIndex();
        }
    }
}
function previousIndex() {
    if (currentMenuItemIndex - 1 < 0) {
        changeIndex(MENU_ITEMS.length - 1);
    }
    else {
        changeIndex(currentMenuItemIndex - 1);
    }
}
function nextIndex() {
    if (currentMenuItemIndex + 1 >= MENU_ITEMS.length) {
        changeIndex(0);
    }
    else {
        changeIndex(currentMenuItemIndex + 1);
    }
}
function changeIndex(newIndex) {
    currentMenuItemIndex = newIndex;
    for (var i = 0; i < MENU_ITEMS.length; i++) {
        let drawingBuffer = MENU_ITEMS[i];
        let contentDrawingBuffer = CONTENT_PARTS[i];
        drawingBuffer.style.backgroundColor = "white";
        contentDrawingBuffer.style.display = "none";
    }
    let drawingBuffer = MENU_ITEMS[newIndex];
    let contentDrawingBuffer = CONTENT_PARTS[newIndex];
    drawingBuffer.style.backgroundColor = "lightgray";
    contentDrawingBuffer.style.display = "block";
}
window.addEventListener("wheel", wheeling);
for (var i = 0; i < MENU_ITEMS.length; i++) {
    MENU_ITEMS[i].id = "menu-item-" + i;
    CONTENT_PARTS[i].id = "content-part-" + i;
    MENU_ITEMS[i].addEventListener("click", changeIndex.bind(null, i));
}
changeIndex(0);
let drawingBuffer = MENU_ITEMS[currentMenuItemIndex];
drawingBuffer.style.backgroundColor = "white";
console.log("script loaded.");
