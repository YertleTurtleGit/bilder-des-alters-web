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
function swipedetect(el, callback) {
    var touchsurface = el, swipedir, startX, startY, distX, distY, threshold = 50, //required min distance traveled to be considered swipe
    restraint = 300, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime, startTime, handleswipe = callback || function (swipedir) { };
    touchsurface.addEventListener("touchstart", function (e) {
        var touchobj = e.changedTouches[0];
        swipedir = "none";
        var dist = 0;
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        //e.preventDefault();
    }, false);
    touchsurface.addEventListener("touchmove", function (e) {
        //e.preventDefault(); // prevent scrolling when inside DIV
    }, false);
    touchsurface.addEventListener("touchend", function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime) {
            // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                // 2nd condition for horizontal swipe met
                swipedir = distX < 0 ? "left" : "right"; // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold &&
                Math.abs(distX) <= restraint) {
                // 2nd condition for vertical swipe met
                swipedir = distY < 0 ? "up" : "down"; // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir);
        //e.preventDefault();
    }, false);
}
swipedetect(document.body, function (swipedir) {
    if (!introRotated) {
        setTimeout(function () {
            introRotated = true;
        }, 1000);
        CUBE.style.transform = "rotateX(0deg)";
        CUBE.style.transform = "translateZ(-100px)";
        changeIndex(0);
    }
    else if (swipedir == "up" || swipedir == "left") {
        nextIndex();
    }
    else if (swipedir == "down" || swipedir == "right") {
        previousIndex();
    }
});
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
