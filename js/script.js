"use strict";
const CUBE = document.getElementById("cube");
const MENU_ITEMS = document.getElementsByClassName("menu-item");
var currentMenuItemIndex = 0;
var introRotated = false;
function wheeling() {
    if (!introRotated) {
        setTimeout(function () {
            introRotated = true;
        }, 1000);
        CUBE.style.transform = "rotateX(0deg)";
        CUBE.style.transform = "translateZ(-100px)";
        changeIndex(0);
    }
    else {
        nextIndex();
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
        drawingBuffer.style.backgroundColor = "white";
    }
    let drawingBuffer = MENU_ITEMS[newIndex];
    drawingBuffer.style.backgroundColor = "lightgray";
}
window.addEventListener("wheel", wheeling);
console.log("script loaded.");
