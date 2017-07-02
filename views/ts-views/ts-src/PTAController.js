"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            _this.ptaPlayer.eWrapper.find('.slider-wrapper').css('margin-bottom', Math.floor(heightControlBar / 2) + 'px');
            _this.ptaPlayer.eContainerFloatLayer.css('visibility', 'visible');
        }, 1000);
    };
    PTAController.prototype.initControlBar = function () {
        var _this = this;
        var fixCss = "<style>\n              /*.irs-bar,.irs-bar-edge,.irs-slider,.irs-line{*/\n            /*height:5px;*/\n            /*top:30px;*/\n            /*background: red;*/\n            /*cursor: pointer;*/\n        /*}*/\n        /*.irs-slider.single{*/\n            /*background-color: #D32620 !important;*/\n            /*height: 15px;*/\n            /*width: 15px;*/\n            /*border-radius: 50%;*/\n            /*top: 25px;*/\n        /*}*/\n        /*.irs-single{*/\n            /*cursor: pointer;*/\n        /*}*/\n        /*.irs-min,.irs-max{*/\n            /*display: none;*/\n        /*}*/\n        /*.irs-line-right{*/\n            /*background: none;*/\n        /*}*/\n        /*.irs-line-mid, .irs-line-left, .irs-line-right, .irs-bar, .irs-bar-edge, .irs-slider{*/\n            /*!*background: #e8e8e8;*!*/\n            /*background: #fff;*/\n        /*}*/\n        /*.irs-bar, .irs-bar-edge, .irs-slider, .irs-line {*/\n            /*height: 2px;*/\n            /*top: 32px;*/\n            /*background: #D32620 !important;*/\n            /*cursor: pointer;*/\n        /*}*/\n        /*.irs-from, .irs-to, .irs-single{*/\n            /*background-color: gray;*/\n        /*}*/\n        /*.irs-from:after, .irs-to:after, .irs-single:after{*/\n            /*border-top-color: gray;*/\n        /*}*/\n        /*.irs-from, .irs-to, .irs-single{*/\n            /*top: 6px;*/\n            /*font-weight: bold;*/\n        /*}*/\n    </style>";
        var fixCssBarBottom = " <style>\n         video::-webkit-media-controls-enclosure {\n            display: none !important;\n        }\n        .controls >.irs{\n            cursor: pointer;\n            z-index: 1000;\n        }\n        .video-control-wrapper {\n            display: block;\n            background: transparent;\n        }\n        .db-control-left >div,.db-control-right >div {\n            display: inline-block;\n            height: 40px;\n            line-height: 40px;\n            font-size: 22px;\n            padding: 1px 6px;\n            color: white;\n        }\n        .db-control-left {\n            float: left;\n            width: 60%;\n            text-align: left;\n        }\n\n        .db-control-right {\n            float: right;\n            width: 40%;\n            text-align: right;\n        }\n\n        .db-control-right .right {\n            display: inline-block;\n        }\n\n        .db-control-right .slider-wrapper{\n            margin-top: -8%;\n        }\n        \n        .slider-wrapper {\n            display: inline-block;\n            min-width: 100px;\n            vertical-align: middle;\n            margin-top: -5%;\n        }\n\n        \n        .video-control-wrapper .play-pause .fa{\n            display: none;\n        }\n        .video-control-wrapper .play-pause.playing .fa-pause{\n            display: inline-block;\n        }\n        .video-control-wrapper .play-pause:not(.playing) .fa-play{\n            display: inline-block;\n        }\n        .video-control-wrapper #volume .fa{\n            display: none;\n        }\n        .video-control-wrapper #volume[range=\"big\"] .fa-volume-up{\n            display: inline-block;\n        }\n        .video-control-wrapper #volume[range=\"small\"] .fa-volume-down{\n            display: inline-block;\n        }\n        .video-control-wrapper #volume[range=\"off\"] .fa-volume-off{\n            display: inline-block;\n        }\n    </style>";
        var htmlController = "<div class=\"controls\" style=\";padding: 0px 0px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box\">\n                <input id=\"range_43\" style=\"display: none;\" tabindex=\"-1\" readonly=\"\">\n                 <div class=\"video-control-wrapper\">\n        <div class=\"db-control-left control-line\">\n            <div class=\"play-pause\">\n                <i class=\"fa fa-play\" aria-hidden=\"true\"></i>\n                <i class=\"fa fa-pause\" aria-hidden=\"true\"></i>\n            </div>\n            <div id=\"volume\" range=\"big\">\n                <i class=\"fa fa-volume-up\" aria-hidden=\"true\"></i>\n                <i class=\"fa fa-volume-down\" aria-hidden=\"true\"></i>\n                <i class=\"fa fa-volume-off\" aria-hidden=\"true\"></i>\n            </div>\n            <div class=\"slider-wrapper\">\n                <input id=\"volume-range\" style=\"display: none\" tabindex=\"-1\" readonly=\"\">\n            </div>\n\n            <div>\n                <i class=\"fa current-time\" aria-hidden=\"true\">00:00</i>\n                <i class=\"fa\" aria-hidden=\"true\">&nbsp;/&nbsp;</i>\n                <i class=\"fa video-duration\" aria-hidden=\"true\">00:00</i>\n            </div>\n        </div>\n        <div class=\"db-control-right control-line\">\n            <div class=\"helper right\">\n                <i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>\n            </div>\n            <div class=\"speed\">\n                <i class=\"fa fa-bolt\" aria-hidden=\"true\"></i>\n            </div>\n            <div class=\"slider-wrapper\">\n                <input id=\"speed-range\" style=\"display: none\" tabindex=\"-1\" readonly=\"\">\n            </div>\n            <div class=\"dropup right\">\n                <i class=\"fa\" id=\"dropdownMenu2\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\"\n                   style=\"\">HD</i>\n                <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu2\">\n                    <li><a href=\"#\">360p</a></li>\n                    <li><a href=\"#\">480p</a></li>\n                    <li><a href=\"#\">720p</a></li>\n                    <li><a href=\"#\">1080p</a></li>\n                </ul>\n            </div>\n            <div class=\"dropup right\">\n                <i class=\"fa fa-cc\" aria-hidden=\"true\" class=\"btn btn-default dropdown-toggle\" id=\"dropdownMenu2\"\n                   data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"></i>\n                <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu2\">\n                    <li><a href=\"#\">English</a></li>\n                    <li><a href=\"#\">Vietnamese</a></li>\n                </ul>\n            </div>\n            <div class=\"fullscreen right\">\n                <i class=\"fa fa-arrows-alt\" aria-hidden=\"true\"></i>\n            </div>\n\n        </div>\n        <div style=\"clear: both\"></div>\n    </div>\n            </div>";
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
        });
        $('.controls #volume-range').ionRangeSlider({
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
            }
        });
        $('.controls #speed-range').ionRangeSlider({
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
            },
            onUpdate: function (data) {
            }
        });
        var timeLastActive = 0;
        this.ptaPlayer.eWrapper.mousemove(function () {
            if (_this.ptaPlayer.eWrapper.is(':hover')) {
                timeLastActive = new Date().getTime();
            }
        });
        var updateByClick = false;
        $('body').on('click', '.controls >.irs', function (e) {
            var elm = $(this);
            var xPos = e.pageX - elm.offset().left;
            var max = $(this).width();
            var update = Math.floor(xPos * videoDuration / max);
            updateByClick = true;
            eTimeSlider.update({
                from: update,
            });
        });
        this.ptaPlayer.eVideo.on('play', function () {
            ePlayPause.addClass('playing');
        });
        this.ptaPlayer.eVideo.on('pause', function () {
            ePlayPause.removeClass('playing');
        });
        var ePlayPause = $('.controls .play-pause');
        var eVolume = $('.controls #volume');
        var eCurrentTime = $('.controls .current-time');
        var eVideoDuration = $('.controls .video-duration');
        var eFullScreen = $('.controls .fullscreen');
        ePlayPause.click(function () {
            if (ePlayPause.hasClass('playing')) {
                ptaPlayer.pauseVideo();
            }
            else {
                ptaPlayer.playVideo();
            }
        });
        eFullScreen.click(function () {
            // try{
            //     ptaPlayer.eVideo[0].webkitRequestFullScreen();
            // }catch (e){
            //
            // }
            // try{
            //     ptaPlayer.eVideo[0].mozRequestFullScreen();
            // }catch (e){
            //
            // }
            // try{
            //     ptaPlayer.eVideo[0].msRequestFullScreen();
            // }catch (e){
            //
            // }
            // try{
            //     ptaPlayer.eVideo[0].oRequestFullScreen();
            // }catch (e){
            //
            // }
            // try{
            //     ptaPlayer.eVideo[0].requestFullscreen();
            // }catch (e){
            //
            // }
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
        // setInterval(() => {
        //     var detalTime = new Date().getTime() - timeLastActive;
        //     if (detalTime < 5000 && this.ptaPlayer.eWrapper.is(':hover')) {
        //         this.eController.css('display', 'block');
        //     } else {
        //         this.eController.css('display', 'none');
        //     }
        //     if (!isDragTimeControl && eTimeSlider) {
        //         var time = ptaPlayer.eVideo[0].currentTime;
        //         eTimeSlider.update({
        //             from: time
        //         });
        //         eCurrentTime.text(ptaControlBar.formatTime(time));
        //     }
        // }, 1000);
    };
    return PTAController;
}());
exports.PTAController = PTAController;
//# sourceMappingURL=PTAController.js.map