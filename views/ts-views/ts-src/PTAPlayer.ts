import {PTAController} from "./PTAController";
/**
 * Created by NamTV on 6/30/2017.
 */
// import * as $ from 'jquery';
declare var $;
declare var parser: any;
export class PTAPlayer {
    public eWrapper;
    private videoSelector;
    private autoStart = false;
    private enableControlBar = false;
    private isStaticSub = true;
    public eContainerFloatLayer;
    public eVideo;
    private ptaControlBar;
    public static FIELDS = {
        videoSelector: 'videoSelector',
        autoStart: 'autoStart',
        isStaticSub: 'isStaticSub',
        enableControlBar: 'enableControlBar'
    };
    private subtitles = {};

    private initContainerFloatLayer() {
        var e = $('<div class="container-float-layer" style="visibility: hidden"></div>');
        e.css('position', 'absolute');
        e.css('width', '100%');
        e.css('text-align', 'center');
        e.css('bottom', 0);
        e.css('z-index', 9100032000006);
        this.eContainerFloatLayer = e;
        this.eWrapper.append(e);
    }
    constructor(options: any = {autoStart: true, enableControlBar: true}) {
        this.eWrapper = $('.ptaPlayer').css('position', 'relative').css('font-size','0px');
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
            this.ptaControlBar = new PTAController(this);
            this.ptaControlBar.initControlBar();
        }
        if (this.autoStart) {
            this.eVideo.trigger('play');
        } else {
            this.eVideo.trigger('pause');
        }
    }

    public updateVideoTime(time) {
        this.eVideo[0].currentTime = time;
    }
    public updateVideoVolume(volume) {
        this.eVideo[0].volume = volume;
    }
    public updateVideoSpeed(playbackRate) {
        this.eVideo[0].playbackRate = playbackRate;
    }
    public playVideo(){
        this.eVideo[0].play();
    }
    public pauseVideo(){
        this.eVideo[0].pause();
    }
}