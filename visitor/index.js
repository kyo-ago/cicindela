"use strict";

var peer = new Peer('visitor-id', {key: '8a14773a-e38a-4059-abbd-21e3d45dd018'});

var peerId = 'host-id';

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
navigator.getUserMedia(
    {video: true, audio: true},
    (stream) => {
        peer.call(peerId, stream).on('stream', function(remoteStream) {
            var video = document.querySelector('#video');
            video.setAttribute('src', URL.createObjectURL(remoteStream));
            video.play();
        });
    },
    console.error.bind(console)
);

navigator.geolocation.getCurrentPosition((position) => {
    var conn = peer.connect(peerId);
    conn.on('open', function() {
        let sendPosition = (position) => {
            conn.send({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        };
        sendPosition(position);
    });
});
