/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ui-scroll", [], factory);
	else if(typeof exports === 'object')
		exports["ui-scroll"] = factory();
	else
		root["ui-scroll"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ScrollEvent\": () => (/* reexport safe */ _src_scroll_event__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _src_scroll_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/scroll-event */ \"./src/scroll-event.ts\");\n\n\n\n//# sourceURL=webpack://ui-scroll/./index.ts?");

/***/ }),

/***/ "./src/scroll-event.ts":
/*!*****************************!*\
  !*** ./src/scroll-event.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ScrollEvent)\n/* harmony export */ });\nvar Direction;\n\n(function (Direction) {\n  Direction[\"Y\"] = \"y\";\n  Direction[\"X\"] = \"x\";\n})(Direction || (Direction = {}));\n\nvar Size;\n\n(function (Size) {\n  Size[\"Y\"] = \"height\";\n  Size[\"X\"] = \"width\";\n})(Size || (Size = {}));\n\nvar OptionKey; // type OptionKey = \"classStart\" | \"classEnd\";\n\n(function (OptionKey) {\n  OptionKey[\"classStart\"] = \"classStart\";\n  OptionKey[\"classEnd\"] = \"classEnd\";\n  OptionKey[\"duration\"] = \"duration\";\n  OptionKey[\"_step\"] = \"_step\";\n})(OptionKey || (OptionKey = {}));\n\nclass ScrollEvent {\n  dataset = {\n    classStart: \"uiScrollClassStart\",\n    classEnd: \"uiScrollClassEnd\",\n    duration: \"uiScrollDuration\",\n    _step: \"uiScrollStep\"\n  };\n  windowSize = 0;\n  oldScrollPosition = -1;\n  direction = Direction.Y;\n  size = Size.Y;\n\n  constructor({\n    selector\n  }) {\n    this.elements = this.getElements(selector);\n    this.windowSize = this.getWindowSize();\n    this.addGlobalEvent();\n  }\n\n  get index() {\n    const number = this.elements.findIndex(x => x.getBoundingClientRect()[this.direction] > this.windowSize);\n    return number === -1 ? this.elements.length : number;\n  }\n\n  getElementDataset(x, keyword) {\n    return x.dataset[this.dataset[keyword]] || \"\";\n  }\n\n  getElements(selector) {\n    return Array.prototype.slice.call(document.querySelectorAll(selector)).sort((a, b) => a.getBoundingClientRect()[this.direction] - b.getBoundingClientRect()[this.direction]);\n  }\n\n  getWindowSize() {\n    return this.direction === Direction.Y ? window.outerHeight : window.outerWidth;\n  }\n\n  getScrollDownElements() {\n    return this.elements.filter(x => this.getElementDataset(x, OptionKey.classStart) && x.getBoundingClientRect()[this.direction] < this.windowSize && !x.classList.contains(this.getElementDataset(x, OptionKey.classStart)));\n  }\n\n  getScrollDurationElements() {\n    return this.elements.map(x => ({\n      x: x,\n      duration: this.getElementDataset(x, OptionKey.duration),\n      rect: x.getBoundingClientRect()\n    })).filter(({\n      x,\n      duration,\n      rect\n    }) => duration && rect[this.direction] < this.windowSize && x.dataset[this.dataset[OptionKey._step]] !== \"100\");\n  }\n\n  getDownElements() {\n    return this.elements.filter(x => this.getElementDataset(x, OptionKey.classEnd) && x.getBoundingClientRect()[this.direction] < 0 && !x.classList.contains(this.getElementDataset(x, OptionKey.classEnd)));\n  }\n\n  getScrollUpElements() {\n    return this.elements.filter(x => this.getElementDataset(x, OptionKey.classStart) && x.getBoundingClientRect()[this.direction] > this.windowSize && x.classList.contains(this.getElementDataset(x, OptionKey.classStart)));\n  }\n\n  getDurationElements() {\n    return this.elements.map(x => ({\n      x: x,\n      duration: this.getElementDataset(x, OptionKey.duration),\n      rect: x.getBoundingClientRect()\n    })).filter(({\n      x,\n      duration,\n      rect\n    }) => duration && rect[this.direction] > 0 && x.dataset[this.dataset[OptionKey._step]] !== \"0\");\n  }\n\n  getUpElements() {\n    return this.elements.filter(x => this.getElementDataset(x, OptionKey.classEnd) && x.getBoundingClientRect()[this.direction] > 0 && x.classList.contains(this.getElementDataset(x, OptionKey.classEnd)));\n  } //   static throttleEvent(fn: Function, dutation: number) {\n  //     let inThrottle: any = false;\n  //     return (...args: any) => {\n  //       if (inThrottle !== false) return;\n  //       inThrottle = setTimeout(() => {\n  //         fn.call(null, args);\n  //         inThrottle = false;\n  //       }, dutation);\n  //     };\n  //   }\n\n\n  onNext() {\n    this.getScrollDownElements().map(x => {\n      x.classList.add(this.getElementDataset(x, OptionKey.classStart));\n    });\n    this.getScrollDurationElements().map(({\n      x,\n      rect\n    }) => {\n      let level = Math.ceil((rect.y - this.windowSize) / this.windowSize * -100);\n      if (level < 0) level = 0;\n      if (level > 100) level = 100;\n      x.dataset[this.dataset[OptionKey._step]] = level.toString();\n    });\n    this.getDownElements().map(x => {\n      x.classList.add(this.getElementDataset(x, OptionKey.classEnd));\n    });\n  }\n\n  onPrev() {\n    this.getScrollUpElements().map(x => {\n      x.classList.remove(this.getElementDataset(x, OptionKey.classStart));\n    });\n    this.getDurationElements().map(({\n      x,\n      rect\n    }) => {\n      let level = Math.ceil((rect.y - this.windowSize) / this.windowSize * -100);\n      console.log(level, \"djaklwdkjawd\");\n      if (level < 0) level = 0;\n      if (level > 100) level = 100;\n      x.dataset[this.dataset[OptionKey._step]] = level.toString();\n    });\n    this.getUpElements().map(x => {\n      x.classList.remove(this.getElementDataset(x, OptionKey.classEnd));\n    });\n  }\n\n  onScroll() {\n    if (this.oldScrollPosition > window.scrollY) {\n      this.onPrev();\n    } else {\n      this.onNext();\n    }\n\n    this.oldScrollPosition = window.scrollY;\n  }\n\n  onResize() {\n    this.windowSize = this.getWindowSize();\n  }\n\n  addGlobalEvent() {\n    window.removeEventListener(\"scroll\", this.onScroll.bind(this));\n    window.addEventListener(\"scroll\", this.onScroll.bind(this));\n    window.removeEventListener(\"resize\", this.onResize.bind(this));\n    window.addEventListener(\"resize\", this.onResize.bind(this));\n  }\n\n}\n\n//# sourceURL=webpack://ui-scroll/./src/scroll-event.ts?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});