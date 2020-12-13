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
    var heightOffset = 0;
    for (var i = 0; i < SCENES.length; i++) {
        heightOffset += getSceneHeight(i);
        if (scrollY < heightOffset) {
            return i;
        }
    }
    return SCENES.length - 1;
}
function setActiveScene(sceneId) {
    console.log(sceneId);
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
