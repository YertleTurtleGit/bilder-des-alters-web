"use strict";

const CONTENTS: HTMLCollection = document.getElementsByClassName("content");

var CONTENT_POSITIONS_Y: number[] = getContentPositionsY();

function getContentPositionsY(): number[] {
   const contentPositionsY: number[] = [];

   for (var i = 0; i < CONTENTS.length; i++) {
      contentPositionsY.push(CONTENTS[i].getBoundingClientRect().bottom);
   }

   return contentPositionsY;
}

function getCurrentContentIndex(scrollPositionY: number): number {
   var currentContentIndex: number = 0;

   for (var i = CONTENT_POSITIONS_Y.length - 1; i >= 0; i--) {
      console.log([CONTENT_POSITIONS_Y[i], scrollPositionY]);
      if (CONTENT_POSITIONS_Y[i] > scrollPositionY) {
         currentContentIndex = i;
      }
   }

   console.log(currentContentIndex);
   return currentContentIndex;
}

function setActiveContent(activeContentId: number): void {
   if (activeContentId !== null) {
      for (var i = 0; i < CONTENTS.length; i++) {
         if (i === activeContentId) {
            CONTENTS[i].classList.remove("content-passive");
         } else {
            CONTENTS[i].classList.add("content-passive");
         }
      }
   }
}

function scrolled(): void {
   setActiveContent(getCurrentContentIndex(window.scrollY));
}

function resized(): void {
   setActiveContent(null);
   CONTENT_POSITIONS_Y = getContentPositionsY();
   scrolled();
}

function init(): void {
   resized();
   scrolled();
}
init();

window.addEventListener("scroll", scrolled);
window.addEventListener("resize", resized);
