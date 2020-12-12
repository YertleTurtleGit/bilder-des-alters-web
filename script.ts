"use strict";

const CUBES = document.getElementsByClassName("cube");

console.log(CUBES);

function getCurrentCubeSize(): number {
   if (window.innerWidth > window.innerHeight) {
      return window.innerHeight;
   } else {
      return window.innerWidth;
   }
}

function resized(): void {
   for (var i = 1; i < CUBES.length; i++) {
      let previousDrawingBuffer: HTMLElement = CUBES[i - 1] as HTMLElement;
      const previousCube: HTMLElement = previousDrawingBuffer;

      let drawingBuffer: HTMLElement = CUBES[i] as HTMLElement;
      const cube: HTMLElement = drawingBuffer;

      const faces: HTMLCollection = previousCube.children;

      for (var j = 0; j < faces.length; j++) {
         if (faces[j].classList.contains("cube__face--back")) {
            let readBuffer: HTMLElement = faces[j] as HTMLElement;

            console.log(getCurrentCubeSize());

            if (readBuffer.clientHeight * 0.3 > getCurrentCubeSize()) {
               cube.style.marginTop =
                  String(readBuffer.clientHeight * 0.3) + "px";
               console.log(readBuffer.clientHeight * 0.3);
            } else {
               cube.style.marginTop = "0px";
            }
         }
      }
   }
}

function rotateToCube(cubeId: number): void {
   for (var i = 0; i < CUBES.length; i++) {
      let drawingBuffer: HTMLElement = CUBES[i] as HTMLElement;
      if (cubeId !== i) {
         drawingBuffer.style.transform = "translateZ(-100px) rotateY(-90deg)";
      } else {
         drawingBuffer.style.transform = "translateZ(-100px)";
      }
   }
}

var currentId: number = 0;
window.addEventListener("scroll", (event) => {
   const id: number = Math.round(this.scrollY / getCurrentCubeSize());
   if (id !== currentId) {
      currentId = id;
      rotateToCube(id);
   }
});

rotateToCube(0);
//window.addEventListener("resize", resized);

console.log("script loaded.");
