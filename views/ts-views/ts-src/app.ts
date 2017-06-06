/**
 * Created by NamTV on 6/6/2017.
 */
import * as $ from 'jquery';
import {VideoPlayer} from "./VideoPlayer";
declare var parser:any;
export class SinglePage{
    public run(){
        $(function () {
            var videoPlayer = new VideoPlayer('#my-player','.subtitle');
            videoPlayer.addSubtitle('English','/subs/suben.srt');
            // videoPlayer.addSubtitle('Tiếng Việt','/subs/subvi.srt');
            videoPlayer.start();
            videoPlayer.setActiveSubtitle(['English']);
        });
    }
}
new SinglePage().run();
