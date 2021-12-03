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

/***/ "./src/base/scroll.ts":
/*!****************************!*\
  !*** ./src/base/scroll.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Direction\": () => (/* binding */ Direction),\n/* harmony export */   \"Size\": () => (/* binding */ Size),\n/* harmony export */   \"default\": () => (/* binding */ Scroll)\n/* harmony export */ });\n/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/styles.scss */ \"./src/styles/styles.scss\");\n/* harmony import */ var _utils_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/throttle */ \"./src/utils/throttle.ts\");\n\n\nlet Direction;\n\n(function (Direction) {\n  Direction[\"Y\"] = \"y\";\n  Direction[\"X\"] = \"x\";\n})(Direction || (Direction = {}));\n\nlet Size;\n\n(function (Size) {\n  Size[\"Y\"] = \"height\";\n  Size[\"X\"] = \"width\";\n})(Size || (Size = {}));\n\nclass Scroll {\n  #props;\n  #direction = Direction.Y;\n  #status;\n  scrollPosition = -1;\n  scrollDirection = 1;\n\n  constructor(props) {\n    this.#props = props;\n    this.elements = this.#getElements(this.#props.selector);\n    this.#onResize();\n    this.#status = this.elements.map(() => ({\n      starting: true,\n      doing: true,\n      ending: true\n    }));\n    this.onResize = (0,_utils_throttle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.#onResize, this.#throttleTimer);\n    this.onScroll = (0,_utils_throttle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.#onScroll, this.#throttleTimer);\n  }\n\n  get scrollBottomPosition() {\n    return this.scrollPosition + this.windowSize;\n  }\n\n  get scrollTopPosition() {\n    return this.scrollPosition;\n  } // get #index() {\n  //   if (this.scrollTopPosition === 0) return 0;\n  //   if (this.scrollBottomPosition === this.scrollSize)\n  //     return this.options.length - 1;\n  //   return this.options.findIndex(\n  //     ({ startPosition, endPosition, index }) =>\n  //       startPosition >= this.scrollTopPosition\n  //   );\n  // }\n\n\n  get #getStartingOptions() {\n    return this.options.filter(({\n      startTopPosition,\n      startBottomPosition,\n      index,\n      starting\n    }) => starting && (this.scrollDirection ? startTopPosition <= this.scrollBottomPosition : startBottomPosition >= this.scrollTopPosition) && this.#status[index].starting);\n  }\n\n  get #getDoingOptions() {\n    return this.options.filter(({\n      startTopPosition,\n      endBottomPosition,\n      index,\n      doing\n    }) => doing && (this.scrollDirection ? startTopPosition <= this.scrollTopPosition : endBottomPosition >= this.scrollBottomPosition) && this.#status[index].doing);\n  }\n\n  get #getEndingOptions() {\n    return this.options.filter(({\n      ending,\n      index,\n      endTopPosition,\n      endBottomPosition\n    }) => ending && (this.scrollDirection ? endTopPosition <= this.scrollBottomPosition : endBottomPosition >= this.scrollTopPosition) && this.#status[index].ending);\n  }\n\n  get #throttleTimer() {\n    return this.#props.throttleTimer || 0;\n  }\n\n  #getOptions({\n    options,\n    commonOptions\n  }) {\n    !options && (options = {});\n    !commonOptions && (commonOptions = {});\n    return this.elements.map((x, index) => {\n      const startPosition = this.#direction === Direction.Y ? x.offsetTop : x.offsetLeft;\n      const size = this.#direction === Direction.Y ? x.offsetHeight : x.offsetWidth;\n      const endPosition = startPosition + size;\n      const startTopMargin = this.#getMargin(commonOptions?.startTopMargin || options[index]?.startTopMargin);\n      const endTopMargin = this.#getMargin(commonOptions?.endTopMargin || options[index]?.endTopMargin);\n      const startBottomMargin = this.#getMargin(commonOptions?.startBottomMargin || options[index]?.startBottomMargin);\n      const endBottomMargin = this.#getMargin(commonOptions?.endBottomMargin || options[index]?.endBottomMargin);\n      return {\n        index,\n        size,\n        // startPosition: startPosition,\n        // endPosition: endPosition,\n        startTopPosition: startPosition + startTopMargin,\n        endTopPosition: endPosition + endTopMargin,\n        startBottomPosition: startPosition + startBottomMargin,\n        endBottomPosition: endPosition + endBottomMargin,\n        starting: commonOptions?.starting || options[index]?.starting,\n        doing: commonOptions?.doing || options[index]?.doing,\n        ending: commonOptions?.ending || options[index]?.ending\n      };\n    });\n  }\n\n  #getMargin(margin) {\n    if (!margin) return 0;\n    if (margin.includes(\"px\")) return Number(margin.replace(\"px\", \"\"));\n    if (margin.includes(\"%\")) return Number(margin.replace(\"%\", \"\")) * this.windowSize / 100;\n    return Number(margin) * this.windowSize;\n  }\n\n  #getElements(selector) {\n    return Array.prototype.slice.call(document.querySelectorAll(selector));\n  }\n\n  #getWindowSize() {\n    return this.#direction === Direction.Y ? window.innerHeight : window.innerWidth;\n  }\n\n  #getScrollSize() {\n    return this.#direction === Direction.Y ? Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) : Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);\n  }\n\n  #checkOptions() {\n    this.#getStartingOptions.map(({\n      index\n    }) => {\n      const res = this.onStarting(index);\n      if (res) this.#status[index].starting = false;\n    });\n    this.#getDoingOptions.map(({\n      index\n    }) => {\n      const res = this.onDoing(index);\n      if (res) this.#status[index].doing = false;\n    });\n    this.#getEndingOptions.map(({\n      index\n    }) => {\n      const res = this.onEnding(index);\n      if (res) this.#status[index].ending = false;\n    });\n  }\n\n  #resetStatus(directive) {\n    this.scrollDirection = directive;\n\n    for (const index in this.#status) {\n      this.#status[index].starting = true;\n      this.#status[index].doing = true;\n      this.#status[index].ending = true;\n    }\n  }\n\n  #onScroll = this.#throttleUsingRaf(() => {\n    if (!this.elements) return;\n\n    if (this.scrollPosition > window.scrollY) {\n      this.scrollDirection && this.#resetStatus(0);\n    } else {\n      !this.scrollDirection && this.#resetStatus(1);\n    }\n\n    this.#checkOptions();\n    this.scrollPosition = window.scrollY;\n  });\n  #onResize = this.#throttleUsingRaf(() => {\n    if (!this.elements) return;\n    this.windowSize = this.#getWindowSize();\n    this.scrollSize = this.#getScrollSize();\n    this.options = this.#getOptions({\n      options: this.#props.options,\n      commonOptions: this.#props.commonOptions\n    });\n  });\n\n  #throttleUsingRaf(callback) {\n    let ticking = false;\n    return () => {\n      if (!ticking) {\n        ticking = true;\n        requestAnimationFrame(() => {\n          callback();\n          ticking = false;\n        });\n      }\n    };\n  }\n\n  onStarting(index) {}\n\n  onDoing(index) {}\n\n  onEnding(index) {}\n\n}\n\n//# sourceURL=webpack://ui-scroll/./src/base/scroll.ts?");

/***/ }),

/***/ "./src/base/ux-scroll-callback.ts":
/*!****************************************!*\
  !*** ./src/base/ux-scroll-callback.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UxScrollCallback)\n/* harmony export */ });\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \"./src/base/scroll.ts\");\n\nclass UxScrollCallback extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  #callbacks;\n\n  constructor(props) {\n    super({ ...props,\n      commonOptions: {\n        starting: \"starting\",\n        doing: \"doing\",\n        ending: \"ending\",\n        ...props.commonOptions\n      }\n    });\n    this.#callbacks = props.callbacks;\n  }\n\n  static getStep(level) {\n    let step = level;\n    if (level > 100) step = 100;\n    if (level < 0) step = 0;\n    return step;\n  }\n\n  onStarting(index) {\n    const callback = this.#callbacks[index];\n    const position = this.scrollDirection ? this.options[index].startTopPosition : this.options[index].startBottomPosition;\n    const level = Math.ceil((this.scrollBottomPosition - position) / this.windowSize * 100);\n    const step = UxScrollCallback.getStep(level);\n    const element = this.elements[index];\n    callback && callback({\n      status: this.options[index].starting,\n      index,\n      step,\n      element\n    });\n    if (level < 0 || level > 100) return true;\n  }\n\n  onDoing(index) {\n    const callback = this.#callbacks[index];\n    const position = this.scrollDirection ? this.options[index].endTopPosition : this.options[index].endBottomPosition;\n    const level = 100 - Math.ceil((position - this.scrollBottomPosition) / (this.options[index].size - this.windowSize) * 100);\n    const step = UxScrollCallback.getStep(level);\n    const element = this.elements[index];\n    callback && callback({\n      status: this.options[index].doing,\n      index,\n      step,\n      element\n    });\n    if (level < 0 || level > 100) return true;\n  }\n\n  onEnding(index) {\n    const callback = this.#callbacks[index];\n    const position = this.scrollDirection ? this.options[index].endTopPosition : this.options[index].endBottomPosition;\n    const level = 100 - Math.ceil((position - this.scrollTopPosition) / this.windowSize * 100);\n    const step = UxScrollCallback.getStep(level);\n    const element = this.elements[index];\n    callback && callback({\n      status: this.options[index].ending,\n      index,\n      step,\n      element\n    });\n    if (level < 0 || level > 100) return true;\n  }\n\n}\n\n//# sourceURL=webpack://ui-scroll/./src/base/ux-scroll-callback.ts?");

/***/ }),

/***/ "./src/base/ux-scroll-transition.ts":
/*!******************************************!*\
  !*** ./src/base/ux-scroll-transition.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UxScrollTransition)\n/* harmony export */ });\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \"./src/base/scroll.ts\");\n\nclass UxScrollTransition extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(props) {\n    super({ ...props,\n      commonOptions: {\n        starting: \"ux__transition--animated\",\n        startBottomMargin: \"-1\",\n        ...props.commonOptions\n      }\n    });\n  }\n\n  onStarting(index) {\n    if (this.scrollDirection) {\n      this.elements[index].classList.add(this.options[index].starting);\n    } else {\n      this.elements[index].classList.remove(this.options[index].starting);\n    }\n\n    return true;\n  }\n\n}\n\n//# sourceURL=webpack://ui-scroll/./src/base/ux-scroll-transition.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UxScrollTransition\": () => (/* reexport safe */ _base_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"UxScrollCallback\": () => (/* reexport safe */ _base_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _base_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/ux-scroll-transition */ \"./src/base/ux-scroll-transition.ts\");\n/* harmony import */ var _base_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/ux-scroll-callback */ \"./src/base/ux-scroll-callback.ts\");\n\n\n\n\n//# sourceURL=webpack://ui-scroll/./src/index.ts?");

/***/ }),

/***/ "./src/utils/throttle.ts":
/*!*******************************!*\
  !*** ./src/utils/throttle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(fn, wait) {\n  let inThrottle;\n  return function (...arg) {\n    if (inThrottle) return;\n    inThrottle = setTimeout(() => {\n      fn.call(this, arg);\n      inThrottle = false;\n    }, wait);\n  };\n}\n\n//# sourceURL=webpack://ui-scroll/./src/utils/throttle.ts?");

/***/ }),

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ui-scroll/./src/styles/styles.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});