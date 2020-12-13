"use strict";

const CUBES = document.getElementsByClassName("cube");

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

            if (readBuffer.clientHeight * 0.3 > getCurrentCubeSize()) {
               cube.style.marginTop =
                  String(readBuffer.clientHeight * 0.3) + "px";
            } else {
               cube.style.marginTop = "0px";
            }
         }
      }
   }
}

function setActiveCube(cubeId: number): void {
   let drawingBuffer: HTMLElement = CUBES[cubeId] as HTMLElement;
   const faces: HTMLCollection = CUBES[cubeId].children;
   drawingBuffer.style.transform = "translateZ(-100px)";
   drawingBuffer.style.zIndex = "2";
   for (var j = 0; j < faces.length; j++) {
      const faceContents = faces[j].querySelectorAll("p,li");
      for (var k = 0; k < faceContents.length; k++) {
         let faceContentBuffer: HTMLElement = faceContents[k] as HTMLElement;
         faceContentBuffer.style.backgroundColor = "lime";
         faceContentBuffer.style.zIndex = "2";
      }
   }

   for (var i = 0; i < CUBES.length; i++) {
      let drawingBuffer: HTMLElement = CUBES[i] as HTMLElement;
      const faces: HTMLCollection = CUBES[i].children;
      if (cubeId !== i) {
         drawingBuffer.style.transform = "translateZ(-100px) rotateY(-90deg)";
         drawingBuffer.style.zIndex = "1";
         for (var j = 0; j < faces.length; j++) {
            const faceContents = faces[j].querySelectorAll("p,li");
            for (var k = 0; k < faceContents.length; k++) {
               let faceContentBuffer: HTMLElement = faceContents[
                  k
               ] as HTMLElement;
               faceContentBuffer.style.backgroundColor = "transparent";
               faceContentBuffer.style.zIndex = "1";
            }
         }
      }
   }
}

function adjustSize(): void {
   for (var i = 0; i < CUBES.length; i++) {
      var backFace: HTMLElement = CUBES[i].getElementsByClassName(
         "cube__face--back"
      )[0] as HTMLElement;

      if (backFace.scrollHeight > getCurrentCubeSize()) {
         console.log(backFace.scrollHeight);
         let drawingBuffer: HTMLElement = CUBES[i] as HTMLElement;
         drawingBuffer.style.marginBottom =
            String(backFace.scrollHeight) + "px";
      }
   }
}

var currentId: number = 0;
window.addEventListener("scroll", (event) => {
   const id: number = Math.round(this.scrollY / getCurrentCubeSize());
   if (id !== currentId) {
      currentId = id;
      setActiveCube(id);
   }
});

window.addEventListener("resize", adjustSize);
setActiveCube(0);
adjustSize();

console.log("script loaded.");
