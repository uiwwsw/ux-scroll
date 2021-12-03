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
		define("ux-scroll", [], factory);
	else if(typeof exports === 'object')
		exports["ux-scroll"] = factory();
	else
		root["ux-scroll"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/base/scroll.ts":
/*!****************************!*\
  !*** ./src/base/scroll.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Direction\": () => (/* binding */ Direction),\n/* harmony export */   \"Size\": () => (/* binding */ Size),\n/* harmony export */   \"default\": () => (/* binding */ Scroll)\n/* harmony export */ });\n/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/styles.scss */ \"./src/styles/styles.scss\");\n/* harmony import */ var _utils_throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/throttle */ \"./src/utils/throttle.ts\");\nvar __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {\n  if (kind === \"m\") throw new TypeError(\"Private method is not writable\");\n  if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a setter\");\n  if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot write private member to an object whose class did not declare it\");\n  return kind === \"a\" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;\n};\n\nvar __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {\n  if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\n  if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\n  return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\n};\n\nvar _Scroll_instances, _Scroll_props, _Scroll_direction, _Scroll_status, _Scroll_getStartingOptions_get, _Scroll_getDoingOptions_get, _Scroll_getEndingOptions_get, _Scroll_throttleTimer_get, _Scroll_getOptions, _Scroll_getMargin, _Scroll_getElements, _Scroll_getWindowSize, _Scroll_getScrollSize, _Scroll_checkOptions, _Scroll_resetStatus, _Scroll_onScroll, _Scroll_onResize, _Scroll_throttleUsingRaf;\n\n\n\nvar Direction;\n\n(function (Direction) {\n  Direction[\"Y\"] = \"y\";\n  Direction[\"X\"] = \"x\";\n})(Direction || (Direction = {}));\n\nvar Size;\n\n(function (Size) {\n  Size[\"Y\"] = \"height\";\n  Size[\"X\"] = \"width\";\n})(Size || (Size = {}));\n\nclass Scroll {\n  constructor(props) {\n    _Scroll_instances.add(this);\n\n    _Scroll_props.set(this, void 0);\n\n    _Scroll_direction.set(this, Direction.Y);\n\n    _Scroll_status.set(this, void 0);\n\n    this.scrollPosition = -1;\n    this.scrollDirection = 1;\n\n    _Scroll_onScroll.set(this, __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_throttleUsingRaf).call(this, () => {\n      if (!this.elements) return;\n\n      if (this.scrollPosition > window.scrollY) {\n        this.scrollDirection && __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_resetStatus).call(this, 0);\n      } else {\n        !this.scrollDirection && __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_resetStatus).call(this, 1);\n      }\n\n      __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_checkOptions).call(this);\n\n      this.scrollPosition = window.scrollY;\n    }));\n\n    _Scroll_onResize.set(this, __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_throttleUsingRaf).call(this, () => {\n      if (!this.elements) return;\n      this.windowSize = __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_getWindowSize).call(this);\n      this.scrollSize = __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_getScrollSize).call(this);\n      this.options = __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_getOptions).call(this, {\n        options: __classPrivateFieldGet(this, _Scroll_props, \"f\").options,\n        commonOptions: __classPrivateFieldGet(this, _Scroll_props, \"f\").commonOptions\n      });\n    }));\n\n    __classPrivateFieldSet(this, _Scroll_props, props, \"f\");\n\n    this.elements = __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_getElements).call(this, __classPrivateFieldGet(this, _Scroll_props, \"f\").selector);\n\n    __classPrivateFieldGet(this, _Scroll_onResize, \"f\").call(this);\n\n    __classPrivateFieldSet(this, _Scroll_status, this.elements.map(() => ({\n      starting: true,\n      doing: true,\n      ending: true\n    })), \"f\");\n\n    this.onResize = (0,_utils_throttle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(__classPrivateFieldGet(this, _Scroll_onResize, \"f\"), __classPrivateFieldGet(this, _Scroll_instances, \"a\", _Scroll_throttleTimer_get));\n    this.onScroll = (0,_utils_throttle__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(__classPrivateFieldGet(this, _Scroll_onScroll, \"f\"), __classPrivateFieldGet(this, _Scroll_instances, \"a\", _Scroll_throttleTimer_get));\n  }\n\n  get scrollBottomPosition() {\n    return this.scrollPosition + this.windowSize;\n  }\n\n  get scrollTopPosition() {\n    return this.scrollPosition;\n  }\n\n  onStarting(index) {}\n\n  onDoing(index) {}\n\n  onEnding(index) {}\n\n}\n_Scroll_props = new WeakMap(), _Scroll_direction = new WeakMap(), _Scroll_status = new WeakMap(), _Scroll_onScroll = new WeakMap(), _Scroll_onResize = new WeakMap(), _Scroll_instances = new WeakSet(), _Scroll_getStartingOptions_get = function _Scroll_getStartingOptions_get() {\n  return this.options.filter(({\n    startTopPosition,\n    startBottomPosition,\n    index,\n    starting\n  }) => starting && (this.scrollDirection ? startTopPosition <= this.scrollBottomPosition : startBottomPosition >= this.scrollTopPosition) && __classPrivateFieldGet(this, _Scroll_status, \"f\")[index].starting);\n}, _Scroll_getDoingOptions_get = function _Scroll_getDoingOptions_get() {\n  return this.options.filter(({\n    startTopPosition,\n    endBottomPosition,\n    index,\n    doing\n  }) => doing && (this.scrollDirection ? startTopPosition <= this.scrollTopPosition : endBottomPosition >= this.scrollBottomPosition) && __classPrivateFieldGet(this, _Scroll_status, \"f\")[index].doing);\n}, _Scroll_getEndingOptions_get = function _Scroll_getEndingOptions_get() {\n  return this.options.filter(({\n    ending,\n    index,\n    endTopPosition,\n    endBottomPosition\n  }) => ending && (this.scrollDirection ? endTopPosition <= this.scrollBottomPosition : endBottomPosition >= this.scrollTopPosition) && __classPrivateFieldGet(this, _Scroll_status, \"f\")[index].ending);\n}, _Scroll_throttleTimer_get = function _Scroll_throttleTimer_get() {\n  return __classPrivateFieldGet(this, _Scroll_props, \"f\").throttleTimer || 0;\n}, _Scroll_getOptions = function _Scroll_getOptions({\n  options,\n  commonOptions\n}) {\n  !options && (options = {});\n  !commonOptions && (commonOptions = {});\n  return this.elements.map((x, index) => {\n    var _a, _b, _c, _d, _e, _f, _g;\n\n    const startPosition = __classPrivateFieldGet(this, _Scroll_direction, \"f\") === Direction.Y ? x.offsetTop : x.offsetLeft;\n    const size = __classPrivateFieldGet(this, _Scroll_direction, \"f\") === Direction.Y ? x.offsetHeight : x.offsetWidth;\n    const endPosition = startPosition + size;\n\n    const startTopMargin = __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_getMargin).call(this, (commonOptions === null || commonOptions === void 0 ? void 0 : commonOptions.startTopMargin) || ((_a = options[index]) === null || _a === void 0 ? void 0 : _a.startTopMargin));\n\n    const endTopMargin = __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_getMargin).call(this, (commonOptions === null || commonOptions === void 0 ? void 0 : commonOptions.endTopMargin) || ((_b = options[index]) === null || _b === void 0 ? void 0 : _b.endTopMargin));\n\n    const startBottomMargin = __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_getMargin).call(this, (commonOptions === null || commonOptions === void 0 ? void 0 : commonOptions.startBottomMargin) || ((_c = options[index]) === null || _c === void 0 ? void 0 : _c.startBottomMargin));\n\n    const endBottomMargin = __classPrivateFieldGet(this, _Scroll_instances, \"m\", _Scroll_getMargin).call(this, (commonOptions === null || commonOptions === void 0 ? void 0 : commonOptions.endBottomMargin) || ((_d = options[index]) === null || _d === void 0 ? void 0 : _d.endBottomMargin));\n\n    return {\n      index,\n      size,\n      // startPosition: startPosition,\n      // endPosition: endPosition,\n      startTopPosition: startPosition + startTopMargin,\n      endTopPosition: endPosition + endTopMargin,\n      startBottomPosition: startPosition + startBottomMargin,\n      endBottomPosition: endPosition + endBottomMargin,\n      starting: (commonOptions === null || commonOptions === void 0 ? void 0 : commonOptions.starting) || ((_e = options[index]) === null || _e === void 0 ? void 0 : _e.starting),\n      doing: (commonOptions === null || commonOptions === void 0 ? void 0 : commonOptions.doing) || ((_f = options[index]) === null || _f === void 0 ? void 0 : _f.doing),\n      ending: (commonOptions === null || commonOptions === void 0 ? void 0 : commonOptions.ending) || ((_g = options[index]) === null || _g === void 0 ? void 0 : _g.ending)\n    };\n  });\n}, _Scroll_getMargin = function _Scroll_getMargin(margin) {\n  if (!margin) return 0;\n  if (margin.includes(\"px\")) return Number(margin.replace(\"px\", \"\"));\n  if (margin.includes(\"%\")) return Number(margin.replace(\"%\", \"\")) * this.windowSize / 100;\n  return Number(margin) * this.windowSize;\n}, _Scroll_getElements = function _Scroll_getElements(selector) {\n  return Array.prototype.slice.call(document.querySelectorAll(selector));\n}, _Scroll_getWindowSize = function _Scroll_getWindowSize() {\n  return __classPrivateFieldGet(this, _Scroll_direction, \"f\") === Direction.Y ? window.innerHeight : window.innerWidth;\n}, _Scroll_getScrollSize = function _Scroll_getScrollSize() {\n  return __classPrivateFieldGet(this, _Scroll_direction, \"f\") === Direction.Y ? Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) : Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);\n}, _Scroll_checkOptions = function _Scroll_checkOptions() {\n  __classPrivateFieldGet(this, _Scroll_instances, \"a\", _Scroll_getStartingOptions_get).map(({\n    index\n  }) => {\n    const res = this.onStarting(index);\n    if (res) __classPrivateFieldGet(this, _Scroll_status, \"f\")[index].starting = false;\n  });\n\n  __classPrivateFieldGet(this, _Scroll_instances, \"a\", _Scroll_getDoingOptions_get).map(({\n    index\n  }) => {\n    const res = this.onDoing(index);\n    if (res) __classPrivateFieldGet(this, _Scroll_status, \"f\")[index].doing = false;\n  });\n\n  __classPrivateFieldGet(this, _Scroll_instances, \"a\", _Scroll_getEndingOptions_get).map(({\n    index\n  }) => {\n    const res = this.onEnding(index);\n    if (res) __classPrivateFieldGet(this, _Scroll_status, \"f\")[index].ending = false;\n  });\n}, _Scroll_resetStatus = function _Scroll_resetStatus(directive) {\n  this.scrollDirection = directive;\n\n  for (const index in __classPrivateFieldGet(this, _Scroll_status, \"f\")) {\n    __classPrivateFieldGet(this, _Scroll_status, \"f\")[index].starting = true;\n    __classPrivateFieldGet(this, _Scroll_status, \"f\")[index].doing = true;\n    __classPrivateFieldGet(this, _Scroll_status, \"f\")[index].ending = true;\n  }\n}, _Scroll_throttleUsingRaf = function _Scroll_throttleUsingRaf(callback) {\n  let ticking = false;\n  return () => {\n    if (!ticking) {\n      ticking = true;\n      requestAnimationFrame(() => {\n        callback();\n        ticking = false;\n      });\n    }\n  };\n};\n\n//# sourceURL=webpack://ux-scroll/./src/base/scroll.ts?");

/***/ }),

/***/ "./src/base/ux-scroll-callback.ts":
/*!****************************************!*\
  !*** ./src/base/ux-scroll-callback.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UxScrollCallback)\n/* harmony export */ });\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \"./src/base/scroll.ts\");\nvar __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {\n  if (kind === \"m\") throw new TypeError(\"Private method is not writable\");\n  if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a setter\");\n  if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot write private member to an object whose class did not declare it\");\n  return kind === \"a\" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;\n};\n\nvar __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {\n  if (kind === \"a\" && !f) throw new TypeError(\"Private accessor was defined without a getter\");\n  if (typeof state === \"function\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\"Cannot read private member from an object whose class did not declare it\");\n  return kind === \"m\" ? f : kind === \"a\" ? f.call(receiver) : f ? f.value : state.get(receiver);\n};\n\nvar _UxScrollCallback_callbacks;\n\n\nclass UxScrollCallback extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(props) {\n    super(Object.assign(Object.assign({}, props), {\n      commonOptions: Object.assign({\n        starting: \"starting\",\n        doing: \"doing\",\n        ending: \"ending\"\n      }, props.commonOptions)\n    }));\n\n    _UxScrollCallback_callbacks.set(this, void 0);\n\n    __classPrivateFieldSet(this, _UxScrollCallback_callbacks, props.callbacks, \"f\");\n  }\n\n  static getStep(level) {\n    let step = level;\n    if (level > 100) step = 100;\n    if (level < 0) step = 0;\n    return step;\n  }\n\n  onStarting(index) {\n    const callback = __classPrivateFieldGet(this, _UxScrollCallback_callbacks, \"f\")[index];\n\n    const position = this.scrollDirection ? this.options[index].startTopPosition : this.options[index].startBottomPosition;\n    const level = Math.ceil((this.scrollBottomPosition - position) / this.windowSize * 100);\n    const step = UxScrollCallback.getStep(level);\n    const element = this.elements[index];\n    callback && callback({\n      status: this.options[index].starting,\n      index,\n      step,\n      element\n    });\n    if (level < 0 || level > 100) return true;\n  }\n\n  onDoing(index) {\n    const callback = __classPrivateFieldGet(this, _UxScrollCallback_callbacks, \"f\")[index];\n\n    const position = this.scrollDirection ? this.options[index].endTopPosition : this.options[index].endBottomPosition;\n    const level = 100 - Math.ceil((position - this.scrollBottomPosition) / (this.options[index].size - this.windowSize) * 100);\n    const step = UxScrollCallback.getStep(level);\n    const element = this.elements[index];\n    callback && callback({\n      status: this.options[index].doing,\n      index,\n      step,\n      element\n    });\n    if (level < 0 || level > 100) return true;\n  }\n\n  onEnding(index) {\n    const callback = __classPrivateFieldGet(this, _UxScrollCallback_callbacks, \"f\")[index];\n\n    const position = this.scrollDirection ? this.options[index].endTopPosition : this.options[index].endBottomPosition;\n    const level = 100 - Math.ceil((position - this.scrollTopPosition) / this.windowSize * 100);\n    const step = UxScrollCallback.getStep(level);\n    const element = this.elements[index];\n    callback && callback({\n      status: this.options[index].ending,\n      index,\n      step,\n      element\n    });\n    if (level < 0 || level > 100) return true;\n  }\n\n}\n_UxScrollCallback_callbacks = new WeakMap();\n\n//# sourceURL=webpack://ux-scroll/./src/base/ux-scroll-callback.ts?");

/***/ }),

/***/ "./src/base/ux-scroll-transition.ts":
/*!******************************************!*\
  !*** ./src/base/ux-scroll-transition.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UxScrollTransition)\n/* harmony export */ });\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \"./src/base/scroll.ts\");\n\nclass UxScrollTransition extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(props) {\n    super(Object.assign(Object.assign({}, props), {\n      commonOptions: Object.assign({\n        starting: \"ux__transition--animated\",\n        startBottomMargin: \"-1\"\n      }, props.commonOptions)\n    }));\n  }\n\n  onStarting(index) {\n    if (this.scrollDirection) {\n      this.elements[index].classList.add(this.options[index].starting);\n    } else {\n      this.elements[index].classList.remove(this.options[index].starting);\n    }\n\n    return true;\n  }\n\n}\n\n//# sourceURL=webpack://ux-scroll/./src/base/ux-scroll-transition.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UxScrollTransition\": () => (/* reexport safe */ _base_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"UxScrollCallback\": () => (/* reexport safe */ _base_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _base_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/ux-scroll-transition */ \"./src/base/ux-scroll-transition.ts\");\n/* harmony import */ var _base_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/ux-scroll-callback */ \"./src/base/ux-scroll-callback.ts\");\n\n\n\n\n//# sourceURL=webpack://ux-scroll/./src/index.ts?");

/***/ }),

/***/ "./src/utils/throttle.ts":
/*!*******************************!*\
  !*** ./src/utils/throttle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(fn, wait) {\n  let inThrottle;\n  return function (...arg) {\n    if (inThrottle) return;\n    inThrottle = setTimeout(() => {\n      fn.call(this, arg);\n      inThrottle = false;\n    }, wait);\n  };\n}\n\n//# sourceURL=webpack://ux-scroll/./src/utils/throttle.ts?");

/***/ }),

/***/ "./src/styles/styles.scss":
/*!********************************!*\
  !*** ./src/styles/styles.scss ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ux-scroll/./src/styles/styles.scss?");

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