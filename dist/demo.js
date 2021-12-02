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
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ (function(module) {

eval("/*\n * ATTENTION: The \"eval\" devtool has been used (maybe by default in mode: \"development\").\n * This devtool is neither made for production nor for readable output files.\n * It uses \"eval()\" calls to create a separate source file in the browser devtools.\n * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)\n * or disable the default devtool with \"devtool: false\".\n * If you are looking for production-ready output files, see mode: \"production\" (https://webpack.js.org/configuration/mode/).\n */\n(function webpackUniversalModuleDefinition(root, factory) {\n\tif(true)\n\t\tmodule.exports = factory();\n\telse {}\n})(this, function() {\nreturn /******/ (() => { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"./index.ts\":\n/*!******************!*\\\n  !*** ./index.ts ***!\n  \\******************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\neval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\\n/* harmony export */   \\\"UxScrollTransition\\\": () => (/* reexport safe */ _src_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__[\\\"default\\\"]),\\n/* harmony export */   \\\"UxScrollCallback\\\": () => (/* reexport safe */ _src_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__[\\\"default\\\"])\\n/* harmony export */ });\\n/* harmony import */ var _src_ux_scroll_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/ux-scroll-transition */ \\\"./src/ux-scroll-transition.ts\\\");\\n/* harmony import */ var _src_ux_scroll_callback__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/ux-scroll-callback */ \\\"./src/ux-scroll-callback.ts\\\");\\n\\n\\n\\n\\n//# sourceURL=webpack://ui-scroll/./index.ts?\");\n\n/***/ }),\n\n/***/ \"./src/scroll.ts\":\n/*!***********************!*\\\n  !*** ./src/scroll.ts ***!\n  \\***********************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\neval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\\n/* harmony export */   \\\"Direction\\\": () => (/* binding */ Direction),\\n/* harmony export */   \\\"Size\\\": () => (/* binding */ Size),\\n/* harmony export */   \\\"default\\\": () => (/* binding */ Scroll)\\n/* harmony export */ });\\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles.scss */ \\\"./styles.scss\\\");\\n/* harmony import */ var _throttle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./throttle */ \\\"./src/throttle.ts\\\");\\n\\n\\nlet Direction;\\n\\n(function (Direction) {\\n  Direction[\\\"Y\\\"] = \\\"y\\\";\\n  Direction[\\\"X\\\"] = \\\"x\\\";\\n})(Direction || (Direction = {}));\\n\\nlet Size; // type OptionKey = \\\"start\\\" | \\\"started\\\";\\n\\n(function (Size) {\\n  Size[\\\"Y\\\"] = \\\"height\\\";\\n  Size[\\\"X\\\"] = \\\"width\\\";\\n})(Size || (Size = {}));\\n\\nclass Scroll {\\n  #props;\\n  #status;\\n  scrollPosition = -1;\\n  #direction = Direction.Y;\\n  #resetStatusFlag = 1; // protected static size = Size.Y;\\n\\n  constructor(props) {\\n    this.#props = props;\\n    this.#onInit();\\n    this.#status = this.elements.map(() => ({\\n      starting: true,\\n      doing: true,\\n      ending: true\\n    }));\\n  }\\n\\n  get scrollBottomPosition() {\\n    return this.scrollPosition + this.windowSize;\\n  }\\n\\n  get scrollTopPosition() {\\n    return this.scrollPosition;\\n  }\\n\\n  get #index() {\\n    if (this.scrollTopPosition === 0) return 0;\\n    if (this.scrollBottomPosition === this.scrollSize) return this.options.length - 1;\\n    return this.options.findIndex(({\\n      startPosition,\\n      endPosition,\\n      index\\n    }) => startPosition >= this.scrollTopPosition);\\n  }\\n\\n  get #getStartingOptions() {\\n    return this.options.filter(({\\n      startPosition,\\n      index,\\n      starting\\n    }) => starting && (this.#resetStatusFlag ? startPosition <= this.scrollBottomPosition : startPosition >= this.scrollTopPosition) && this.#status[index].starting);\\n  }\\n\\n  get #getDoingOptions() {\\n    return this.options.filter(({\\n      startPosition,\\n      index,\\n      doing,\\n      endPosition\\n    }) => doing && (this.#resetStatusFlag ? startPosition <= this.scrollTopPosition : endPosition >= this.scrollBottomPosition) && this.#status[index].doing);\\n  }\\n\\n  get #getEndingOptions() {\\n    return this.options.filter(({\\n      ending,\\n      index,\\n      endPosition\\n    }) => ending && (this.#resetStatusFlag ? endPosition <= this.scrollBottomPosition : endPosition >= this.scrollTopPosition) && this.#status[index].ending);\\n  }\\n\\n  get #throttleTimer() {\\n    return this.#props?.throttleTimer || 0;\\n  }\\n\\n  #getOptions({\\n    options,\\n    commonOptions\\n  }) {\\n    !options && (options = {});\\n    !commonOptions && (commonOptions = {});\\n    return this.elements.map((x, index) => {\\n      const startPosition = this.#direction === Direction.Y ? x.offsetTop : x.offsetLeft;\\n      const size = this.#direction === Direction.Y ? x.offsetHeight : x.offsetWidth;\\n      const endPosition = startPosition + size;\\n      const startMargin = this.#getMargin(commonOptions?.startMargin || options[index]?.startMargin);\\n      const endMargin = this.#getMargin(commonOptions?.endMargin || options[index]?.endMargin);\\n      return {\\n        index,\\n        size,\\n        startPosition: startPosition + startMargin,\\n        endPosition: endPosition + endMargin,\\n        starting: commonOptions?.starting || options[index]?.starting,\\n        doing: commonOptions?.doing || options[index]?.doing,\\n        ending: commonOptions?.ending || options[index]?.ending\\n      };\\n    });\\n  }\\n\\n  #getMargin(margin) {\\n    if (!margin) return 0;\\n    if (margin.includes(\\\"px\\\")) return Number(margin.replace(\\\"px\\\", \\\"\\\"));\\n    if (margin.includes(\\\"%\\\")) return Number(margin.replace(\\\"%\\\", \\\"\\\")) * this.windowSize / 100;\\n    return Number(margin) * this.windowSize;\\n  }\\n\\n  #getElements(selector) {\\n    return Array.prototype.slice.call(document.querySelectorAll(selector));\\n  }\\n\\n  #getWindowSize() {\\n    return this.#direction === Direction.Y ? window.innerHeight : window.innerWidth;\\n  }\\n\\n  #getScrollSize() {\\n    return this.#direction === Direction.Y ? Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) : Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);\\n  }\\n\\n  onNextStarting(index) {}\\n\\n  onNextDoing(index) {}\\n\\n  onNextEnding(index) {}\\n\\n  onPrevStarting(index) {}\\n\\n  onPrevDoing(index) {}\\n\\n  onPrevEnding(index) {}\\n\\n  #scroll() {\\n    this.#getStartingOptions.map(({\\n      index\\n    }) => {\\n      const res = this.#resetStatusFlag ? this.onNextStarting(index) : this.onPrevStarting(index);\\n      console.log(res, this.#status[index].starting, \\\"res\\\");\\n      if (res) this.#status[index].starting = false;\\n    });\\n    this.#getDoingOptions.map(({\\n      index\\n    }) => {\\n      const res = this.#resetStatusFlag ? this.onNextDoing(index) : this.onPrevDoing(index);\\n      if (res) this.#status[index].doing = false;\\n    });\\n    this.#getEndingOptions.map(({\\n      index\\n    }) => {\\n      const res = this.#resetStatusFlag ? this.onNextEnding(index) : this.onPrevEnding(index);\\n      if (res) this.#status[index].ending = false;\\n    });\\n  }\\n\\n  #resetStatus(directive) {\\n    this.#resetStatusFlag = directive;\\n\\n    for (const index in this.#status) {\\n      this.#status[index].starting = true;\\n      this.#status[index].doing = true;\\n      this.#status[index].ending = true;\\n    }\\n  }\\n\\n  onScroll = (0,_throttle__WEBPACK_IMPORTED_MODULE_1__[\\\"default\\\"])(() => {\\n    if (this.scrollPosition > window.scrollY) {\\n      this.#resetStatusFlag && this.#resetStatus(0);\\n    } else {\\n      !this.#resetStatusFlag && this.#resetStatus(1);\\n    }\\n\\n    this.#scroll();\\n    this.scrollPosition = window.scrollY;\\n  }, this.#throttleTimer);\\n\\n  #onInit() {\\n    this.windowSize = this.#getWindowSize();\\n    this.scrollSize = this.#getScrollSize();\\n    this.elements = this.#getElements(this.#props.selector);\\n    this.options = this.#getOptions({\\n      options: this.#props.options,\\n      commonOptions: this.#props.commonOptions\\n    });\\n  }\\n\\n  onResize = (0,_throttle__WEBPACK_IMPORTED_MODULE_1__[\\\"default\\\"])(this.#onInit, this.#throttleTimer);\\n}\\n\\n//# sourceURL=webpack://ui-scroll/./src/scroll.ts?\");\n\n/***/ }),\n\n/***/ \"./src/throttle.ts\":\n/*!*************************!*\\\n  !*** ./src/throttle.ts ***!\n  \\*************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\neval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\\n/* harmony export */   \\\"default\\\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\\n/* harmony export */ });\\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(fn, wait) {\\n  let inThrottle;\\n  return function (...arg) {\\n    if (inThrottle) return;\\n    inThrottle = setTimeout(() => {\\n      fn.call(this, arg);\\n      inThrottle = false;\\n    }, wait);\\n  };\\n}\\n\\n//# sourceURL=webpack://ui-scroll/./src/throttle.ts?\");\n\n/***/ }),\n\n/***/ \"./src/ux-scroll-callback.ts\":\n/*!***********************************!*\\\n  !*** ./src/ux-scroll-callback.ts ***!\n  \\***********************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\neval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\\n/* harmony export */   \\\"default\\\": () => (/* binding */ UxScrollCallback)\\n/* harmony export */ });\\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \\\"./src/scroll.ts\\\");\\n\\nclass UxScrollCallback extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\\\"default\\\"] {\\n  constructor(props) {\\n    super({ ...props,\\n      commonOptions: {\\n        starting: \\\"ux__callback--starting\\\",\\n        doing: \\\"ux__callback--doing\\\",\\n        ending: \\\"ux__callback--ending\\\",\\n        ...props.commonOptions\\n      }\\n    });\\n    this.callbacks = props.callbacks;\\n  }\\n\\n  static getStep(level) {\\n    let step = level;\\n    if (level > 100) step = 100;\\n    if (level < 0) step = 0;\\n    return step;\\n  }\\n\\n  onNextStarting(index) {\\n    const callback = this.callbacks[index];\\n    const level = Math.ceil((this.scrollBottomPosition - this.options[index].startPosition) / this.windowSize * 100);\\n    const step = UxScrollCallback.getStep(level);\\n    const element = this.elements[index];\\n    callback && callback({\\n      status: this.options[index].starting,\\n      index,\\n      step,\\n      element\\n    });\\n    if (level < 0 || level > 100) return true;\\n  }\\n\\n  onNextDoing(index) {\\n    const callback = this.callbacks[index];\\n    const level = 100 - Math.ceil((this.options[index].endPosition - this.scrollBottomPosition) / (this.options[index].size - this.windowSize) * 100);\\n    const step = UxScrollCallback.getStep(level);\\n    const element = this.elements[index];\\n    callback && callback({\\n      status: this.options[index].doing,\\n      index,\\n      step,\\n      element\\n    });\\n    if (level < 0 || level > 100) return true;\\n  }\\n\\n  onNextEnding(index) {\\n    const callback = this.callbacks[index];\\n    const level = 100 - Math.ceil((this.options[index].endPosition - this.scrollTopPosition) / this.windowSize * 100);\\n    const step = UxScrollCallback.getStep(level);\\n    const element = this.elements[index];\\n    callback && callback({\\n      status: this.options[index].ending,\\n      index,\\n      step,\\n      element\\n    });\\n    if (level < 0 || level > 100) return true;\\n  }\\n\\n  onPrevStarting = this.onNextStarting;\\n  onPrevDoing = this.onNextDoing;\\n  onPrevEnding = this.onNextEnding; // public onNextStart(index: number): true {\\n  //   const callback = this.callbacks[index] as Callback;\\n  //   const step = Math.ceil(\\n  //     ((this.scrollBottomPosition - this.options[index].startPosition) /\\n  //       this.windowSize) *\\n  //       100\\n  //   );\\n  //   const element = this.elements[index];\\n  //     callback &&\\n  //     callback({\\n  //       status: this.options[index].start,\\n  //       index,\\n  //       step,\\n  //       element,\\n  //     });\\n  // }\\n  // public onNextStarted(index: number): true {\\n  //   const callback = this.callbacks[index] as Callback;\\n  //   const step = Math.ceil(\\n  //     ((this.scrollTopPosition - this.options[index].startPosition) /\\n  //       this.windowSize) *\\n  //       100\\n  //   );\\n  //   const element = this.elements[index];\\n  //     callback &&\\n  //     callback({\\n  //       status: this.options[index].started,\\n  //       index,\\n  //       step,\\n  //       element,\\n  //     });\\n  // }\\n  // public onNextEnd(index: number): true {\\n  //   const callback = this.callbacks[index] as Callback;\\n  //   const step = Math.ceil(\\n  //     ((this.scrollBottomPosition - this.options[index].endPosition) /\\n  //       this.windowSize) *\\n  //       100\\n  //   );\\n  //   const element = this.elements[index];\\n  //     callback &&\\n  //     callback({\\n  //       status: this.options[index].end,\\n  //       index,\\n  //       step,\\n  //       element,\\n  //     });\\n  // }\\n  // public onNextEnded(index: number): true {\\n  //   const callback = this.callbacks[index] as Callback;\\n  //   const step = Math.ceil(\\n  //     ((this.scrollTopPosition - this.options[index].endPosition) /\\n  //       this.windowSize) *\\n  //       100\\n  //   );\\n  //   const element = this.elements[index];\\n  //     callback &&\\n  //     callback({\\n  //       status: this.options[index].ended,\\n  //       index,\\n  //       step,\\n  //       element,\\n  //     });\\n  // }\\n  // public onPrevStart(index: number): true {\\n  //   const callback = this.callbacks[index] as Callback;\\n  //   const step = Math.ceil(\\n  //     ((this.options[index].startPosition - this.scrollBottomPosition) /\\n  //       this.windowSize) *\\n  //       100\\n  //   );\\n  //   const element = this.elements[index];\\n  //     callback &&\\n  //     callback({\\n  //       status: this.options[index].start,\\n  //       index,\\n  //       step,\\n  //       element,\\n  //     });\\n  // }\\n  // public onPrevStarted(index: number): true {\\n  //   const callback = this.callbacks[index] as Callback;\\n  //   const step = Math.ceil(\\n  //     ((this.options[index].startPosition - this.scrollTopPosition) /\\n  //       this.windowSize) *\\n  //       100\\n  //   );\\n  //   const element = this.elements[index];\\n  //     callback &&\\n  //     callback({\\n  //       status: this.options[index].started,\\n  //       index,\\n  //       step,\\n  //       element,\\n  //     });\\n  // }\\n  // public onPrevEnd(index: number): true {\\n  //   const callback = this.callbacks[index] as Callback;\\n  //   const step = Math.ceil(\\n  //     ((this.options[index].endPosition - this.scrollBottomPosition) /\\n  //       this.windowSize) *\\n  //       100\\n  //   );\\n  //   const element = this.elements[index];\\n  //     callback &&\\n  //     callback({\\n  //       status: this.options[index].end,\\n  //       index,\\n  //       step,\\n  //       element,\\n  //     });\\n  // }\\n  // public onPrevEnded(index: number): true {\\n  //   const callback = this.callbacks[index] as Callback;\\n  //   const step = Math.ceil(\\n  //     ((this.options[index].endPosition - this.scrollTopPosition) /\\n  //       this.windowSize) *\\n  //       100\\n  //   );\\n  //   const element = this.elements[index];\\n  //     callback &&\\n  //     callback({\\n  //       status: this.options[index].ended,\\n  //       index,\\n  //       step,\\n  //       element,\\n  //     });\\n  // }\\n  // private getLevel(y: number) {\\n  //   return Math.ceil(((this.startPosition - y) * 100) / this.windowSize);\\n  // }\\n  // public onNextStart({ x, y, i }: { x: HTMLElement; y: number; i: number }) {\\n  //   const fn = this.callbacks[i];\\n  //   const step = this.getLevel(y);\\n  //   x.classList.add(this.options[i].start);\\n  // }\\n  // public onPrevEnd({ x, y, i }: { x: HTMLElement; y: number; i: number }) {\\n  //   const fn = this.callbacks[i];\\n  //   const step = this.getLevel(y);\\n  //   x.classList.remove(this.options[i].started);\\n  // }\\n\\n}\\n\\n//# sourceURL=webpack://ui-scroll/./src/ux-scroll-callback.ts?\");\n\n/***/ }),\n\n/***/ \"./src/ux-scroll-transition.ts\":\n/*!*************************************!*\\\n  !*** ./src/ux-scroll-transition.ts ***!\n  \\*************************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\neval(\"__webpack_require__.r(__webpack_exports__);\\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\\n/* harmony export */   \\\"default\\\": () => (/* binding */ UxScrollTransition)\\n/* harmony export */ });\\n/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ \\\"./src/scroll.ts\\\");\\n\\nclass UxScrollTransition extends _scroll__WEBPACK_IMPORTED_MODULE_0__[\\\"default\\\"] {\\n  constructor(props) {\\n    super({ ...props,\\n      commonOptions: {\\n        starting: \\\"ux__transition--animated\\\",\\n        ending: \\\"ux__transition--animated\\\",\\n        endMargin: \\\"-1\\\",\\n        ...props.commonOptions\\n      }\\n    });\\n  }\\n\\n  onNextStarting(index) {\\n    this.elements[index].classList.add(this.options[index].starting);\\n    return true;\\n  }\\n\\n  onPrevEnding(index) {\\n    this.elements[index].classList.remove(this.options[index].starting);\\n    return true;\\n  }\\n\\n}\\n\\n//# sourceURL=webpack://ui-scroll/./src/ux-scroll-transition.ts?\");\n\n/***/ }),\n\n/***/ \"./styles.scss\":\n/*!*********************!*\\\n  !*** ./styles.scss ***!\n  \\*********************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\neval(\"__webpack_require__.r(__webpack_exports__);\\n// extracted by mini-css-extract-plugin\\n\\n\\n//# sourceURL=webpack://ui-scroll/./styles.scss?\");\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __nested_webpack_require_18714__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_18714__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t(() => {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__nested_webpack_require_18714__.d = (exports, definition) => {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__nested_webpack_require_18714__.o(definition, key) && !__nested_webpack_require_18714__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t(() => {\n/******/ \t\t__nested_webpack_require_18714__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/make namespace object */\n/******/ \t(() => {\n/******/ \t\t// define __esModule on exports\n/******/ \t\t__nested_webpack_require_18714__.r = (exports) => {\n/******/ \t\t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t\t}\n/******/ \t\t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/************************************************************************/\n/******/ \t\n/******/ \t// startup\n/******/ \t// Load entry module and return exports\n/******/ \t// This entry module can't be inlined because the eval devtool is used.\n/******/ \tvar __webpack_exports__ = __nested_webpack_require_18714__(\"./index.ts\");\n/******/ \t\n/******/ \treturn __webpack_exports__;\n/******/ })()\n;\n});\n\n//# sourceURL=webpack://ui-scroll/./dist/index.js?");

/***/ }),

/***/ "./demo.ts":
/*!*****************!*\
  !*** ./demo.ts ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ \"./dist/index.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(___WEBPACK_IMPORTED_MODULE_0__);\n\nconst c = new ___WEBPACK_IMPORTED_MODULE_0__.UxScrollCallback({\n  selector: \".ux__counting\",\n  callbacks: {\n    0: ({\n      status,\n      index,\n      step,\n      element\n    }) => {\n      const children = element.children;\n      const numberElement = children[0].children;\n      const number = step * 3;\n      const c1 = Math.floor(number % 10).toString();\n      const c2 = Math.floor(number / 10 % 10).toString();\n      const c3 = Math.floor(number / 100 % 10).toString();\n      const c4 = Math.floor(number / 1000 % 10).toString();\n      numberElement[0].setAttribute(\"data-value\", c4);\n      numberElement[1].setAttribute(\"data-value\", c3);\n      numberElement[2].setAttribute(\"data-value\", c2);\n      numberElement[3].setAttribute(\"data-value\", c1);\n    }\n  }\n});\nconst b = new ___WEBPACK_IMPORTED_MODULE_0__.UxScrollCallback({\n  selector: \".ux__sticky\",\n  callbacks: {\n    0: ({\n      status,\n      index,\n      step,\n      element\n    }) => {\n      element.setAttribute(status, step.toString());\n    },\n    1: ({\n      status,\n      index,\n      step,\n      element\n    }) => {\n      element.setAttribute(status, step.toString());\n    },\n    2: ({\n      status,\n      index,\n      step,\n      element\n    }) => {\n      element.setAttribute(status, step.toString());\n    },\n    3: ({\n      status,\n      index,\n      step,\n      element\n    }) => {\n      element.setAttribute(status, step.toString());\n    },\n    4: ({\n      status,\n      index,\n      step,\n      element\n    }) => {\n      element.setAttribute(status, step.toString());\n    },\n    5: ({\n      status,\n      index,\n      step,\n      element\n    }) => {\n      element.setAttribute(status, step.toString());\n    }\n  }\n});\nconst a = new ___WEBPACK_IMPORTED_MODULE_0__.UxScrollTransition({\n  selector: \".ux__transition\"\n});\n\nwindow.onscroll = () => {\n  a.onScroll();\n  b.onScroll(); // c.onScroll();\n};\n\nwindow.onresize = () => {\n  a.onResize();\n  b.onResize(); // c.onResize();\n}; // console.log(a.elements, b.elements);\n\n//# sourceURL=webpack://ui-scroll/./demo.ts?");

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	var __webpack_exports__ = __webpack_require__("./demo.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});