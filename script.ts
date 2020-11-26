"use strict";

const CUBE = document.getElementById("cube");
const MENU_ITEMS: HTMLCollection = document.getElementsByClassName("menu-item");

var currentMenuItemIndex: number = 0;

var introRotated: boolean = false;
function wheeling(): void {
   if (!introRotated) {
      setTimeout(function () {
         introRotated = true;
      }, 1000);
      CUBE.style.transform = "rotateX(0deg)";
      CUBE.style.transform = "translateZ(-100px)";
      changeIndex(0);
   } else {
      nextIndex();
   }
}

function nextIndex(): void {
   if (currentMenuItemIndex + 1 >= MENU_ITEMS.length) {
      changeIndex(0);
   } else {
      changeIndex(currentMenuItemIndex + 1);
   }
}

function changeIndex(newIndex: number): void {
   currentMenuItemIndex = newIndex;

   for (var i = 0; i < MENU_ITEMS.length; i++) {
      let drawingBuffer = MENU_ITEMS[i] as HTMLElement;
      drawingBuffer.style.backgroundColor = "white";
   }

   let drawingBuffer = MENU_ITEMS[newIndex] as HTMLElement;
   drawingBuffer.style.backgroundColor = "lightgray";
}

window.addEventListener("wheel", wheeling);

console.log("script loaded.");
