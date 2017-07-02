"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by NamTV on 6/6/2017.
 */
var $ = require("jquery");
var QuestionBuilder_1 = require("./QuestionBuilder");
var VideoPlayer = (function () {
    function VideoPlayer(selector, subTitleSelector) {
        this.subtitles = {};
        this.activedSubtitle = [];
        this.colors = ['yellow', 'white'];
        this.isPause = false;
        this.selector = selector;
        this.ePlayer = $(selector);
        this.subTitleSelector = subTitleSelector;
    }
    VideoPlayer.prototype.addSubtitle = function (name, url) {
        var _this = this;
        $.get(url, function (data) {
            _this.subtitles[name].data = parser.fromSrt(data, true);
            console.log(_this.subtitles);
        });
        this.subtitles[name] = {
            color: this.colors[Object.keys(this.subtitles).length],
            data: []
        };
    };
    VideoPlayer.prototype.setActiveSubtitle = function (activedSubtitle) {
        this.activedSubtitle = activedSubtitle;
    };
    VideoPlayer.prototype.onEndSub = function (callback) {
        var _this = this;
        this.ePlayer.trigger('pause');
        setTimeout(function () {
            _this.ePlayer.trigger('play');
            _this.isPause = false;
            callback();
        }, 5000);
    };
    VideoPlayer.prototype.onNextSub = function () {
    };
    VideoPlayer.prototype.addInputCharacterKeyEvent = function (e) {
        e.keyup(function (e) {
            console.log('66666666666666');
            if ($(this).val().length > 0) {
                $(this).next().focus();
            }
        });
        e.keydown(function (e) {
            console.log('66666666666666');
            if ($(this).val().length > 0) {
            }
            else {
                if (e.keyCode == 8) {
                    $(this).prev().focus();
                }
            }
        });
        console.log('555555555555555', e);
    };
    VideoPlayer.prototype.startWriteTranscriptExercise = function () {
        var videolPlayer = this;
        var ePlayer = this.ePlayer;
        var eInputCharacter = $('.sample.character').clone().remove('.sample');
        ePlayer.on('timeupdate', function (event) {
            if (videolPlayer.isPause)
                return;
            if (videolPlayer.activedSubtitle.length > 0) {
                var isRemoved = false;
                for (var _i = 0, _a = videolPlayer.activedSubtitle; _i < _a.length; _i++) {
                    var name = _a[_i];
                    var currentSubData = videolPlayer.subtitles[name].currentSubData;
                    var arraySubData = videolPlayer.subtitles[name].data;
                    var subObj = (videolPlayer.searchSubByTime(arraySubData, 0, arraySubData.length - 1, 1000 * this.currentTime));
                    // if (subObj) {
                    if (subObj) {
                        if (subObj != currentSubData) {
                            if (currentSubData) {
                                this.isPause = true;
                                $(videolPlayer.subTitleSelector).find('.character').first().focus();
                                console.log($(videolPlayer.subTitleSelector).find('.character'));
                                videolPlayer.onEndSub(function () {
                                    var wtq = QuestionBuilder_1.QuestionBuilder.getWriteTranscriptQuestion(subObj.text);
                                    var eLine = $('<label/>');
                                    for (var i = 0; i < wtq.wordsQuestion.length; i++) {
                                        var eInputWrapper;
                                        if (wtq.mapHiddenWordsWithNumOfChars[i]) {
                                            eInputWrapper = $('<label class="input-word"/>');
                                            for (var j = 0; j < wtq.mapHiddenWordsWithNumOfChars[i]; j++) {
                                                var e = eInputCharacter.clone();
                                                videolPlayer.addInputCharacterKeyEvent(e);
                                                eInputWrapper.append(e);
                                            }
                                        }
                                        else {
                                            eInputWrapper = $('<span class="word"/>');
                                            eInputWrapper.text(wtq.wordsQuestion[i]);
                                        }
                                        eLine.append(eInputWrapper);
                                    }
                                    // var p = $('<div>').html(subObj.text).css('color',videolPlayer.subtitles[name].color).css('margin-top','10px');
                                    if (!isRemoved) {
                                        isRemoved = true;
                                        $(videolPlayer.subTitleSelector).empty();
                                    }
                                    $(videolPlayer.subTitleSelector).css('color', videolPlayer.subtitles[name].color).css('margin-top', '10px').append(eLine);
                                    videolPlayer.subtitles[name].currentSubData = subObj;
                                });
                            }
                            else {
                                var wtq = QuestionBuilder_1.QuestionBuilder.getWriteTranscriptQuestion(subObj.text);
                                var eLine = $('<label/>');
                                for (var i = 0; i < wtq.wordsQuestion.length; i++) {
                                    var eInputWrapper;
                                    if (wtq.mapHiddenWordsWithNumOfChars[i]) {
                                        eInputWrapper = $('<label class="input-word"/>');
                                        for (var j = 0; j < wtq.mapHiddenWordsWithNumOfChars[i]; j++) {
                                            var e = eInputCharacter.clone();
                                            videolPlayer.addInputCharacterKeyEvent(e);
                                            eInputWrapper.append(e);
                                        }
                                    }
                                    else {
                                        eInputWrapper = $('<span class="word"/>');
                                        eInputWrapper.text(wtq.wordsQuestion[i]);
                                    }
                                    eLine.append(eInputWrapper);
                                }
                                // var p = $('<div>').html(subObj.text).css('color',videolPlayer.subtitles[name].color).css('margin-top','10px');
                                if (!isRemoved) {
                                    isRemoved = true;
                                    $(videolPlayer.subTitleSelector).empty();
                                }
                                $(videolPlayer.subTitleSelector).css('color', videolPlayer.subtitles[name].color).css('margin-top', '10px').append(eLine);
                                videolPlayer.subtitles[name].currentSubData = subObj;
                            }
                        }
                    }
                    else {
                        if (currentSubData) {
                            $(videolPlayer.subTitleSelector).find('.character').first().focus();
                            console.log($(videolPlayer.subTitleSelector).find('.character'));
                            videolPlayer.onEndSub(function () {
                                videolPlayer.subtitles[name].currentSubData = null;
                                if (!isRemoved) {
                                    $(videolPlayer.subTitleSelector).empty();
                                }
                            });
                        }
                    }
                }
            }
        });
        ePlayer.trigger('play');
        ePlayer[0].currentTime = 60;
    };
    VideoPlayer.prototype.startTrackingSub = function () {
        var videolPlayer = this;
        var ePlayer = this.ePlayer;
        ePlayer.on('timeupdate', function (event) {
            if (videolPlayer.activedSubtitle.length > 0) {
                var isRemoved = false;
                for (var _i = 0, _a = videolPlayer.activedSubtitle; _i < _a.length; _i++) {
                    var name = _a[_i];
                    var currentSubData = videolPlayer.subtitles[name].currentSubData;
                    var arraySubData = videolPlayer.subtitles[name].data;
                    var subObj = (videolPlayer.searchSubByTime(arraySubData, 0, arraySubData.length - 1, 1000 * this.currentTime));
                    if (subObj) {
                        if (subObj != currentSubData) {
                            var p = $('<div>').html(subObj.text).css('color', videolPlayer.subtitles[name].color).css('margin-top', '10px');
                            if (!isRemoved) {
                                isRemoved = true;
                                $(videolPlayer.subTitleSelector).empty();
                            }
                            $(videolPlayer.subTitleSelector).append(p);
                            videolPlayer.subtitles[name].currentSubData = subObj;
                        }
                    }
                    else {
                        if (!isRemoved) {
                            $(videolPlayer.subTitleSelector).empty();
                        }
                    }
                }
            }
        });
        ePlayer.on('pause', function (event) {
            console.log('pause');
        });
        ePlayer.on('playing', function (event) {
            console.log('playing');
        });
        ePlayer.on('waiting', function (event) {
            console.log('waiting');
        });
        ePlayer.trigger('play');
    };
    VideoPlayer.prototype.start = function () {
        // this.startTrackingSub();
        this.startWriteTranscriptExercise();
    };
    VideoPlayer.prototype.searchSubByTime = function (arraySub, startIndex, endIndex, timeValue) {
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
    return VideoPlayer;
}());
exports.VideoPlayer = VideoPlayer;
//# sourceMappingURL=VideoPlayer.js.map