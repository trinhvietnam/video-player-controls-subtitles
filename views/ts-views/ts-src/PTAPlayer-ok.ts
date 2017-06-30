/**
 * Created by NamTV on 6/30/2017.
 */
// import * as $ from 'jquery';
declare var $;
import {label} from "joi";
declare var parser: any;
export class PTAPlayer {
    private videoSelector;
    private autoStart = false;
    private isStaticSub = true;
    public eWrapper;
    public eContainerSubtitles;
    public eVideo;
    public static FIELDS = {
        videoSelector: 'videoSelector',
        autoStart: 'autoStart',
        isStaticSub: 'isStaticSub'
    }
    private subtitles = {};

    public getStaticSubtitles() {
        var results = [];
        this.eVideo.find('[kind="subtitles"]').each(function () {
            var t = {
                src: $(this).attr('src'),
                srclang: $(this).attr('srclang'),
                enable: $(this).attr('enable') == "true",
                label: $(this).attr('label'),
            }
            if (t.src && t.label) {
                results.push(t);
            }
        });
        return results;
    }

    private initContainerSubtitles() {
        var e = $('<div class="container-subtitles"></div>');
        e.css('position', 'absolute');
        e.css('width', '100%');
        e.css('text-align', 'center');
        e.css('bottom', this.eVideo.width() / 40);
        e.css('z-index', 9100032000006);
        this.eContainerSubtitles = e;
        this.eWrapper.append(e);
    }

    private initElementSubtitles() {
        var labels = Object.keys(this.subtitles);
        labels.forEach((label) => {
            this.eContainerSubtitles.find('.subtitle [label="' + label + '"]').remove();
            var e = $('<div class="subtitle" label="' + label + '"></div>');
            this.eContainerSubtitles.append(e);
        });
    }

    private initControlBar() {
        var fixCss = `<style>
              .irs-bar,.irs-bar-edge,.irs-slider,.irs-line{
            height:5px;
            top:30px;
            background: red;
            cursor: pointer;
        }
        .irs-slider.single{
            background: green !important;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            top: 25px;
        }
        .irs-single{
            cursor: pointer;
        }
        .irs-min,.irs-max{
            display: none;
        }
        .irs-line-right{
            background: none;
        }
        .irs-line-mid, .irs-line-left, .irs-line-right, .irs-bar, .irs-bar-edge, .irs-slider{
            background: #e8e8e8;
        }
        .irs-bar, .irs-bar-edge, .irs-slider, .irs-line {
            height: 5px;
            top: 30px;
            background: gray !important;
            cursor: pointer;
        }
        .irs-from, .irs-to, .irs-single{
            background-color: gray;
        }
        .irs-from:after, .irs-to:after, .irs-single:after{
            border-top-color: gray;
        }
        .irs-from, .irs-to, .irs-single{
            top: 6px;
            font-weight: bold;
        }
    </style>`;
        this.eWrapper.prepend($(fixCss));
        var e = $('<div class="controls" style="padding: 0px 5px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box"></div>');
        e.html('<input id="range_43" style="display: none" tabindex="-1" readonly="">');
        e.css('position', 'absolute');
        e.css('width', '100%');
        e.css('text-align', 'center');
        e.css('bottom', 0);
        e.css('z-index', 9100032000006);
        this.eWrapper.append(e);
        function prettify(num) {
            var sec_num = parseInt(num, 10); // don't forget the second param
            var hours: any = Math.floor(sec_num / 3600);
            var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds: any = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            return hours + ':' + minutes + ':' + seconds;
        }
        var ptaPlayer = this;
        var eVideo = this.eVideo;
        var eTimeSlider;
        var isDragTimeControl = false;
        this.eVideo.on('loadeddata', () => {
            eTimeSlider = e.find('#range_43').ionRangeSlider({
                min: 0,
                max: eVideo[0].duration,
                from: 0,
                prettify: prettify,
                onFinish: function (data) {
                    ptaPlayer.updateVideoTime(data.from);
                    isDragTimeControl = false;
                    console.log('11111111111111111111111111111111111');
                },
                onChange: function (data) {
                    console.log('00000000000000000000000000000000000');
                    isDragTimeControl = true;
                }
            }).data("ionRangeSlider");
        });
        setInterval(function () {
            if(!isDragTimeControl){
                var time = ptaPlayer.eVideo[0].currentTime;
                eTimeSlider.update({
                    from: time
                });
            }
        },1000);
    }
    private updateVideoTime(time){
        this.eVideo[0].currentTime = time;
    }

    private createSubHtml(subtitle, html) {
        /**/
        this.eContainerSubtitles.css('bottom', this.eVideo.width() / 40);

        var e = $('<span></span>');
        e.html(html);
        e.attr('style', subtitle.style);
        e.css('font-size', this.eVideo.width() / 40);
        e.css('color', 'white');
        e.css('background', 'rgba(0, 0, 0, 0.5)');
        e.css('margin-top', '5px');
        e.css('padding', '6px');
        e.css('display', 'inline-block');
        return e;
    }

    private startTrackSubtitles() {
        var eVideo = this.eVideo;
        var ptaPlayer = this;
        eVideo.on('timeupdate', function (event) {
            var labels = Object.keys(ptaPlayer.subtitles);
            labels.forEach((label) => {
                var subtitle = ptaPlayer.subtitles[label];
                var isRemoved = false;
                if (subtitle.enable) {
                    var arraySubData = subtitle.data;
                    var currentSubData = subtitle.currentSubData;
                    var subObj = (ptaPlayer.searchSubByTime(arraySubData, 0, arraySubData.length - 1, 1000 * this.currentTime));
                    var eSubtitle = ptaPlayer.eWrapper.find('.subtitle[label="' + label + '"]');
                    if (subObj) {
                        if (subObj != currentSubData) {
                            var e = ptaPlayer.createSubHtml(subtitle, subObj.text);
                            eSubtitle.empty();
                            eSubtitle.append(e);
                            subtitle.currentSubData = subObj;
                            eSubtitle.css('visibility', 'visible');
                        }
                    } else {
                        if (!isRemoved) {
                            eSubtitle.empty();
                            eSubtitle.css('visibility', 'hidden');
                        }
                    }
                }
            });
        });
    }

    private controlStaticSubtitles() {
        var subtitles = this.getStaticSubtitles();
        var ptaPlayer = this;
        var counter = subtitles.length;

        function initSubtitleData(subtitle) {
            $.get(subtitle.src, function (data, status) {
                if (data) {
                    subtitle.data = parser.fromSrt(data, true);
                    ptaPlayer.subtitles[subtitle.label] = subtitle;
                } else {
                    console.log('Load sub error ', status);
                }
                counter--;
                if (counter == 0) {
                    ptaPlayer.initElementSubtitles();
                    ptaPlayer.startTrackSubtitles();
                }
            });
        }

        subtitles.forEach((subtitle) => {
            initSubtitleData(subtitle);
        });

    }

    constructor(options: any = {autoStart: true}) {
        this.eWrapper = $('.ptaPlayer').css('position', 'relative');
        this.eVideo = this.eWrapper.find('video').first();
        this.autoStart = this.autoStart || options[PTAPlayer.FIELDS.autoStart];
        if (options[PTAPlayer.FIELDS.isStaticSub] == false) {
            this.isStaticSub = false;
        }
        if (this.autoStart) {
            this.eVideo.trigger('play');
        } else {
            this.eVideo.trigger('pause');
        }
        if (this.isStaticSub) {
            this.controlStaticSubtitles();
        }
        $.each(this.eVideo, function () {
            this.controls = false;
        });
        this.initContainerSubtitles();
        this.eVideo.on('loadeddata', function () {
            this.currentTime = 15;
            // setTimeout(()=>{
            //     this.pause();
            // },200);
        });
        this.initControlBar();
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