"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PTAController_1 = require("./PTAController");
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
//# sourceMappingURL=PTAPlayer.js.map