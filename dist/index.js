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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UxScrollTransition\": () => (/* reexport safe */ _src_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"UxScrollCallback\": () => (/* reexport safe */ _src_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"CALLBACK_UP_DONE\": () => (/* reexport safe */ _src_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__.CALLBACK_UP_DONE),\n/* harmony export */   \"CALLBACK_DOWN_DONE\": () => (/* reexport safe */ _src_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__.CALLBACK_DOWN_DONE)\n/* harmony export */ });\n/* harmony import */ var _src_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ux-scroll-transition */ \"./src/ux-scroll-transition.ts\");\n/* harmony import */ var _src_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/ux-scroll-callback */ \"./src/ux-scroll-callback.ts\");\n\n\n\n\n//# sourceURL=webpack://ui-scroll/./index.ts?");

/***/ }),

/***/ "./src/scroll.ts":
/*!***********************!*\
  !*** ./src/scroll.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Direction\": () => (/* binding */ Direction),\n/* harmony export */   \"Size\": () => (/* binding */ Size),\n/* harmony export */   \"default\": () => (/* binding */ Scroll)\n/* harmony export */ });\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles.scss */ \"./styles.scss\");\n/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./throttle */ \"./src/throttle.ts\");\n\n\nlet Direction;\n\n(function (Direction) {\n  Direction[\"Y\"] = \"y\";\n  Direction[\"X\"] = \"x\";\n})(Direction || (Direction = {}));\n\nlet Size; // type OptionKey = \"classStart\" | \"classEnd\";\n\n(function (Size) {\n  Size[\"Y\"] = \"height\";\n  Size[\"X\"] = \"width\";\n})(Size || (Size = {}));\n\nclass Scroll {\n  static scrollPosition = -1;\n  static direction = Direction.Y; // protected static size = Size.Y;\n\n  constructor({\n    selector,\n    commonOptions,\n    options\n  }) {\n    Scroll.windowSize = Scroll.getWindowSize();\n    this.elements = this.getElements(selector);\n    this.options = this.getOptions({\n      options,\n      commonOptions\n    });\n    this.addGlobalEvent();\n  }\n\n  static get startPosition() {\n    return Scroll.scrollPosition + Scroll.windowSize;\n  }\n\n  static get endPosition() {\n    return Scroll.scrollPosition;\n  }\n\n  get index() {\n    const number = this.elements.findIndex((x, i) => this.options[i].position > Scroll.windowSize);\n    return number === -1 ? this.elements.length : number;\n  }\n\n  getUnit(str) {\n    if (!str) return 0;\n    if (str.includes(\"px\")) return Number(str.replace(\"px\", \"\"));\n    if (str.includes(\"%\")) return Number(str.replace(\"%\", \"\")) * Scroll.windowSize * 0.01;\n    return Number(str) * Scroll.windowSize;\n  }\n\n  getOptions({\n    options,\n    commonOptions\n  }) {\n    !options && (options = {});\n    !commonOptions && (commonOptions = {});\n    return this.elements.map(({\n      x,\n      i\n    }) => {\n      const position = Scroll.direction === Direction.Y ? x.offsetTop : x.offsetLeft;\n      return {\n        position,\n        marginStart: this.getUnit(commonOptions?.marginStart) || this.getUnit(options[i]?.marginStart),\n        marginEnd: this.getUnit(commonOptions?.marginEnd) || this.getUnit(options[i]?.marginEnd),\n        classStart: commonOptions?.classStart || options[i]?.classStart,\n        classEnd: commonOptions?.classEnd || options[i]?.classEnd,\n        dataDuration: commonOptions?.dataDuration || options[i]?.dataDuration\n      };\n    });\n  }\n\n  getElements(selector) {\n    return Array.prototype.slice.call(document.querySelectorAll(selector)).map((x, i) => ({\n      x,\n      i\n    }));\n  }\n\n  static getWindowSize() {\n    return Scroll.direction === Direction.Y ? window.outerHeight : window.outerWidth;\n  }\n\n  get getScrollDownElements() {\n    return this.elements.map(({\n      x,\n      i\n    }) => ({\n      x: x,\n      y: this.options[i].position + this.options[i].marginStart,\n      i\n    })).filter(({\n      x,\n      y,\n      i\n    }) => this.options[i].classStart && y < Scroll.startPosition && !x.classList.contains(this.options[i].classStart));\n  } // private getScrollDurationElements() {\n  //   return this.elements\n  //     .map(({ x, i }) => ({\n  //       x: x,\n  //       step: this.options[i].dataDuration,\n  //       y: this.options[i].position + this.options[i].marginStart,\n  //     }))\n  //     .filter(\n  //       ({ x, step, y }) =>\n  //         step && y < Scroll.startPosition && x.dataset[step] !== \"100\"\n  //     );\n  // }\n\n\n  get getDownElements() {\n    return this.elements.map(({\n      x,\n      i\n    }) => ({\n      x: x,\n      y: this.options[i].position + this.options[i].marginEnd,\n      i\n    })).filter(({\n      x,\n      y,\n      i\n    }) => this.options[i].classEnd && y < Scroll.endPosition && !x.classList.contains(this.options[i].classEnd));\n  }\n\n  get getScrollUpElements() {\n    return this.elements.map(({\n      x,\n      i\n    }) => ({\n      x: x,\n      y: this.options[i].position + this.options[i].marginStart,\n      i\n    })).filter(({\n      x,\n      y,\n      i\n    }) => this.options[i].classStart && y > Scroll.startPosition && x.classList.contains(this.options[i].classStart));\n  } // private getDurationElements() {\n  //   return this.elements\n  //     .map(({ x, i }) => ({\n  //       x: x,\n  //       step: this.options[i].dataDuration,\n  //       y: this.options[i].position + this.options[i].marginEnd,\n  //     }))\n  //     .filter(\n  //       ({ x, step, y }) =>\n  //         step && y > Scroll.endPosition && x.dataset[step] !== \"0\"\n  //     );\n  // }\n\n\n  get getUpElements() {\n    return this.elements.map(({\n      x,\n      i\n    }) => ({\n      x: x,\n      y: this.options[i].position + this.options[i].marginEnd,\n      i\n    })).filter(({\n      x,\n      y,\n      i\n    }) => this.options[i].classEnd && y > Scroll.endPosition && x.classList.contains(this.options[i].classEnd));\n  }\n\n  onNextStart({\n    x,\n    y,\n    i\n  }) {}\n\n  onNextEnd({\n    x,\n    y,\n    i\n  }) {}\n\n  onPrevStart({\n    x,\n    y,\n    i\n  }) {}\n\n  onPrevEnd({\n    x,\n    y,\n    i\n  }) {}\n\n  onNext = (0,_throttle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(() => {\n    this.getScrollDownElements.map(({\n      x,\n      y,\n      i\n    }) => {\n      this.onNextStart({\n        x,\n        y,\n        i\n      });\n    }); // this.getScrollDurationElements().map(({ x, y }, i) => {\n    //   this.onNextDutation(x, y, i);\n    // });\n\n    this.getDownElements.map(({\n      x,\n      y,\n      i\n    }) => {\n      this.onNextEnd({\n        x,\n        y,\n        i\n      });\n    });\n  }, 100);\n  onPrev = (0,_throttle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(() => {\n    this.getScrollUpElements.map(({\n      x,\n      y,\n      i\n    }) => {\n      this.onPrevStart({\n        x,\n        y,\n        i\n      });\n    }); // this.getDurationElements().map(({ x, y }, i) => {\n    //   this.onPrevDutation(x, y, i);\n    // });\n\n    this.getUpElements.map(({\n      x,\n      y,\n      i\n    }) => {\n      this.onPrevEnd({\n        x,\n        y,\n        i\n      });\n    });\n  }, 100);\n\n  onScroll() {\n    if (Scroll.scrollPosition > window.scrollY) {\n      this.onPrev();\n    } else {\n      this.onNext();\n    }\n\n    Scroll.scrollPosition = window.scrollY;\n  }\n\n  static onResize() {\n    Scroll.windowSize = Scroll.getWindowSize();\n  }\n\n  addGlobalEvent() {\n    window.onscroll = this.onScroll.bind(this);\n    window.onresize = (0,_throttle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Scroll.onResize, 100);\n  }\n\n}\n\n//# sourceURL=webpack://ui-scroll/./src/scroll.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CALLBACK_DOWN_DONE\": () => (/* binding */ CALLBACK_DOWN_DONE),\n/* harmony export */   \"CALLBACK_UP_DONE\": () => (/* binding */ CALLBACK_UP_DONE),\n/* harmony export */   \"default\": () => (/* binding */ UxScrollCallback)\n/* harmony export */ });\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \"./src/scroll.ts\");\n\nconst CALLBACK_DOWN_DONE = Symbol(\"STARTED\");\nconst CALLBACK_UP_DONE = Symbol(\"ENDED\"); // export symbol LEVEL = 'd' {\n//   START_DONE = \"START_DONE\",\n//   END_DONE = \"END_DONE\",\n// }\n\nclass UxScrollCallback extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    selector,\n    callbacks,\n    commonOptions,\n    options\n  }) {\n    commonOptions = {\n      classStart: \"ux__callback--end\",\n      classEnd: \"ux__callback--start\",\n      ...commonOptions\n    };\n    super({\n      selector,\n      options,\n      commonOptions\n    });\n    this.callbacks = callbacks;\n  }\n\n  getLevel(y) {\n    return Math.ceil((_scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"].startPosition - y) * 100 / _scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"].windowSize);\n  }\n\n  onNextStart({\n    x,\n    y,\n    i\n  }) {\n    const fn = this.callbacks[i];\n    const step = this.getLevel(y);\n    const res = fn && fn({\n      x,\n      step,\n      i\n    });\n    !x.classList.contains(this.options[i].classEnd) && x.classList.add(this.options[i].classEnd);\n    if (res === CALLBACK_DOWN_DONE) x.classList.add(this.options[i].classStart);\n  }\n\n  onPrevEnd({\n    x,\n    y,\n    i\n  }) {\n    const fn = this.callbacks[i];\n    const step = this.getLevel(y);\n    const res = fn && fn({\n      x,\n      step,\n      i\n    });\n    x.classList.contains(this.options[i].classStart) && x.classList.remove(this.options[i].classStart);\n    if (res === CALLBACK_UP_DONE) x.classList.remove(this.options[i].classEnd);\n  }\n\n}\n\n//# sourceURL=webpack://ui-scroll/./src/ux-scroll-callback.ts?");

/***/ }),

/***/ "./src/ux-scroll-transition.ts":
/*!*************************************!*\
  !*** ./src/ux-scroll-transition.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UxScrollTransition)\n/* harmony export */ });\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \"./src/scroll.ts\");\n\nclass UxScrollTransition extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor({\n    selector,\n    commonOptions,\n    options\n  }) {\n    commonOptions = {\n      classStart: \"ux__transition--animated\",\n      ...commonOptions\n    };\n    super({\n      selector,\n      options,\n      commonOptions\n    });\n  }\n\n  onNextStart({\n    x,\n    y,\n    i\n  }) {\n    x.classList.add(this.options[i].classStart);\n  }\n\n  onNextEnd({\n    x,\n    y,\n    i\n  }) {\n    x.classList.add(this.options[i].classEnd);\n  }\n\n  onPrevStart({\n    x,\n    y,\n    i\n  }) {\n    x.classList.remove(this.options[i].classStart);\n  }\n\n  onPrevEnd({\n    x,\n    y,\n    i\n  }) {\n    x.classList.remove(this.options[i].classEnd);\n  }\n\n}\n\n//# sourceURL=webpack://ui-scroll/./src/ux-scroll-transition.ts?");

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