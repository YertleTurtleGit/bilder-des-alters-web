"use strict";

const CUBES = document.getElementsByClassName("cube");
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
      for (var i = 0; i < CUBES.length; i++) {
         let drawingBuffer = CUBES[i] as HTMLElement;
         drawingBuffer.style.transform = "rotateX(0deg)";
         drawingBuffer.style.transform = "translateZ(-100px)";
      }
   } else {
   }
}

window.addEventListener("wheel", wheeling);
for (var i = 0; i < CONTENT_PARTS.length; i++) {
   CUBE_RIGHT.appendChild(
      document.getElementById("content-part-" + String(i)).cloneNode(true)
   );
   //MENU_ITEMS[i].addEventListener("click", changeIndex.bind(null, i));
}

let drawingBuffer = MENU_ITEMS[currentMenuItemIndex] as HTMLElement;
drawingBuffer.style.backgroundColor = "white";

console.log("script loaded.");
