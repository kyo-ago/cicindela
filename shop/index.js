"use strict";

var peer = new Peer('host-id', {key: '8a14773a-e38a-4059-abbd-21e3d45dd018'});

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

window.main = () => {
    peer.on('connection', function(conn) {
        console.log('connection');
        conn.on('data', (data) => {
            new google.maps.Map(document.querySelector('#map'), {
                center: {lat: data.latitude, lng: data.longitude},
                zoom: 18
            });
        });
    });
    peer.on('call', (call) => {
        navigator.getUserMedia(
            {video: true, audio: false},
            (stream) => call.answer(stream),
            console.error.bind(console)
        );
        call.on('stream', (remoteStream) => {
            var video = document.querySelector('#video');
            video.setAttribute('src', URL.createObjectURL(remoteStream));
            video.play();
        });
    });
};
