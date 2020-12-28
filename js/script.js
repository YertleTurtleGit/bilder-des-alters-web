"use strict";
const CONTENTS = document.getElementsByClassName("content");
var CONTENT_POSITIONS_Y = getContentPositionsY();
function getContentPositionsY() {
    const contentPositionsY = [];
    for (var i = 0; i < CONTENTS.length; i++) {
        contentPositionsY.push(CONTENTS[i].getBoundingClientRect().bottom);
    }
    return contentPositionsY;
}
function getCurrentContentIndex(scrollPositionY) {
    var currentContentIndex = 0;
    for (var i = CONTENT_POSITIONS_Y.length - 1; i >= 0; i--) {
        console.log([CONTENT_POSITIONS_Y[i], scrollPositionY]);
        if (CONTENT_POSITIONS_Y[i] > scrollPositionY) {
            currentContentIndex = i;
        }
    }
    console.log(currentContentIndex);
    return currentContentIndex;
}
function setActiveContent(activeContentId) {
    if (activeContentId !== null) {
        for (var i = 0; i < CONTENTS.length; i++) {
            if (i === activeContentId) {
                CONTENTS[i].classList.remove("content-passive");
            }
            else {
                CONTENTS[i].classList.add("content-passive");
            }
        }
    }
}
function scrolled() {
    setActiveContent(getCurrentContentIndex(window.scrollY));
}
function resized() {
    setActiveContent(null);
    CONTENT_POSITIONS_Y = getContentPositionsY();
    scrolled();
}
function init() {
    resized();
    scrolled();
}
init();
window.addEventListener("scroll", scrolled);
window.addEventListener("resize", resized);
