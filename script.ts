"use strict";

const CUBE = document.getElementById("cube");
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
      changeIndex(0);
   } else {
      if (event.deltaY < 0) {
         previousIndex();
      } else {
         nextIndex();
      }
   }
}

function previousIndex(): void {
   if (currentMenuItemIndex - 1 < 0) {
      changeIndex(MENU_ITEMS.length - 1);
   } else {
      changeIndex(currentMenuItemIndex - 1);
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
      let contentDrawingBuffer = CONTENT_PARTS[i] as HTMLElement;
      drawingBuffer.style.backgroundColor = "white";
      contentDrawingBuffer.style.display = "none";
   }

   let drawingBuffer = MENU_ITEMS[newIndex] as HTMLElement;
   let contentDrawingBuffer = CONTENT_PARTS[newIndex] as HTMLElement;
   drawingBuffer.style.backgroundColor = "lightgray";
   contentDrawingBuffer.style.display = "block";
}

window.addEventListener("wheel", wheeling);
for (var i = 0; i < MENU_ITEMS.length; i++) {
   MENU_ITEMS[i].id = "menu-item-" + i;
   CONTENT_PARTS[i].id = "content-part-" + i;
   MENU_ITEMS[i].addEventListener("click", changeIndex.bind(null, i));
}

console.log("script loaded.");
