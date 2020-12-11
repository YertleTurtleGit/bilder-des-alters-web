"use strict";

const CUBE = document.getElementById("cube");
const CUBE_RIGHT = document.getElementById("cube__face--right");
const CUBE_LEFT = document.getElementById("cube__face--left");

const MENU_ITEMS: HTMLCollection = document.getElementsByClassName("menu-item");
const CONTENT_PARTS: HTMLCollection = document.getElementsByClassName(
   "content-part"
);

var currentMenuItemIndex: number = 0;

var introRotated: boolean = false;
function wheeling(event): void {
   if (!introRotated) {
      setTimeout(function () {
         introRotated = true;
      }, 1000);
      CUBE.style.transform = "rotateX(0deg)";
      CUBE.style.transform = "translateZ(-100px)";
   } else {
   }
}

window.addEventListener("wheel", wheeling);
for (var i = 0; i < MENU_ITEMS.length; i++) {
   MENU_ITEMS[i].id = "menu-item-" + i;
   CONTENT_PARTS[i].id = "content-part-" + i;
   CUBE_RIGHT.appendChild(CONTENT_PARTS[i]);
   //MENU_ITEMS[i].addEventListener("click", changeIndex.bind(null, i));
}

let drawingBuffer = MENU_ITEMS[currentMenuItemIndex] as HTMLElement;
drawingBuffer.style.backgroundColor = "white";

console.log("script loaded.");
