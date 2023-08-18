/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 732:
/***/ (() => {

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
if (burger && menu) {
  burger.addEventListener("click", () => {
    burger.classList.toggle("burger--active");
    menu.classList.toggle("menu-active");
  });
} else {
  console.log("no burger or menu");
}

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
;// CONCATENATED MODULE: ./src/js/_components.js

// import "./components/calculateProgress";
// import "./components/cols-hover-deals";
// import "./components/tableSlider-deals";
// import "./components/cols-hover-support";
// import "./components/tableSlider-support";
// import "./components/select";
// import "./components/horizontal-scroll-wheel";
;// CONCATENATED MODULE: ./src/js/main.js




})();

/******/ })()
;