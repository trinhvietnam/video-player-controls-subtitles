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

    private addInputCharacterKeyEvent(e) {
        e.keyup(function () {
            console.log('66666666666666');
            if ($(this).val().length > 0) {
                $(this).next().focus();
            }
        });

        console.log('555555555555555', e);
    }

    public startWriteTranscriptExercise() {
        var videolPlayer = this;
        var ePlayer = this.ePlayer;
        var eInputCharacter = $('.sample.character').clone().remove('.sample');
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
                                $(videolPlayer.subTitleSelector).find('.character').first().focus();
                                console.log($(videolPlayer.subTitleSelector).find('.character'));
                                videolPlayer.onEndSub(() => {
                                    var wtq = QuestionBuilder.getWriteTranscriptQuestion(subObj.text);
                                    var eLine = $('<label/>');
                                    for (var i = 0; i < wtq.wordsQuestion.length; i++) {
                                        var eInputWrapper;
                                        if (wtq.mapHiddenWordsWithNumOfChars[i]) {
                                            eInputWrapper = $('<label class="input-word"/>');
                                            for (var j = 0; j < wtq.mapHiddenWordsWithNumOfChars[i]; j++) {
                                                var e = eInputCharacter.clone();
                                                videolPlayer.addInputCharacterKeyEvent(e);
                                                eInputWrapper.append(e)
                                            }
                                        } else {
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
                                    $(videolPlayer.subTitleSelector).css('color',videolPlayer.subtitles[name].color).css('margin-top','10px').append(eLine);
                                    videolPlayer.subtitles[name].currentSubData = subObj;
                                });
                            } else {
                                var wtq = QuestionBuilder.getWriteTranscriptQuestion(subObj.text);
                                var eLine = $('<label/>');

                                for (var i = 0; i < wtq.wordsQuestion.length; i++) {
                                    var eInputWrapper;
                                    if (wtq.mapHiddenWordsWithNumOfChars[i]) {
                                        eInputWrapper = $('<label class="input-word"/>');
                                        for (var j = 0; j < wtq.mapHiddenWordsWithNumOfChars[i]; j++) {
                                            var e = eInputCharacter.clone();
                                            videolPlayer.addInputCharacterKeyEvent(e);
                                            eInputWrapper.append(e)
                                        }
                                    } else {
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
                                $(videolPlayer.subTitleSelector).css('color',videolPlayer.subtitles[name].color).css('margin-top','10px').append(eLine);
                                videolPlayer.subtitles[name].currentSubData = subObj;
                            }
                        }

                    } else {
                        if (currentSubData) {
                            $(videolPlayer.subTitleSelector).find('.character').first().focus();
                            console.log($(videolPlayer.subTitleSelector).find('.character'));
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