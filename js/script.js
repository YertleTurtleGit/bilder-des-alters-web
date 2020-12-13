"use strict";
const CUBES = document.getElementsByClassName("cube");
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
                if (readBuffer.clientHeight * 0.3 > getCurrentCubeSize()) {
                    cube.style.marginTop =
                        String(readBuffer.clientHeight * 0.3) + "px";
                }
                else {
                    cube.style.marginTop = "0px";
                }
            }
        }
    }
}
function setActiveCube(cubeId) {
    let drawingBuffer = CUBES[cubeId];
    const faces = CUBES[cubeId].children;
    drawingBuffer.style.transform = "translateZ(-100px)";
    drawingBuffer.style.zIndex = "2";
    for (var j = 0; j < faces.length; j++) {
        const faceContents = faces[j].querySelectorAll("p,li");
        for (var k = 0; k < faceContents.length; k++) {
            let faceContentBuffer = faceContents[k];
            faceContentBuffer.style.backgroundColor = "lime";
            faceContentBuffer.style.zIndex = "2";
        }
    }
    for (var i = 0; i < CUBES.length; i++) {
        let drawingBuffer = CUBES[i];
        const faces = CUBES[i].children;
        if (cubeId !== i) {
            drawingBuffer.style.transform = "translateZ(-100px) rotateY(-90deg)";
            drawingBuffer.style.zIndex = "1";
            for (var j = 0; j < faces.length; j++) {
                const faceContents = faces[j].querySelectorAll("p,li");
                for (var k = 0; k < faceContents.length; k++) {
                    let faceContentBuffer = faceContents[k];
                    faceContentBuffer.style.backgroundColor = "transparent";
                    faceContentBuffer.style.zIndex = "1";
                }
            }
        }
    }
}
function adjustSize() {
    for (var i = 0; i < CUBES.length; i++) {
        var backFace = CUBES[i].getElementsByClassName("cube__face--back")[0];
        if (backFace.scrollHeight > getCurrentCubeSize()) {
            console.log(backFace.scrollHeight);
            let drawingBuffer = CUBES[i];
            drawingBuffer.style.marginBottom =
                String(backFace.scrollHeight) + "px";
        }
    }
}
var currentId = 0;
window.addEventListener("scroll", (event) => {
    const id = Math.round(this.scrollY / getCurrentCubeSize());
    if (id !== currentId) {
        currentId = id;
        setActiveCube(id);
    }
});
window.addEventListener("resize", adjustSize);
setActiveCube(0);
adjustSize();
console.log("script loaded.");
