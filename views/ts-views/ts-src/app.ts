/**
 * Created by NamTV on 6/6/2017.
 */
import * as $ from 'jquery';
import {Event} from "typescript.events"
import {FacebookAPI} from "./FacebookAPI";
import {VideoPlayer} from "./VideoPlayer";
import {PTAPlayer} from "./PTAPlayer";
declare var parser: any;
export class SinglePage extends Event{
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
    ptaPlayer = new PTAPlayer();
    public run(){

    }

}
new SinglePage().run();
