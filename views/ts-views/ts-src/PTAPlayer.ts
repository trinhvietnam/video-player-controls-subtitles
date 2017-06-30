import {PTAControlBar} from "./PTAControlBar";
/**
 * Created by NamTV on 6/30/2017.
 */
// import * as $ from 'jquery';
declare var $;
declare var parser: any;
export class PTAPlayer {
    private videoSelector;
    private autoStart = false;
    private enableControlBar = false;
    private isStaticSub = true;
    public eWrapper;
    public eContainerSubtitles;
    public eVideo;
    private ptaControlBar;
    public static FIELDS = {
        videoSelector: 'videoSelector',
        autoStart: 'autoStart',
        isStaticSub: 'isStaticSub',
        enableControlBar:'enableControlBar'
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
    public updateVideoTime(time){
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

    constructor(options: any = {autoStart: true,enableControlBar:true}) {
        this.eWrapper = $('.ptaPlayer').css('position', 'relative');
        this.eVideo = this.eWrapper.find('video').first();
        this.autoStart = this.autoStart || options[PTAPlayer.FIELDS.autoStart];
        if (options[PTAPlayer.FIELDS.isStaticSub] == false) {
            this.isStaticSub = false;
        }
        this.enableControlBar =  options[PTAPlayer.FIELDS.enableControlBar];
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
        if(this.enableControlBar){
            this.ptaControlBar = new PTAControlBar(this.eVideo,this.eWrapper,this);
            this.ptaControlBar.initControlBar();
        }

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