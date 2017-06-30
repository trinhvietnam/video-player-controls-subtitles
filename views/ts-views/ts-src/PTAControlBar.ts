/**
 * Created by NamTV on 6/30/2017.
 */
declare var $;
export class PTAControlBar{
    private eWrapper;
    private eVideo;
    private ptaPlayer;
    constructor(eVideo,eWrapper,ptaPlayer){
        this.eVideo = eVideo;
        this.eWrapper = eWrapper;
        this.ptaPlayer = ptaPlayer;
    }
    private formatTime(num){
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
    public initControlBar() {
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
        var ptaPlayer = this.ptaPlayer;
        var eVideo = this.eVideo;
        var ptaControlBar = this;
        var eTimeSlider;
        var isDragTimeControl = false;
        this.eVideo.on('loadeddata', () => {
            eTimeSlider = e.find('#range_43').ionRangeSlider({
                min: 0,
                max: eVideo[0].duration,
                from: 0,
                prettify: ptaControlBar.formatTime,
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
}