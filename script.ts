"use strict";

const SCENES = document.getElementsByClassName("scene-float");

function getCubeSize(): number {
   if (window.innerWidth > window.innerHeight) {
      return window.innerHeight;
   } else {
      return window.innerWidth;
   }
}

function getSceneHeight(sceneId: number): number {
   return SCENES[sceneId].scrollHeight;
}

function getActiveSceneId(scrollY: number): number {
   var heightOffset: number = 0;
   for (var i = 0; i < SCENES.length; i++) {
      heightOffset += getSceneHeight(i);
      if (scrollY < heightOffset) {
         return i;
      }
   }
   return SCENES.length - 1;
}

function setActiveScene(sceneId: number): void {
   console.log(sceneId);
}

var currentId: number = 0;
window.addEventListener("scroll", (event) => {
   const id: number = getActiveSceneId(this.scrollY);
   if (id !== currentId) {
      currentId = id;
      setActiveScene(id);
   }
});

setActiveScene(0);

console.log("script loaded.");
