"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_events_1 = require("typescript.events");
var PTAPlayer_1 = require("./PTAPlayer");
var SinglePage = (function (_super) {
    __extends(SinglePage, _super);
    function SinglePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // facebookAPI = new FacebookAPI();
        // videoPlayer = new VideoPlayer('video','.subtitle');
        // public run() {
        //     this.facebookAPI.on('readyFacebook',()=>{
        //     })
        //     this.facebookAPI.init();
        //     this.videoPlayer.addSubtitle('English','/subs/subvi.srt');
        //     this.videoPlayer.setActiveSubtitle('English');
        //     this.videoPlayer.startTrackingSub();
        // }
        _this.ptaPlayer = new PTAPlayer_1.PTAPlayer();
        return _this;
    }
    SinglePage.prototype.run = function () {
    };
    return SinglePage;
}(typescript_events_1.Event));
exports.SinglePage = SinglePage;
new SinglePage().run();
//# sourceMappingURL=app.js.map