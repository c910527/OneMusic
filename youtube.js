// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var ytPlayerState = -1;
var PLAYER_WIDTH = '100%';
var PLAYER_HEIGHT = '500';
//動態生成div
function createPlayerDiv(w, h) {
    var obj = document.createElement("div");
    obj.id = "player";
    document.body.appendChild(obj);
    AndroidFunction.log(w + " ; " + h);
    PLAYER_WIDTH = w / window.devicePixelRatio;
    PLAYER_HEIGHT = h / window.devicePixelRatio;
    AndroidFunction.log(window.devicePixelRatio + " ; " + w + " ; " + h);
    onYouTubeIframeAPIReady();
}

function onYouTubeIframeAPIReady(startSeconds) {
    player = new YT.Player('player', {
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        //                videoId: videoid,
        playerVars: {
            'enablejsapi': 0,
            'autohide': 1,
            'autoplay': 0,
            'controls': 0, //值：0、1或2。默認值為1。此參數會指明視頻播放器控件是否會顯示。
            'showinfo': 0,
            'start': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onPlaybackRateChange': onPlayerPlaybackRateChange,
            'onError': onPlayerError
        }
    });
}

function createPlayerDiv(w, h, startSeconds) {
    var obj = document.createElement("div");
    obj.id = "player";
    document.body.appendChild(obj);
    AndroidFunction.log(w + " ; " + h);
    PLAYER_WIDTH = w / window.devicePixelRatio;
    PLAYER_HEIGHT = h / window.devicePixelRatio;
    AndroidFunction.log(window.devicePixelRatio + " ; " + w + " ; " + h);
    onYouTubeIframeAPIReady(startSeconds);
}

function onYouTubeIframeAPIReady(startSeconds) {
    player = new YT.Player('player', {
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        //                videoId: videoid,
        playerVars: {
            'enablejsapi': 0,
            'autohide': 1,
            'autoplay': 0,
            'controls': 0, //值：0、1或2。默認值為1。此參數會指明視頻播放器控件是否會顯示。
            'showinfo': 0,
            'start': startSeconds
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onPlaybackRateChange': onPlayerPlaybackRateChange,
            'onError': onPlayerError
        }
    });
}

function newPlayer(videoid, MSG, startSeconds) {
    if (MSG == 0) {
        cueVideoById(videoid, startSeconds)
    } else if (MSG == 1) {
        loadVideoById(videoid);
        playVideo();
    } else if (MSG == 2) {
        loadVideoById(videoid);
        pauseVideo();
    }
    AndroidFunction.setDuration(player.getDuration());
}

function newPlayer(videoid, MSG) {
    if (MSG == 0) {
        cueVideoById(videoid)
    } else if (MSG == 1) {
        loadVideoById(videoid);
        playVideo();
    } else if (MSG == 2) {
        loadVideoById(videoid);
        pauseVideo();
    }
    AndroidFunction.setDuration(player.getDuration());
}


// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    //event.target.playVideo();
    //            alert("onPlayerReady: " + event.data);
    AndroidFunction.onPlayerReady();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    ytPlayerState = event.data;
    AndroidFunction.onPlayerStateChange(event.data, player.getDuration(), player.getCurrentTime());
}

function onPlayerPlaybackRateChange(event) {
    AndroidFunction.onPlayerPlaybackRateChange(event.data);
}

function onPlayerError(event) {
    AndroidFunction.onPlayerError(event.data);
    //alert("onPlayerError: " + event.data);
}

function stopVideo() {
    player.stopVideo();
}

function cueVideoById(videoid, startSeconds) {
    player.cueVideoById(videoid, startSeconds);
    AndroidFunction.setSize(player.width, player.height);
    //player.playVideo();
}

function cueVideoById(videoid) {
    player.cueVideoById(videoid, 0);
    AndroidFunction.setSize(player.width, player.height);
    //player.playVideo();
}

function loadVideoById(videoid, startSeconds) {
    player.loadVideoById(videoid, startSeconds);
    AndroidFunction.setSize(player.width, player.height);
    //player.playVideo();
}

function loadVideoById(videoid) {
    player.loadVideoById(videoid, 0);
    AndroidFunction.setSize(player.width, player.height);
    //player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function checkVideo() {
    if (ytPlayerState == YT.PlayerState.PLAYING) {
        player.pauseVideo();
    } else {
        playVideo();
    }
}

function playVideo() {
    player.playVideo();
}

function showAndroidTime(time) {
    AndroidFunction.showTime(time);
}

function seekTo(seconds) {
    player.seekTo(seconds, true);
}

//Send video current time back to the app
function updateVideoTime() {
    showAndroidTime(player.getCurrentTime());
}

function setScreenSize(w, h) {
    AndroidFunction.log(w + " ; " + h);
    w = w / window.devicePixelRatio;
    h = h / window.devicePixelRatio;
    AndroidFunction.log(window.devicePixelRatio + " ; " + w + " ; " + h);
    player.setSize(w, h);

    PLAYER_WIDTH = w;
    PLAYER_HEIGHT = h;
}

function setFocus() {
    document.getElementById('btn').focus();
}

function setBlur() {
    document.getElementById('btn').blur();
}
