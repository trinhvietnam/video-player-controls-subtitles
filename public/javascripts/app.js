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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_events_1 = __webpack_require__(4);
var PTAPlayer_1 = __webpack_require__(3);
var SinglePage = (function (_super) {
    __extends(SinglePage, _super);
    function SinglePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // facebookAPI = new FacebookAPI();
        // videoPlayer = new VideoPlayer('video','.subtitle');
        // public run() {
        //     this.facebookAPI.on('readyFacebook',()=>{
        //     })
        //     this.facebookAPI.init();
        //     this.videoPlayer.addSubtitle('English','/subs/subvi.srt');
        //     this.videoPlayer.setActiveSubtitle('English');
        //     this.videoPlayer.startTrackingSub();
        // }
        _this.ptaPlayer = new PTAPlayer_1.PTAPlayer();
        return _this;
    }
    SinglePage.prototype.run = function () {
    };
    return SinglePage;
}(typescript_events_1.Event));
exports.SinglePage = SinglePage;
new SinglePage().run();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IonSliderCustomize = (function () {
    function IonSliderCustomize() {
    }
    IonSliderCustomize.prototype.customize = function (parent, backgroundColor, slideColor, height, dCircle, dataSlider, maxValue, from) {
        var _parent = parent;
        var _bg_bg = backgroundColor;
        var _bg_fill = slideColor;
        var _height_1 = height + 'px';
        var _height_2 = dCircle + 'px';
        var _width_1 = _height_2;
        var _top_1 = (40 - dCircle) / 2 + 'px';
        var _top_2 = (40 - height) / 2 + 'px';
        var _top_3 = -((40 - dCircle) / 2) + 'px';
        var _font_size_1 = 12 + (height / 10) + 'px';
        var style = "_parent .irs{\n                        background:transparent;\n                        cursor: pointer;\n                    }\n                    _parent .irs-bar-edge,_parent  .irs-bar,_parent  .irs-line,_parent  .irs-line .irs-line-left,_parent  .irs-line .irs-line-mid,_parent  .irs-line .irs-line-right{\n                        height: _height_1\n                    }\n                    _parent .irs-bar{\n                        background:_bg_fill\n                    }\n                    _parent .irs-line-left,_parent .irs .irs-line-mid,_parent .irs .irs-line-right{\n                        background:_bg_bg\n                    }\n                    _parent .irs-slider.single{\n                        height: _height_2;\n                        width: _width_1;\n                        background:_bg_fill;\n                        border-radius:50%;\n                        top:_top_1;\n                    }\n                    _parent .irs-bar-edge{\n                        background:_bg_fill\n                    }\n                    _parent .irs-bar,_parent .irs-line,_parent .irs-bar-edge{\n                        top:_top_2\n                    }\n                    _parent .irs-min,_parent .irs-max{\n                        display: none\n                    }\n                    _parent .irs-single{\n                        top: _top_3;\n                        font-size:_font_size_1;\n                    }";
        var result = style.replace(/_bg_bg/g, _bg_bg)
            .replace(/_bg_fill/g, _bg_fill)
            .replace(/_height_1/g, _height_1)
            .replace(/_height_2/g, _height_2)
            .replace(/_width_1/g, _width_1)
            .replace(/_top_1/g, _top_1)
            .replace(/_top_2/g, _top_2)
            .replace(/_top_3/g, _top_3)
            .replace(/_font_size_1/g, _font_size_1)
            .replace(/_parent/g, _parent);
        console.log(result);
        $('head').append($('<style>' + result + '</style>'));
        $(parent).on('click', ' >.irs', function (e) {
            var elm = $(this);
            var xPos = e.pageX - elm.offset().left;
            var max = $(this).width();
            var update = Math.round(xPos * maxValue / max);
            dataSlider.update({
                from: update,
            });
        });
        dataSlider.update({
            from: from
        });
    };
    return IonSliderCustomize;
}());
exports.IonSliderCustomize = IonSliderCustomize;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IonSliderCustomize_1 = __webpack_require__(1);
var ionSliderCustomize = new IonSliderCustomize_1.IonSliderCustomize();
var PTAController = (function () {
    function PTAController(ptaPlayer) {
        this.ptaPlayer = ptaPlayer;
        if (this.ptaPlayer.isStaticSub) {
            this.controlStaticSubtitles();
        }
    }
    PTAController.prototype.formatTime = function (num) {
        var sec_num = parseInt(num, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (hours == '00') {
            return minutes + ':' + seconds;
        }
        else {
            return hours + ':' + minutes + ':' + seconds;
        }
    };
    PTAController.prototype.getStaticSubtitles = function () {
        var results = [];
        this.ptaPlayer.eVideo.find('[kind="subtitles"]').each(function () {
            var t = {
                src: $(this).attr('src'),
                srclang: $(this).attr('srclang'),
                enable: $(this).attr('enable') == "true",
                label: $(this).attr('label'),
                color: $(this).attr('color'),
            };
            if (t.src && t.label) {
                results.push(t);
            }
        });
        return results;
    };
    PTAController.prototype.initElementSubtitles = function () {
        var _this = this;
        var labels = Object.keys(this.ptaPlayer.subtitles);
        labels.forEach(function (label) {
            _this.ptaPlayer.eContainerFloatLayer.find('.subtitle [label="' + label + '"]').remove();
            var e = $('<div class="subtitle" label="' + label + '"></div>');
            _this.ptaPlayer.eContainerFloatLayer.prepend(e);
        });
    };
    PTAController.prototype.createSubHtml = function (subtitle, html) {
        /**/
        // this.ptaPlayer.eContainerFloatLayer.css('bottom', this.ptaPlayer.eVideo.width() / 40);
        var e = $('<span></span>');
        e.html(html);
        e.attr('style', subtitle.style);
        e.css('font-size', this.ptaPlayer.eVideo.width() / 40);
        e.css('color', 'white');
        e.css('background', 'rgba(0, 0, 0, 0.5)');
        e.css('margin-top', '5px');
        e.css('padding', '6px');
        e.css('display', 'inline-block');
        if (subtitle.color) {
            e.css('color', subtitle.color);
        }
        return e;
    };
    PTAController.prototype.startTrackSubtitles = function () {
        var eVideo = this.ptaPlayer.eVideo;
        var ptaPlayer = this.ptaPlayer;
        var ptaController = this;
        eVideo.on('timeupdate', function (event) {
            var _this = this;
            var labels = Object.keys(ptaPlayer.subtitles);
            labels.forEach(function (label) {
                var subtitle = ptaPlayer.subtitles[label];
                var isRemoved = false;
                if (subtitle.enable) {
                    var arraySubData = subtitle.data;
                    var currentSubData = subtitle.currentSubData;
                    var subObj = (ptaController.searchSubByTime(arraySubData, 0, arraySubData.length - 1, 1000 * _this.currentTime));
                    var eSubtitle = ptaPlayer.eContainerFloatLayer.find('.subtitle[label="' + label + '"]');
                    if (subObj) {
                        if (subObj != currentSubData) {
                            var e = ptaController.createSubHtml(subtitle, subObj.text);
                            eSubtitle.empty();
                            eSubtitle.append(e);
                            subtitle.currentSubData = subObj;
                            eSubtitle.css('visibility', 'visible');
                        }
                    }
                    else {
                        if (!isRemoved) {
                            eSubtitle.empty();
                            eSubtitle.css('visibility', 'hidden');
                        }
                    }
                }
            });
        });
    };
    PTAController.prototype.controlStaticSubtitles = function () {
        var subtitles = this.getStaticSubtitles();
        var ptaPlayer = this.ptaPlayer;
        var ptaController = this;
        var counter = subtitles.length;
        function initSubtitleData(subtitle) {
            $.get(subtitle.src, function (data, status) {
                if (data) {
                    subtitle.data = parser.fromSrt(data, true);
                    ptaPlayer.subtitles[subtitle.label] = subtitle;
                }
                else {
                    console.log('Load sub error ', status);
                }
                counter--;
                if (counter == 0) {
                    ptaController.initElementSubtitles();
                    ptaController.startTrackSubtitles();
                }
            });
        }
        subtitles.forEach(function (subtitle) {
            initSubtitleData(subtitle);
        });
    };
    PTAController.prototype.searchSubByTime = function (arraySub, startIndex, endIndex, timeValue) {
        if (startIndex == endIndex) {
            var subObj = arraySub[startIndex];
            if (subObj.endTime >= timeValue && subObj.startTime <= timeValue) {
                return subObj;
            }
            else {
                return null;
            }
        }
        else {
            var middle = Math.floor((startIndex + endIndex) / 2);
            var subObj = arraySub[middle];
            if (subObj.endTime < timeValue) {
                return this.searchSubByTime(arraySub, middle + 1, endIndex, timeValue);
            }
            else if (subObj.startTime > timeValue) {
                return this.searchSubByTime(arraySub, startIndex, middle, timeValue);
            }
            else
                return subObj;
        }
    };
    PTAController.prototype.initSizeElement = function () {
        var _this = this;
        this.ptaPlayer.eContainerFloatLayer.css('visibility', 'hidden');
        setTimeout(function () {
            _this.ptaPlayer.eWrapper.show();
            var heightControlBar = Math.floor(_this.ptaPlayer.eVideo.height() / 12);
            if (heightControlBar < 40) {
                heightControlBar = 40;
            }
            _this.ptaPlayer.eWrapper.find('.control-line >div')
                .each(function () {
                $(this).css('height', heightControlBar);
                $(this).css('line-height', heightControlBar + 'px');
                $(this).css('font-size', Math.floor(heightControlBar / 40 * 22) + 'px');
                $(this).css('margin-left', Math.floor(heightControlBar / 10) + 'px');
            });
            var heightVolumeSpeedSlider = _this.ptaPlayer.eWrapper.find('.video-control-wrapper .slider-wrapper .irs').first().height();
            _this.ptaPlayer.eWrapper.find('.video-control-wrapper .slider-wrapper').css('padding-top', (heightControlBar - heightVolumeSpeedSlider) / 2 + 'px');
            _this.ptaPlayer.eContainerFloatLayer.css('visibility', 'visible');
        }, 1000);
    };
    PTAController.prototype.initControlBar = function () {
        var _this = this;
        var fixCss = "<style>\n              /*.irs-bar,.irs-bar-edge,.irs-slider,.irs-line{*/\n            /*height:5px;*/\n            /*top:30px;*/\n            /*background: red;*/\n            /*cursor: pointer;*/\n        /*}*/\n        /*.irs-slider.single{*/\n            /*background-color: #D32620 !important;*/\n            /*height: 15px;*/\n            /*width: 15px;*/\n            /*border-radius: 50%;*/\n            /*top: 25px;*/\n        /*}*/\n        /*.irs-single{*/\n            /*cursor: pointer;*/\n        /*}*/\n        /*.irs-min,.irs-max{*/\n            /*display: none;*/\n        /*}*/\n        /*.irs-line-right{*/\n            /*background: none;*/\n        /*}*/\n        /*.irs-line-mid, .irs-line-left, .irs-line-right, .irs-bar, .irs-bar-edge, .irs-slider{*/\n            /*!*background: #e8e8e8;*!*/\n            /*background: #fff;*/\n        /*}*/\n        /*.irs-bar, .irs-bar-edge, .irs-slider, .irs-line {*/\n            /*height: 2px;*/\n            /*top: 32px;*/\n            /*background: #D32620 !important;*/\n            /*cursor: pointer;*/\n        /*}*/\n        /*.irs-from, .irs-to, .irs-single{*/\n            /*background-color: gray;*/\n        /*}*/\n        /*.irs-from:after, .irs-to:after, .irs-single:after{*/\n            /*border-top-color: gray;*/\n        /*}*/\n        /*.irs-from, .irs-to, .irs-single{*/\n            /*top: 6px;*/\n            /*font-weight: bold;*/\n        /*}*/\n    </style>";
        var fixCssBarBottom = " <style>\n         video::-webkit-media-controls-enclosure {\n            display: none !important;\n        }\n        .controls >.irs{\n            cursor: pointer;\n            z-index: 1000;\n        }\n        .video-control-wrapper {\n            display: block;\n            background: transparent;\n        }\n        .db-control-left >div{\n            float: left;\n        }\n        .db-control-right >div {\n            float: right;\n        }\n        .db-control-left >div,.db-control-right >div {\n            display: inline-block;\n            height: 40px;\n            line-height: 40px;\n            font-size: 22px;\n            padding: 1px 6px;\n            color: white;\n        }\n        .db-control-left {\n            float: left;\n            width: 60%;\n            text-align: left;\n        }\n\n        .db-control-right {\n            float: right;\n            width: 40%;\n            text-align: right;\n        }\n\n        .db-control-right .right {\n            display: inline-block;\n        }\n        .slider-wrapper {\n            display: inline-block;\n            min-width: 100px;\n            vertical-align: middle;\n        }\n\n        \n        .video-control-wrapper .play-pause .fa{\n            display: none;\n        }\n        .video-control-wrapper .play-pause.playing .fa-pause{\n            display: inline-block;\n        }\n        .video-control-wrapper .play-pause:not(.playing) .fa-play{\n            display: inline-block;\n        }\n        .video-control-wrapper #volume .fa{\n            display: none;\n        }\n        .video-control-wrapper #volume[range=\"big\"] .fa-volume-up{\n            display: inline-block;\n        }\n        .video-control-wrapper #volume[range=\"small\"] .fa-volume-down{\n            display: inline-block;\n        }\n        .video-control-wrapper #volume[range=\"off\"] .fa-volume-off{\n            display: inline-block;\n        }\n    </style>";
        var htmlController = "<div class=\"controls\" style=\";padding: 0px 0px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box\">\n                <input id=\"range_43\" style=\"display: none;\" tabindex=\"-1\" readonly=\"\">\n                 <div class=\"video-control-wrapper\">\n        <div class=\"db-control-left control-line\">\n            <div class=\"play-pause\">\n                <i class=\"fa fa-play\" aria-hidden=\"true\"></i>\n                <i class=\"fa fa-pause\" aria-hidden=\"true\"></i>\n            </div>\n            <div id=\"volume\" range=\"big\">\n                <i class=\"fa fa-volume-up\" aria-hidden=\"true\"></i>\n                <i class=\"fa fa-volume-down\" aria-hidden=\"true\"></i>\n                <i class=\"fa fa-volume-off\" aria-hidden=\"true\"></i>\n            </div>\n            <div class=\"slider-wrapper\" id=\"volume-range-wrapper\">\n                <input id=\"volume-range\" style=\"display: none\" tabindex=\"-1\" readonly=\"\">\n            </div>\n\n            <div>\n                <i class=\"fa current-time\" aria-hidden=\"true\">00:00</i>\n                <i class=\"fa\" aria-hidden=\"true\">&nbsp;/&nbsp;</i>\n                <i class=\"fa video-duration\" aria-hidden=\"true\">00:00</i>\n            </div>\n        </div>\n        <div class=\"db-control-right control-line\">\n            <div class=\"fullscreen right\">\n                <i class=\"fa fa-arrows-alt\" aria-hidden=\"true\"></i>\n            </div>\n              <div class=\"dropup right\">\n                <i class=\"fa fa-cc\" aria-hidden=\"true\" class=\"btn btn-default dropdown-toggle\" id=\"dropdownMenu2\"\n                   data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"></i>\n                <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu2\">\n                    <li><a href=\"#\">English</a></li>\n                    <li><a href=\"#\">Vietnamese</a></li>\n                </ul>\n            </div>\n              <div class=\"dropup right\">\n                <i class=\"fa\" id=\"dropdownMenu2\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\"\n                   style=\"\">HD</i>\n                <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu2\">\n                    <li><a href=\"#\">360p</a></li>\n                    <li><a href=\"#\">480p</a></li>\n                    <li><a href=\"#\">720p</a></li>\n                    <li><a href=\"#\">1080p</a></li>\n                </ul>\n            </div>\n          <div class=\"slider-wrapper\" id=\"speed-range-wrapper\">\n                <input id=\"speed-range\" style=\"display: none\" tabindex=\"-1\" readonly=\"\">\n            </div>\n          <div class=\"speed\">\n                <i class=\"fa fa-bolt\" aria-hidden=\"true\"></i>\n            </div>\n            \n            <div class=\"helper right\">\n                <i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>\n            </div>\n            \n\n        </div>\n        <div style=\"clear: both\"></div>\n    </div>\n            </div>";
        this.ptaPlayer.eWrapper.prepend($(fixCssBarBottom));
        this.ptaPlayer.eWrapper.prepend($(fixCss));
        // var e = $('<div class="controls" style=";padding: 0px 5px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box"></div>');
        // e.html('<input id="range_43" style="display: none" tabindex="-1" readonly="">');
        var e = $(htmlController);
        this.eController = e;
        this.ptaPlayer.eContainerFloatLayer.append(e);
        var ptaPlayer = this.ptaPlayer;
        var eVideo = this.ptaPlayer.eVideo;
        var ptaControlBar = this;
        var eTimeSlider;
        var isDragTimeControl = false;
        var videoDuration = 0;
        var ePlayPause = $('.controls .play-pause');
        var eVolume = $('.controls #volume');
        var eCurrentTime = $('.controls .current-time');
        var eVideoDuration = $('.controls .video-duration');
        var eFullScreen = $('.controls .fullscreen');
        this.ptaPlayer.eVideo.on('loadeddata', function () {
            videoDuration = Math.floor(eVideo[0].duration);
            eVideoDuration.text(ptaControlBar.formatTime(videoDuration));
            ptaControlBar.initSizeElement();
            eTimeSlider = e.find('#range_43').ionRangeSlider({
                hide_min_max: true,
                force_edges: true,
                min: 0,
                max: videoDuration,
                from: 0,
                prettify: ptaControlBar.formatTime,
                onFinish: function (data) {
                    ptaPlayer.updateVideoTime(data.from);
                    isDragTimeControl = false;
                    console.log('11111111111111111111111111111111111 ', data.from);
                },
                onChange: function (data) {
                    console.log('00000000000000000000000000000000000');
                    isDragTimeControl = true;
                },
                onUpdate: function (data) {
                    if (updateByClick) {
                        ptaPlayer.updateVideoTime(data.from);
                        updateByClick = false;
                    }
                }
            }).data("ionRangeSlider");
            ionSliderCustomize.customize('.controls', 'white', 'red', 2, 15, eTimeSlider, videoDuration, 0);
        });
        var eInputSliderVolumeRange = $('.controls #volume-range').ionRangeSlider({
            hide_min_max: true,
            hide_from_to: true,
            force_edges: true,
            min: 0,
            max: 100,
            from: 100,
            onFinish: function (data) {
                var volume = data.from / 100;
                ptaPlayer.updateVideoVolume(volume);
                if (volume <= 0.1) {
                    eVolume.attr('range', 'off');
                }
                else if (volume <= 0.4) {
                    eVolume.attr('range', 'small');
                }
                else {
                    eVolume.attr('range', 'big');
                }
            },
            onChange: function (data) {
                var volume = data.from / 100;
                if (volume <= 0.1) {
                    eVolume.attr('range', 'off');
                }
                else if (volume <= 0.4) {
                    eVolume.attr('range', 'small');
                }
                else {
                    eVolume.attr('range', 'big');
                }
            },
            onUpdate: function (data) {
                var volume = data.from / 100;
                ptaPlayer.updateVideoVolume(volume);
                if (volume <= 0.1) {
                    eVolume.attr('range', 'off');
                }
                else if (volume <= 0.4) {
                    eVolume.attr('range', 'small');
                }
                else {
                    eVolume.attr('range', 'big');
                }
            }
        });
        var t = eInputSliderVolumeRange;
        ionSliderCustomize.customize('#volume-range-wrapper', 'white', 'red', 2, 15, t.data("ionRangeSlider"), 100, 100);
        var eInputSliderSpeedRange = $('.controls #speed-range').ionRangeSlider({
            hide_min_max: true,
            hide_from_to: true,
            force_edges: true,
            min: 10,
            max: 100,
            from: 50,
            step: 10,
            onFinish: function (data) {
                var rate = 1 + (data.from - 50) / 50;
                ptaPlayer.updateVideoSpeed(rate);
            },
            onChange: function (data) {
                var rate = 1 + (data.from - 50) / 50;
                ptaPlayer.updateVideoSpeed(rate);
            },
            onUpdate: function (data) {
                var rate = 1 + (data.from - 50) / 50;
                ptaPlayer.updateVideoSpeed(rate);
            }
        });
        var t = eInputSliderSpeedRange;
        ionSliderCustomize.customize('#speed-range-wrapper', 'white', 'red', 2, 15, t.data("ionRangeSlider"), 100, 50);
        var timeLastActive = 0;
        this.ptaPlayer.eWrapper.mousemove(function () {
            if (_this.ptaPlayer.eWrapper.is(':hover')) {
                timeLastActive = new Date().getTime();
            }
        });
        var updateByClick = false;
        $('body .controls').on('click', ' >.irs', function (e) {
            var elm = $(this);
            var xPos = e.pageX - elm.offset().left;
            var max = $(this).width();
            var update = Math.floor(xPos * videoDuration / max);
            updateByClick = true;
            ptaPlayer.updateVideoTime(update);
        });
        this.ptaPlayer.eVideo.on('play', function () {
            ePlayPause.addClass('playing');
        });
        this.ptaPlayer.eVideo.on('pause', function () {
            ePlayPause.removeClass('playing');
        });
        ePlayPause.click(function () {
            if (ePlayPause.hasClass('playing')) {
                ptaPlayer.pauseVideo();
            }
            else {
                ptaPlayer.playVideo();
            }
        });
        eFullScreen.click(function () {
            var divObj = ptaPlayer.eVideo[0]; //  get the target element
            if (divObj.requestFullscreen)
                if (document.fullScreenElement) {
                    document.exitFullscreen();
                }
                else {
                    divObj.requestFullscreen();
                }
            else if (divObj.msRequestFullscreen)
                if (document.msFullscreenElement) {
                    document.msExitFullscreen();
                }
                else {
                    divObj.msRequestFullscreen();
                }
            else if (divObj.mozRequestFullScreen)
                if (ptaPlayer.eWrapper[0].mozFullScreenElement) {
                    ptaPlayer.eWrapper[0].mozCancelFullScreen();
                }
                else {
                    ptaPlayer.eWrapper[0].mozRequestFullScreen();
                }
            else if (divObj.webkitRequestFullscreen)
                if (document.webkitFullscreenElement) {
                    document.webkitCancelFullScreen();
                }
                else {
                    divObj.webkitRequestFullscreen();
                }
            //  stop bubbling so we don't get bounce back
            ptaControlBar.initSizeElement();
        });
        function doCheckUpdateSliderTime() {
            console.log('vao 1 ', updateByClick);
            if (updateByClick)
                return;
            console.log('vao 2');
            var detalTime = new Date().getTime() - timeLastActive;
            if (detalTime < 5000 && ptaControlBar.ptaPlayer.eWrapper.is(':hover')) {
                ptaControlBar.eController.css('display', 'block');
            }
            else {
                ptaControlBar.eController.css('display', 'none');
            }
            if (!isDragTimeControl && eTimeSlider) {
                var time = ptaPlayer.eVideo[0].currentTime;
                eTimeSlider.update({
                    from: time
                });
                eCurrentTime.text(ptaControlBar.formatTime(time));
            }
            loopUpdateTime();
        }
        function loopUpdateTime() {
            setTimeout((function () {
                doCheckUpdateSliderTime();
            }), 1000);
        }
        loopUpdateTime();
    };
    return PTAController;
}());
exports.PTAController = PTAController;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PTAController_1 = __webpack_require__(2);
var PTAPlayer = (function () {
    function PTAPlayer(options) {
        if (options === void 0) { options = { autoStart: true, enableControlBar: true }; }
        this.autoStart = false;
        this.enableControlBar = false;
        this.isStaticSub = true;
        this.subtitles = {};
        this.eWrapper = $('.ptaPlayer').css('position', 'relative').css('font-size', '0px');
        this.eVideo = this.eWrapper.find('video').first();
        this.autoStart = this.autoStart || options[PTAPlayer.FIELDS.autoStart];
        this.enableControlBar = options[PTAPlayer.FIELDS.enableControlBar];
        if (options[PTAPlayer.FIELDS.isStaticSub] == false) {
            this.isStaticSub = false;
        }
        $.each(this.eVideo, function () {
            this.controls = false;
        });
        this.initContainerFloatLayer();
        if (this.enableControlBar) {
            this.ptaControlBar = new PTAController_1.PTAController(this);
            this.ptaControlBar.initControlBar();
        }
        if (this.autoStart) {
            this.eVideo.trigger('play');
        }
        else {
            this.eVideo.trigger('pause');
        }
    }
    PTAPlayer.prototype.initContainerFloatLayer = function () {
        var e = $('<div class="container-float-layer" style="visibility: hidden"></div>');
        e.css('position', 'absolute');
        e.css('width', '100%');
        e.css('text-align', 'center');
        e.css('bottom', 0);
        e.css('z-index', 9100032000006);
        this.eContainerFloatLayer = e;
        this.eWrapper.append(e);
    };
    PTAPlayer.prototype.updateVideoTime = function (time) {
        this.eVideo[0].currentTime = time;
    };
    PTAPlayer.prototype.updateVideoVolume = function (volume) {
        this.eVideo[0].volume = volume;
    };
    PTAPlayer.prototype.updateVideoSpeed = function (playbackRate) {
        this.eVideo[0].playbackRate = playbackRate;
    };
    PTAPlayer.prototype.playVideo = function () {
        this.eVideo[0].play();
    };
    PTAPlayer.prototype.pauseVideo = function () {
        this.eVideo[0].pause();
    };
    return PTAPlayer;
}());
PTAPlayer.FIELDS = {
    videoSelector: 'videoSelector',
    autoStart: 'autoStart',
    isStaticSub: 'isStaticSub',
    enableControlBar: 'enableControlBar'
};
exports.PTAPlayer = PTAPlayer;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Event = (function () {
    function Event() {
        this._listeners = [];
        this._maxListeners = null;
    }
    Event.prototype.addListener = function (event, listener) {
        return this.on(event, listener);
    };
    Event.prototype.emit = function (event) {
        var a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a[_i - 1] = arguments[_i];
        }
        var listeners = this._listeners.filter(function (item) { return item.event === event; });
        /* istanbul ignore next */
        listeners.forEach(function (item) { return item.listener.apply({}, a || []); });
        this._listeners = listeners.filter(function (item) { return !item.once; });
        return listeners.length !== 0 ? true : false;
    };
    Event.prototype.getMaxListeners = function () {
        return this._maxListeners === null ? Event.defaultMaxListeners : this._maxListeners;
    };
    Event.prototype.listenerCount = function (event) {
        return this._listeners.filter(function (item) { return item.event === event; })
            .length;
    };
    Event.prototype.listeners = function (event) {
        return this._filterMatchingEvents(event)
            .map(function (item) { return item.listener; })
            .reverse();
    };
    Event.prototype.on = function (event, listener) {
        this._register(event, listener, false);
        return this;
    };
    Event.prototype.once = function (event, listener) {
        this._register(event, listener, true);
        return this;
    };
    Event.prototype.removeAllListeners = function (event) {
        this._listeners = this._filterNonMatchingEvents(event);
        return this;
    };
    Event.prototype.removeListener = function (event, listener) {
        this._listeners = this._listeners.filter(function (item) {
            return !((item.event === event) && (item.listener === listener));
        });
        return this;
    };
    Event.prototype.setMaxListeners = function (thresshold) {
        this._maxListeners = thresshold;
        return this;
    };
    Event.prototype._filterMatchingEvents = function (event) {
        return this._listeners.filter(function (item) { return item.event === event; });
    };
    Event.prototype._filterNonMatchingEvents = function (event) {
        return this._listeners.filter(function (item) { return item.event !== event; });
    };
    Event.prototype._register = function (event, listener, once) {
        !this._checkListenerLimitReached(event) && this._listeners.unshift({ event: event, listener: listener, once: once });
        return;
    };
    Event.prototype._returnListenerLimit = function () {
        return this._maxListeners === null ? Event.defaultMaxListeners : this._maxListeners;
    };
    Event.prototype._checkListenerLimitReached = function (event) {
        var limitReached = this.listenerCount(event) === this._returnListenerLimit() ? true : false;
        limitReached && console.log("Listener Limit Reached");
        return limitReached;
    };
    Event.defaultMaxListeners = 10;
    return Event;
}());
exports.Event = Event;

//# sourceMappingURL=typescript.events.js.map


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map