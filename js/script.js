"use strict";
const SCENES = document.getElementsByClassName("scene-float");
function getCubeSize() {
    if (window.innerWidth > window.innerHeight) {
        return window.innerHeight;
    }
    else {
        return window.innerWidth;
    }
}
function getSceneHeight(sceneId) {
    return SCENES[sceneId].scrollHeight;
}
function getActiveSceneId(scrollY) {
    var heightOffset = -getCubeSize();
    for (var i = 0; i < SCENES.length; i++) {
        heightOffset += getSceneHeight(i);
        if (scrollY < heightOffset) {
            return i;
        }
    }
    return SCENES.length - 1;
}
function setActiveScene(sceneId) {
    const backFaces = [];
    const cubes = [];
    for (var i = 0; i < SCENES.length; i++) {
        cubes.push(SCENES[i].getElementsByClassName("cube")[0]);
        backFaces.push(SCENES[i].getElementsByClassName("cube__face--back")[0]);
    }
    const faces = cubes[sceneId].children;
    cubes[sceneId].style.transform = "translateZ(-100px)";
    cubes[sceneId].style.zIndex = "2";
    backFaces[sceneId].style.zIndex = "1";
    backFaces[sceneId].style.transform =
        "rotateY(180deg) translateZ(" + String(getCubeSize() / 2) + "px)";
    for (var j = 0; j < faces.length; j++) {
        const faceContents = faces[j].querySelectorAll("p,li");
        for (var k = 0; k < faceContents.length; k++) {
            let faceContentBuffer = faceContents[k];
            faceContentBuffer.style.backgroundColor = "lime";
            faceContentBuffer.style.zIndex = "2";
        }
    }
    for (var i = 0; i < cubes.length; i++) {
        const faces = cubes[i].children;
        if (sceneId !== i) {
            cubes[i].style.transform = "translateZ(-100px) rotateY(-90deg)";
            cubes[i].style.zIndex = "1";
            backFaces[i].style.zIndex = "1";
            backFaces[i].style.transform =
                "rotateY(90deg) translateZ(" + String(getCubeSize() / 2) + "px)";
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
var currentId = 0;
window.addEventListener("scroll", (event) => {
    const id = getActiveSceneId(this.scrollY);
    if (id !== currentId) {
        currentId = id;
        setActiveScene(id);
    }
});
setActiveScene(0);
console.log("script loaded.");
