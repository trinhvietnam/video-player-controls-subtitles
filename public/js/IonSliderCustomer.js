/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IonSliderCustomer = (function () {
    function IonSliderCustomer() {
    }
    IonSliderCustomer.prototype.customize = function (backgroundColor, slideColor, height) {
        var _bg_bg = backgroundColor;
        var _bg_fill = slideColor;
        var _height_1 = height;
        var _height_2 = 3 * height + 'px';
        var _width_1 = _height_2 + 'px';
        var _top_1 = (40 - 3 * height) / 2 + 'px';
        var _top_2 = (40 - height) / 2 + 'px';
        var _top_3 = -height + 'px';
        var _font_size_1 = 10 + (height / 10) + 'px';
        var style = "_parent .irs{\n                        background:red\n                    }\n                    _parent .irs-bar-edge,__parent  .irs-bar,__parent  .irs-line,__parent  .irs-line .irs-line-left,__parent  .irs-line .irs-line-mid,__parent  .irs-line .irs-line-right{\n                        height: _height_1\n                    }\n                    _parent .irs-bar{\n                        background:_bg_bg\n                    }\n                    _parent .irs-line-left,_parent .irs .irs-line-mid,_parent .irs .irs-line-right{\n                        background:_bg_fill\n                    }\n                    _parent .irs-slider.single{\n                        height: _height_2 ,\n                        width: _width_1,\n                        background:_bg_fill,\n                        border-radius:50%,\n                        top:_top_1,\n                    }\n                    _parent .irs-bar-edge{\n                        background:_bg_bg\n                    }\n                    _parent .irs-bar,_parent .irs-line,_parent .irs-bar-edge{\n                        top:_top_2\n                    }\n                    _parent .irs-min,_parent .irs-max{\n                        display: none\n                    }\n                    _parent .irs-single{\n                        top: _top_3,\n                        font-size:_font_size_1\n                    }";
        var result = style.replace(/_bg_bg/g, _bg_bg)
            .replace(/_bg_fill/g, _bg_fill)
            .replace(/_height_1/g, _height_1)
            .replace(/_height_2/g, _height_2)
            .replace(/_width_1/g, _width_1)
            .replace(/_top_1/g, _top_1)
            .replace(/_top_2/g, _top_2)
            .replace(/_top_3/g, _top_3)
            .replace(/_font_size_1/g, _font_size_1);
        $('head').append('<head>' + result + '</head>');
    };
    return IonSliderCustomer;
}());
exports.IonSliderCustomer = IonSliderCustomer;
var ionSliderCustomer = new IonSliderCustomer();
//# sourceMappingURL=IonSliderCustomer.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=IonSliderCustomer.js.map