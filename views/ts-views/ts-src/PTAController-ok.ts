/**
 * Created by NamTV on 6/30/2017.
 */
declare var $;
declare var parser;
declare var document;
export class PTAController {
    private ptaPlayer;
    private eController;

    constructor(ptaPlayer) {
        this.ptaPlayer = ptaPlayer;

        if (this.ptaPlayer.isStaticSub) {
            this.controlStaticSubtitles();
        }

    }

    private formatTime(num) {
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
        if (hours == '00') {
            return minutes + ':' + seconds;
        } else {
            return hours + ':' + minutes + ':' + seconds;
        }

    }


    public getStaticSubtitles() {
        var results = [];
        this.ptaPlayer.eVideo.find('[kind="subtitles"]').each(function () {
            var t = {
                src: $(this).attr('src'),
                srclang: $(this).attr('srclang'),
                enable: $(this).attr('enable') == "true",
                label: $(this).attr('label'),
                color: $(this).attr('color'),
            }
            if (t.src && t.label) {
                results.push(t);
            }
        });
        return results;
    }

    private initElementSubtitles() {
        var labels = Object.keys(this.ptaPlayer.subtitles);
        labels.forEach((label) => {
            this.ptaPlayer.eContainerFloatLayer.find('.subtitle [label="' + label + '"]').remove();
            var e = $('<div class="subtitle" label="' + label + '"></div>');
            this.ptaPlayer.eContainerFloatLayer.prepend(e);
        });
    }

    private createSubHtml(subtitle, html) {
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
    }

    private startTrackSubtitles() {
        var eVideo = this.ptaPlayer.eVideo;
        var ptaPlayer = this.ptaPlayer;
        var ptaController = this;
        eVideo.on('timeupdate', function (event) {
            var labels = Object.keys(ptaPlayer.subtitles);
            labels.forEach((label) => {
                var subtitle = ptaPlayer.subtitles[label];
                var isRemoved = false;
                if (subtitle.enable) {
                    var arraySubData = subtitle.data;
                    var currentSubData = subtitle.currentSubData;
                    var subObj = (ptaController.searchSubByTime(arraySubData, 0, arraySubData.length - 1, 1000 * this.currentTime));
                    var eSubtitle = ptaPlayer.eContainerFloatLayer.find('.subtitle[label="' + label + '"]');
                    if (subObj) {
                        if (subObj != currentSubData) {
                            var e = ptaController.createSubHtml(subtitle, subObj.text);
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
        var ptaPlayer = this.ptaPlayer;
        var ptaController = this;
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
                    ptaController.initElementSubtitles();
                    ptaController.startTrackSubtitles();
                }
            });
        }

        subtitles.forEach((subtitle) => {
            initSubtitleData(subtitle);
        });

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

    private initSizeElement() {

    }

    public initControlBar() {
        var fixCss = `<style>
              .irs-bar,.irs-bar-edge,.irs-slider,.irs-line{
            height:5px;
            top:30px;
            background: red;
            cursor: pointer;
        }
        .irs-slider.single{
            background-color: #D32620 !important;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            top: 25px;
        }
        .irs-single{
            cursor: pointer;
        }
        /*.irs-min,.irs-max{*/
            /*display: none;*/
        /*}*/
        .irs-line-right{
            background: none;
        }
        .irs-line-mid, .irs-line-left, .irs-line-right, .irs-bar, .irs-bar-edge, .irs-slider{
            /*background: #e8e8e8;*/
            background: #fff;
        }
        .irs-bar, .irs-bar-edge, .irs-slider, .irs-line {
            height: 2px;
            top: 32px;
            background: #D32620 !important;
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
        var fixCssBarBottom = ` <style>
         video::-webkit-media-controls-enclosure {
            display: none !important;
        }
        .controls >.irs{
            cursor: pointer;
            z-index: 1000;
        }
        .video-control-wrapper {
            display: block;
            background: transparent;
        }

        .db-control-left {
            float: left;
            width: 60%;
            text-align: left;
        }

        .db-control-right {
            float: right;
            width: 40%;
            text-align: right;
        }

        .db-control-right .right {
            display: inline-block;
        }

        .db-control-right .slider-wrapper{
            margin-top: -8%;
        }
        
        .slider-wrapper {
            display: inline-block;
            min-width: 100px;
            vertical-align: middle;
            margin-top: -5%;
        }

        .video-control-wrapper button {
            border: none;
            background: transparent;
            font-size: 22px;
            vertical-align: middle;
            outline: none;
            height: 40px;
            color: white;
        }
        .video-control-wrapper .play-pause .fa{
            display: none;
        }
        .video-control-wrapper .play-pause.playing .fa-pause{
            display: inline-block;
        }
        .video-control-wrapper .play-pause:not(.playing) .fa-play{
            display: inline-block;
        }
        .video-control-wrapper #volume .fa{
            display: none;
        }
        .video-control-wrapper #volume[range="big"] .fa-volume-up{
            display: inline-block;
        }
        .video-control-wrapper #volume[range="small"] .fa-volume-down{
            display: inline-block;
        }
        .video-control-wrapper #volume[range="off"] .fa-volume-off{
            display: inline-block;
        }
    </style>`;
        var htmlController = `<div class="controls" style=";padding: 0px 0px;box-sizing: border-box;-webkit-box-sizing: border-box;-moz-box-sizing: border-box">
                <input id="range_43" style="display: none;" tabindex="-1" readonly="">
                 <div class="video-control-wrapper">
        <div class="db-control-left">
            <button class="play-pause">
                <i class="fa fa-play" aria-hidden="true"></i>
                <i class="fa fa-pause" aria-hidden="true"></i>
            </button>
            <button id="volume" range="big">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
                <i class="fa fa-volume-down" aria-hidden="true"></i>
                <i class="fa fa-volume-off" aria-hidden="true"></i>
            </button>
            <div class="slider-wrapper">
                <input id="volume-range" style="display: none" tabindex="-1" readonly="">
            </div>

            <button>
                <i class="fa current-time" aria-hidden="true">00:00</i>
                <i class="fa" aria-hidden="true">&nbsp;/&nbsp;</i>
                <i class="fa video-duration" aria-hidden="true">00:00</i>
            </button>
        </div>
        <div class="db-control-right">
            <button class="helper right">
                <i class="fa fa-info-circle" aria-hidden="true"></i>
            </button>
            <button class="speed">
                <i class="fa fa-bolt" aria-hidden="true"></i>
            </button>
            <div class="slider-wrapper">
                <input id="speed-range" style="display: none" tabindex="-1" readonly="">
            </div>
            <div class="dropup right">
                <i class="fa" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                   style="">HD</i>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li><a href="#">360p</a></li>
                    <li><a href="#">480p</a></li>
                    <li><a href="#">720p</a></li>
                    <li><a href="#">1080p</a></li>
                </ul>
            </div>
            <button class="dropup right">
                <i class="fa fa-cc" aria-hidden="true" class="btn btn-default dropdown-toggle" id="dropdownMenu2"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li><a href="#">English</a></li>
                    <li><a href="#">Vietnamese</a></li>
                </ul>
            </button>
            <button class="fullscreen right">
                <i class="fa fa-arrows-alt" aria-hidden="true"></i>
            </button>

        </div>
        <div style="clear: both"></div>
    </div>
            </div>`;
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
        this.ptaPlayer.eVideo.on('loadeddata', () => {
            videoDuration = Math.floor(eVideo[0].duration);
            eVideoDuration.text(ptaControlBar.formatTime(videoDuration));
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
                } else if (volume <= 0.4) {
                    eVolume.attr('range', 'small');
                } else {
                    eVolume.attr('range', 'big');
                }
            },
            onChange: function (data) {
                var volume = data.from / 100;
                if (volume <= 0.1) {
                    eVolume.attr('range', 'off');
                } else if (volume <= 0.4) {
                    eVolume.attr('range', 'small');
                } else {
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
        this.ptaPlayer.eWrapper.mousemove(() => {
            if (this.ptaPlayer.eWrapper.is(':hover')) {
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
        this.ptaPlayer.eVideo.on('play', () => {
            ePlayPause.addClass('playing');
        });
        this.ptaPlayer.eVideo.on('pause', () => {
            ePlayPause.removeClass('playing');
        });
        var ePlayPause = $('.controls .play-pause');
        var eVolume = $('.controls #volume');
        var eCurrentTime = $('.controls .current-time');
        var eVideoDuration = $('.controls .video-duration');
        var eFullScreen = $('.controls .fullscreen');
        ePlayPause.click(() => {
            if (ePlayPause.hasClass('playing')) {
                ptaPlayer.pauseVideo();
            } else {
                ptaPlayer.playVideo();
            }
        });
        eFullScreen.click(() => {
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

            var divObj = ptaPlayer.eVideo[0];  //  get the target element

            if (divObj.requestFullscreen)
                if (document.fullScreenElement) {
                    document.exitFullscreen();
                } else {
                    divObj.requestFullscreen();
                }
            else if (divObj.msRequestFullscreen)
                if (document.msFullscreenElement) {
                    document.msExitFullscreen();
                } else {
                    divObj.msRequestFullscreen();
                }
            else if (divObj.mozRequestFullScreen)
                if (ptaPlayer.eWrapper[0].mozFullScreenElement) {
                    ptaPlayer.eWrapper[0].mozCancelFullScreen();
                } else {
                    ptaPlayer.eWrapper[0].mozRequestFullScreen();
                }
            else if (divObj.webkitRequestFullscreen)
                if (document.webkitFullscreenElement) {
                    document.webkitCancelFullScreen();
                } else {
                    divObj.webkitRequestFullscreen();
                }
            //  stop bubbling so we don't get bounce back


        });
        setInterval(() => {
            // var detalTime = new Date().getTime() - timeLastActive;
            // if (detalTime < 5000 && this.ptaPlayer.eWrapper.is(':hover')) {
            //     this.eController.css('display', 'block');
            // } else {
            //     this.eController.css('display', 'none');
            // }
            if (!isDragTimeControl && eTimeSlider) {
                var time = ptaPlayer.eVideo[0].currentTime;
                eTimeSlider.update({
                    from: time
                });
                eCurrentTime.text(ptaControlBar.formatTime(time));
            }
        }, 1000);
    }
}