/**
 * Created by NamTV on 6/6/2017.
 */
import * as $ from 'jquery';
import {WriteTranscriptQuestion, QuestionBuilder} from "./QuestionBuilder";
declare var parser: any;
export class VideoPlayer {
    selector: string;
    subTitleSelector: string;
    subtitles = {};
    activedSubtitle = [];
    ePlayer;
    colors = ['yellow', 'white'];
    isPause = false;

    constructor(selector, subTitleSelector) {
        this.selector = selector;
        this.ePlayer = $(selector);
        this.subTitleSelector = subTitleSelector;
    }

    public addSubtitle(name, url) {
        $.get(url, (data) => {
            this.subtitles[name].data = parser.fromSrt(data, true);
            console.log(this.subtitles);
        });
        this.subtitles[name] = {
            color: this.colors[Object.keys(this.subtitles).length],
            data: []
        };
    }

    public setActiveSubtitle(activedSubtitle) {
        this.activedSubtitle = activedSubtitle;
    }

    public onEndSub(callback) {
        this.ePlayer.trigger('pause');

        setTimeout(() => {
            this.ePlayer.trigger('play');
            this.isPause = false;
            callback();
        }, 5000);

    }

    public onNextSub() {

    }

    public startWriteTranscriptExercise() {
        var videolPlayer = this;
        var ePlayer = this.ePlayer;
        ePlayer.on('timeupdate', function (event) {
            if (videolPlayer.isPause) return;
            if (videolPlayer.activedSubtitle.length > 0) {
                var isRemoved = false;
                for (var name of videolPlayer.activedSubtitle) {
                    var currentSubData = videolPlayer.subtitles[name].currentSubData;
                    var arraySubData = videolPlayer.subtitles[name].data;
                    var subObj = (videolPlayer.searchSubByTime(arraySubData, 0, arraySubData.length - 1, 1000 * this.currentTime));
                    // if (subObj) {
                    if (subObj) {
                        if (subObj != currentSubData) {
                            if (currentSubData) {
                                this.isPause = true;
                                videolPlayer.onEndSub(() => {
                                    var wtq = QuestionBuilder.getWriteTranscriptQuestion(subObj.text);
                                    var dataShow = wtq.textQuestion.replace(QuestionBuilder.maskHiddenWord, '<input type="text"/>');
                                    var p = $('<div>').html(dataShow).css('color', videolPlayer.subtitles[name].color).css('margin-top', '10px');
                                    // var p = $('<div>').html(subObj.text).css('color',videolPlayer.subtitles[name].color).css('margin-top','10px');
                                    if (!isRemoved) {
                                        isRemoved = true;
                                        $(videolPlayer.subTitleSelector).empty();
                                    }
                                    $(videolPlayer.subTitleSelector).append(p);
                                    videolPlayer.subtitles[name].currentSubData = subObj;
                                });
                            } else {
                                var wtq = QuestionBuilder.getWriteTranscriptQuestion(subObj.text);
                                var dataShow = wtq.textQuestion.replace(QuestionBuilder.maskHiddenWord, '<input type="text"/>');
                                var p = $('<div>').html(dataShow).css('color', videolPlayer.subtitles[name].color).css('margin-top', '10px');
                                // var p = $('<div>').html(subObj.text).css('color',videolPlayer.subtitles[name].color).css('margin-top','10px');
                                if (!isRemoved) {
                                    isRemoved = true;
                                    $(videolPlayer.subTitleSelector).empty();
                                }
                                $(videolPlayer.subTitleSelector).append(p);
                                videolPlayer.subtitles[name].currentSubData = subObj;
                            }
                        }

                    } else {
                        if (currentSubData) {
                            videolPlayer.onEndSub(() => {
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
    }

    public startTrackingSub() {
        var videolPlayer = this;
        var ePlayer = this.ePlayer;
        ePlayer.on('timeupdate', function (event) {
            if (videolPlayer.activedSubtitle.length > 0) {
                var isRemoved = false;
                for (var name of videolPlayer.activedSubtitle) {
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
                    } else {
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
    }

    public start() {
        // this.startTrackingSub();
        this.startWriteTranscriptExercise();
    }

    private searchSubByTime(arraySub, startIndex, endIndex, timeValue) {
        if (startIndex == endIndex) {
            var subObj = arraySub[startIndex];
            if (subObj.endTime >= timeValue && subObj.startTime <= timeValue) {
                return subObj;
            } else {
                return null;
            }
        } else {
            var middle = Math.floor((startIndex + endIndex) / 2);
            var subObj = arraySub[middle];
            if (subObj.endTime < timeValue) {
                return this.searchSubByTime(arraySub, middle + 1, endIndex, timeValue);
            } else if (subObj.startTime > timeValue) {
                return this.searchSubByTime(arraySub, startIndex, middle, timeValue);
            } else return subObj;
        }

    }

}