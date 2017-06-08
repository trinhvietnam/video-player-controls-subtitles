/**
 * Created by NamTV on 6/6/2017.
 */
import * as $ from 'jquery';
import {Event} from "typescript.events"
import {VideoPlayer} from "./VideoPlayer";
import {FacebookAPI} from "./FacebookAPI";
declare var parser: any;
export class SinglePage extends Event{
    facebookAPI = new FacebookAPI();
    public run() {
        this.facebookAPI.on('readyFacebook',()=>{
            // alert('123');
        })

        $(function () {
            var videoPlayer = new VideoPlayer('#my-player', '.subtitle');
            videoPlayer.addSubtitle('English', '/subs/suben.srt');
            // videoPlayer.addSubtitle('Tiếng Việt','/subs/subvi.srt');
            videoPlayer.start();
            videoPlayer.setActiveSubtitle(['English']);
        });
        this.facebookAPI.init();
    }

}
new SinglePage().run();
