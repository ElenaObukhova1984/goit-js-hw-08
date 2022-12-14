import Player from "@vimeo/player";
import throttle from "lodash.throttle";

const LOCAL_STORAGE_KEY = "videoplayer-current-time";

const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });



    player.on('timeupdate', throttle(function(data) {
        console.log(data.seconds);
        localStorage.setItem(LOCAL_STORAGE_KEY, data.seconds);
    }, 1000));

    const savedTime = Number(localStorage.getItem(LOCAL_STORAGE_KEY))
;
    player.setCurrentTime(savedTime).then(function (seconds) {
        console.log(seconds);
});