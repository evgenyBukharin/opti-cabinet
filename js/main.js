/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 732:
/***/ (() => {

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
burger.addEventListener("click", () => {
  burger.classList.toggle("burger--active");
  menu.classList.toggle("menu-active");
});

/***/ }),

/***/ 59:
/***/ (() => {

const progressBars = document.querySelectorAll(".hero__progress");
progressBars.forEach(bar => {
  let track = bar.querySelector(".hero__track");
  let currentCountEl = bar.parentNode.querySelector(".hero__text-current");
  let currentCount = currentCountEl.getAttribute("data-current");
  if (currentCount == 0) {
    currentCountEl.classList.add("hero__text-stat-bigger-red");
    track.classList.add("hero__track-red");
    return;
  }
  let allCount = bar.parentNode.querySelector(".hero__text-all").getAttribute("data-all");
  let widthPersent = currentCount / allCount * 100;
  track.style.width = widthPersent + "%";
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/js/_vars.js
/* harmony default export */ const _vars = ({
  windowEl: window,
  documentEl: document,
  htmlEl: document.documentElement,
  bodyEl: document.body
});
// EXTERNAL MODULE: ./src/js/components/burger.js
var burger = __webpack_require__(732);
// EXTERNAL MODULE: ./src/js/components/calculateProgress.js
var calculateProgress = __webpack_require__(59);
;// CONCATENATED MODULE: ./src/js/_components.js


;// CONCATENATED MODULE: ./src/js/main.js




})();

/******/ })()
;