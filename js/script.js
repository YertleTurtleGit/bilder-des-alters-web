"use strict";
const CUBES = document.getElementsByClassName("cube");
console.log(CUBES);
function getCurrentCubeSize() {
    if (window.innerWidth > window.innerHeight) {
        return window.innerHeight;
    }
    else {
        return window.innerWidth;
    }
}
function resized() {
    for (var i = 1; i < CUBES.length; i++) {
        let previousDrawingBuffer = CUBES[i - 1];
        const previousCube = previousDrawingBuffer;
        let drawingBuffer = CUBES[i];
        const cube = drawingBuffer;
        const faces = previousCube.children;
        for (var j = 0; j < faces.length; j++) {
            if (faces[j].classList.contains("cube__face--back")) {
                let readBuffer = faces[j];
                console.log(getCurrentCubeSize());
                if (readBuffer.clientHeight * 0.3 > getCurrentCubeSize()) {
                    cube.style.marginTop =
                        String(readBuffer.clientHeight * 0.3) + "px";
                    console.log(readBuffer.clientHeight * 0.3);
                }
                else {
                    cube.style.marginTop = "0px";
                }
            }
        }
    }
}
function rotateToCube(cubeId) {
    for (var i = 0; i < CUBES.length; i++) {
        let drawingBuffer = CUBES[i];
        if (cubeId !== i) {
            drawingBuffer.style.transform = "translateZ(-100px) rotateY(-90deg)";
        }
        else {
            drawingBuffer.style.transform = "translateZ(-100px)";
        }
    }
}
var currentId = 0;
window.addEventListener("scroll", (event) => {
    const id = Math.round(this.scrollY / getCurrentCubeSize());
    if (id !== currentId) {
        currentId = id;
        rotateToCube(id);
    }
});
rotateToCube(0);
//window.addEventListener("resize", resized);
console.log("script loaded.");
