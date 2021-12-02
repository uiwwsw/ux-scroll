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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UxScrollTransition\": () => (/* reexport safe */ _src_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"UxScrollCallback\": () => (/* reexport safe */ _src_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _src_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ux-scroll-transition */ \"./src/ux-scroll-transition.ts\");\n/* harmony import */ var _src_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/ux-scroll-callback */ \"./src/ux-scroll-callback.ts\");\n\n\n\n\n//# sourceURL=webpack://ui-scroll/./index.ts?");

/***/ }),

/***/ "./src/scroll.ts":
/*!***********************!*\
  !*** ./src/scroll.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Direction\": () => (/* binding */ Direction),\n/* harmony export */   \"Size\": () => (/* binding */ Size),\n/* harmony export */   \"default\": () => (/* binding */ Scroll)\n/* harmony export */ });\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles.scss */ \"./styles.scss\");\n/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./throttle */ \"./src/throttle.ts\");\n\n\nlet Direction;\n\n(function (Direction) {\n  Direction[\"Y\"] = \"y\";\n  Direction[\"X\"] = \"x\";\n})(Direction || (Direction = {}));\n\nlet Size; // type OptionKey = \"start\" | \"started\";\n\n(function (Size) {\n  Size[\"Y\"] = \"height\";\n  Size[\"X\"] = \"width\";\n})(Size || (Size = {}));\n\nclass Scroll {\n  #props;\n  #status;\n  scrollPosition = -1;\n  #direction = Direction.Y;\n  #resetStatusFlag = 1; // protected static size = Size.Y;\n\n  constructor(props) {\n    this.#props = props;\n    this.#onInit();\n    this.#status = this.elements.map(() => ({\n      starting: true,\n      doing: true,\n      ending: true\n    }));\n  }\n\n  get scrollBottomPosition() {\n    return this.scrollPosition + this.windowSize;\n  }\n\n  get scrollTopPosition() {\n    return this.scrollPosition;\n  }\n\n  get #index() {\n    if (this.scrollTopPosition === 0) return 0;\n    if (this.scrollBottomPosition === this.scrollSize) return this.options.length - 1;\n    return this.options.findIndex(({\n      startPosition,\n      endPosition,\n      index\n    }) => startPosition >= this.scrollTopPosition);\n  }\n\n  get #getStartingOptions() {\n    return this.options.filter(({\n      startPosition,\n      index,\n      starting\n    }) => starting && (this.#resetStatusFlag ? startPosition <= this.scrollBottomPosition : startPosition >= this.scrollTopPosition) && this.#status[index].starting);\n  }\n\n  get #getDoingOptions() {\n    return this.options.filter(({\n      startPosition,\n      index,\n      doing,\n      endPosition\n    }) => doing && (this.#resetStatusFlag ? startPosition <= this.scrollTopPosition : endPosition >= this.scrollBottomPosition) && this.#status[index].doing);\n  }\n\n  get #getEndingOptions() {\n    return this.options.filter(({\n      ending,\n      index,\n      endPosition\n    }) => ending && (this.#resetStatusFlag ? endPosition <= this.scrollBottomPosition : endPosition >= this.scrollTopPosition) && this.#status[index].ending);\n  }\n\n  get #throttleTimer() {\n    return this.#props?.throttleTimer || 0;\n  }\n\n  #getOptions({\n    options,\n    commonOptions\n  }) {\n    !options && (options = {});\n    !commonOptions && (commonOptions = {});\n    return this.elements.map((x, index) => {\n      const startPosition = this.#direction === Direction.Y ? x.offsetTop : x.offsetLeft;\n      const size = this.#direction === Direction.Y ? x.offsetHeight : x.offsetWidth;\n      const endPosition = startPosition + size;\n      const startMargin = this.#getMargin(commonOptions?.startMargin || options[index]?.startMargin);\n      const endMargin = this.#getMargin(commonOptions?.endMargin || options[index]?.endMargin);\n      return {\n        index,\n        size,\n        startPosition: startPosition + startMargin,\n        endPosition: endPosition + endMargin,\n        starting: commonOptions?.starting || options[index]?.starting,\n        doing: commonOptions?.doing || options[index]?.doing,\n        ending: commonOptions?.ending || options[index]?.ending\n      };\n    });\n  }\n\n  #getMargin(margin) {\n    if (!margin) return 0;\n    if (margin.includes(\"px\")) return Number(margin.replace(\"px\", \"\"));\n    if (margin.includes(\"%\")) return Number(margin.replace(\"%\", \"\")) * this.windowSize / 100;\n    return Number(margin) * this.windowSize;\n  }\n\n  #getElements(selector) {\n    return Array.prototype.slice.call(document.querySelectorAll(selector));\n  }\n\n  #getWindowSize() {\n    return this.#direction === Direction.Y ? window.innerHeight : window.innerWidth;\n  }\n\n  #getScrollSize() {\n    return this.#direction === Direction.Y ? Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) : Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);\n  }\n\n  onNextStarting(index) {}\n\n  onNextDoing(index) {}\n\n  onNextEnding(index) {}\n\n  onPrevStarting(index) {}\n\n  onPrevDoing(index) {}\n\n  onPrevEnding(index) {}\n\n  #scroll() {\n    this.#getStartingOptions.map(({\n      index\n    }) => {\n      const res = this.#resetStatusFlag ? this.onNextStarting(index) : this.onPrevStarting(index);\n      if (res) this.#status[index].starting = false;\n    });\n    this.#getDoingOptions.map(({\n      index\n    }) => {\n      const res = this.#resetStatusFlag ? this.onNextDoing(index) : this.onPrevDoing(index);\n      if (res) this.#status[index].doing = false;\n    });\n    this.#getEndingOptions.map(({\n      index\n    }) => {\n      const res = this.#resetStatusFlag ? this.onNextEnding(index) : this.onPrevEnding(index);\n      if (res) this.#status[index].ending = false;\n    });\n  }\n\n  #resetStatus(directive) {\n    this.#resetStatusFlag = directive;\n\n    for (const index in this.#status) {\n      this.#status[index].starting = true;\n      this.#status[index].doing = true;\n      this.#status[index].ending = true;\n    }\n  }\n\n  onScroll = (0,_throttle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(() => {\n    if (this.scrollPosition > window.scrollY) {\n      this.#resetStatusFlag && this.#resetStatus(0);\n    } else {\n      !this.#resetStatusFlag && this.#resetStatus(1);\n    }\n\n    this.#scroll();\n    this.scrollPosition = window.scrollY;\n  }, this.#throttleTimer);\n\n  #onInit() {\n    this.windowSize = this.#getWindowSize();\n    this.scrollSize = this.#getScrollSize();\n    this.elements = this.#getElements(this.#props.selector);\n    this.options = this.#getOptions({\n      options: this.#props.options,\n      commonOptions: this.#props.commonOptions\n    });\n  }\n\n  onResize = (0,_throttle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.#onInit, this.#throttleTimer);\n}\n\n//# sourceURL=webpack://ui-scroll/./src/scroll.ts?");

/***/ }),

/***/ "./src/throttle.ts":
/*!*************************!*\
  !*** ./src/throttle.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(fn, wait) {\n  let inThrottle;\n  return function (...arg) {\n    if (inThrottle) return;\n    inThrottle = setTimeout(() => {\n      fn.call(this, arg);\n      inThrottle = false;\n    }, wait);\n  };\n}\n\n//# sourceURL=webpack://ui-scroll/./src/throttle.ts?");

/***/ }),

/***/ "./src/ux-scroll-callback.ts":
/*!***********************************!*\
  !*** ./src/ux-scroll-callback.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UxScrollCallback)\n/* harmony export */ });\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \"./src/scroll.ts\");\n\nclass UxScrollCallback extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(props) {\n    super({ ...props,\n      commonOptions: {\n        starting: \"ux__callback--starting\",\n        doing: \"ux__callback--doing\",\n        ending: \"ux__callback--ending\",\n        ...props.commonOptions\n      }\n    });\n    this.callbacks = props.callbacks;\n  }\n\n  static getStep(level) {\n    let step = level;\n    if (level > 100) step = 100;\n    if (level < 0) step = 0;\n    return step;\n  }\n\n  onNextStarting(index) {\n    const callback = this.callbacks[index];\n    const level = Math.ceil((this.scrollBottomPosition - this.options[index].startPosition) / this.windowSize * 100);\n    const step = UxScrollCallback.getStep(level);\n    const element = this.elements[index];\n    callback && callback({\n      status: this.options[index].starting,\n      index,\n      step,\n      element\n    });\n    if (level < 0 || level > 100) return true;\n  }\n\n  onNextDoing(index) {\n    const callback = this.callbacks[index];\n    const level = 100 - Math.ceil((this.options[index].endPosition - this.scrollBottomPosition) / (this.options[index].size - this.windowSize) * 100);\n    const step = UxScrollCallback.getStep(level);\n    const element = this.elements[index];\n    callback && callback({\n      status: this.options[index].doing,\n      index,\n      step,\n      element\n    });\n    if (level < 0 || level > 100) return true;\n  }\n\n  onNextEnding(index) {\n    const callback = this.callbacks[index];\n    const level = 100 - Math.ceil((this.options[index].endPosition - this.scrollTopPosition) / this.windowSize * 100);\n    const step = UxScrollCallback.getStep(level);\n    const element = this.elements[index];\n    callback && callback({\n      status: this.options[index].ending,\n      index,\n      step,\n      element\n    });\n    if (level < 0 || level > 100) return true;\n  }\n\n  onPrevStarting = this.onNextStarting;\n  onPrevDoing = this.onNextDoing;\n  onPrevEnding = this.onNextEnding; // public onNextStart(index: number): true {\n  //   const callback = this.callbacks[index] as Callback;\n  //   const step = Math.ceil(\n  //     ((this.scrollBottomPosition - this.options[index].startPosition) /\n  //       this.windowSize) *\n  //       100\n  //   );\n  //   const element = this.elements[index];\n  //     callback &&\n  //     callback({\n  //       status: this.options[index].start,\n  //       index,\n  //       step,\n  //       element,\n  //     });\n  // }\n  // public onNextStarted(index: number): true {\n  //   const callback = this.callbacks[index] as Callback;\n  //   const step = Math.ceil(\n  //     ((this.scrollTopPosition - this.options[index].startPosition) /\n  //       this.windowSize) *\n  //       100\n  //   );\n  //   const element = this.elements[index];\n  //     callback &&\n  //     callback({\n  //       status: this.options[index].started,\n  //       index,\n  //       step,\n  //       element,\n  //     });\n  // }\n  // public onNextEnd(index: number): true {\n  //   const callback = this.callbacks[index] as Callback;\n  //   const step = Math.ceil(\n  //     ((this.scrollBottomPosition - this.options[index].endPosition) /\n  //       this.windowSize) *\n  //       100\n  //   );\n  //   const element = this.elements[index];\n  //     callback &&\n  //     callback({\n  //       status: this.options[index].end,\n  //       index,\n  //       step,\n  //       element,\n  //     });\n  // }\n  // public onNextEnded(index: number): true {\n  //   const callback = this.callbacks[index] as Callback;\n  //   const step = Math.ceil(\n  //     ((this.scrollTopPosition - this.options[index].endPosition) /\n  //       this.windowSize) *\n  //       100\n  //   );\n  //   const element = this.elements[index];\n  //     callback &&\n  //     callback({\n  //       status: this.options[index].ended,\n  //       index,\n  //       step,\n  //       element,\n  //     });\n  // }\n  // public onPrevStart(index: number): true {\n  //   const callback = this.callbacks[index] as Callback;\n  //   const step = Math.ceil(\n  //     ((this.options[index].startPosition - this.scrollBottomPosition) /\n  //       this.windowSize) *\n  //       100\n  //   );\n  //   const element = this.elements[index];\n  //     callback &&\n  //     callback({\n  //       status: this.options[index].start,\n  //       index,\n  //       step,\n  //       element,\n  //     });\n  // }\n  // public onPrevStarted(index: number): true {\n  //   const callback = this.callbacks[index] as Callback;\n  //   const step = Math.ceil(\n  //     ((this.options[index].startPosition - this.scrollTopPosition) /\n  //       this.windowSize) *\n  //       100\n  //   );\n  //   const element = this.elements[index];\n  //     callback &&\n  //     callback({\n  //       status: this.options[index].started,\n  //       index,\n  //       step,\n  //       element,\n  //     });\n  // }\n  // public onPrevEnd(index: number): true {\n  //   const callback = this.callbacks[index] as Callback;\n  //   const step = Math.ceil(\n  //     ((this.options[index].endPosition - this.scrollBottomPosition) /\n  //       this.windowSize) *\n  //       100\n  //   );\n  //   const element = this.elements[index];\n  //     callback &&\n  //     callback({\n  //       status: this.options[index].end,\n  //       index,\n  //       step,\n  //       element,\n  //     });\n  // }\n  // public onPrevEnded(index: number): true {\n  //   const callback = this.callbacks[index] as Callback;\n  //   const step = Math.ceil(\n  //     ((this.options[index].endPosition - this.scrollTopPosition) /\n  //       this.windowSize) *\n  //       100\n  //   );\n  //   const element = this.elements[index];\n  //     callback &&\n  //     callback({\n  //       status: this.options[index].ended,\n  //       index,\n  //       step,\n  //       element,\n  //     });\n  // }\n  // private getLevel(y: number) {\n  //   return Math.ceil(((this.startPosition - y) * 100) / this.windowSize);\n  // }\n  // public onNextStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {\n  //   const fn = this.callbacks[i];\n  //   const step = this.getLevel(y);\n  //   x.classList.add(this.options[i].start);\n  // }\n  // public onPrevEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {\n  //   const fn = this.callbacks[i];\n  //   const step = this.getLevel(y);\n  //   x.classList.remove(this.options[i].started);\n  // }\n\n}\n\n//# sourceURL=webpack://ui-scroll/./src/ux-scroll-callback.ts?");

/***/ }),

/***/ "./src/ux-scroll-transition.ts":
/*!*************************************!*\
  !*** ./src/ux-scroll-transition.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UxScrollTransition)\n/* harmony export */ });\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \"./src/scroll.ts\");\n\nclass UxScrollTransition extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(props) {\n    super({ ...props,\n      commonOptions: {\n        starting: \"ux__transition--animated\",\n        ending: \"ux__transition--animated\",\n        endMargin: \"-1\",\n        ...props.commonOptions\n      }\n    });\n  }\n\n  onNextStarting(index) {\n    this.elements[index].classList.add(this.options[index].starting);\n    return true;\n  }\n\n  onPrevEnding(index) {\n    this.elements[index].classList.remove(this.options[index].starting);\n    return true;\n  }\n\n}\n\n//# sourceURL=webpack://ui-scroll/./src/ux-scroll-transition.ts?");

/***/ }),

/***/ "./styles.scss":
/*!*********************!*\
  !*** ./styles.scss ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ui-scroll/./styles.scss?");

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