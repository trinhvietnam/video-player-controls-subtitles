/**
 * Created by NamTV on 6/8/2017.
 */
import {Event} from "typescript.events"
declare var FB: any;
export class FacebookAPI extends Event {
    isReady;

    private loadFacebookSDK() {
        console.log('333333333333333333333');
        FB.init({
            appId: '304062223380557',
            cookie: true,  // enable cookies to allow the server to access
                           // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.9' // use graph api version 2.8
        });
        this.isReady = true;
        this.emit('readyFacebook');
        this.getLoginStatus();
        this.fbLogin();

    }

    init() {
        this.loadFacebookSDK();
    }

    public getLoginStatus() {
        FB.getLoginStatus((response) => {
            console.log(response);
            this.fbPermission();
            this.fbListFriends();
            // this.fbFeed();
            this.fbInvite();
        });
    }

    public fbLogin() {
        FB.login(function (response) {
            console.log(response);
        }, {scope: 'public_profile,email,user_friends'});
    }

    public fbPermission() {
        FB.api('/me/permissions', function (response) {
                console.log(response);
            }
        );
    }
    public fbListFriends(){
        FB.api(
            '/me',
            'GET',
            {"fields":"id,name,friends,picture"},
            function(response) {
                console.log(response);
            }
        );
    }
    public fbShare(){
        FB.ui({
            method: 'share',
            href: 'https://developers.facebook.com/docs/',
        }, function(response){
            console.log(response);
        });
        // FB.ui({
        //     method: 'share_open_graph',
        //     action_type: 'og.likes',
        //     action_properties: JSON.stringify({
        //         object:'https://developers.facebook.com/docs/',
        //     })
        // }, function(response){
        //     console.log(response);
        // });


    }
    public fbFeed(){
        FB.ui({
            method: 'feed',
            link: 'https://developers.facebook.com/docs/',
            caption: 'Your Caption here',
            description: 'some sort of your own description',
            message: 'Your Message goes here mate'
        }, function(response){
            console.log(response);
        });
    }
    public fbInvite(){
        FB.api(
            "/me/invitable_friends",
            function (response) {
                console.log(response);
            }
        );
    }
}