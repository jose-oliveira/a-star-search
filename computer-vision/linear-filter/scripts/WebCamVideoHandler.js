var mediaStream;
class WebCamVideoHandler{

  constructor(videoElement){
    this.video = videoElement;
  }

  play(){

    var video = this.video;
    var handleVideo = function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
        mediaStream = stream;
    }

    var videoError = function(e) {
        // do something
    }

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, handleVideo, videoError);
    }

  }

  stop(){
    //@TODO Find a less messy way of stopping the media stream.
    if(mediaStream){
      mediaStream.removeTrack(mediaStream.getTracks()[0]);
      this.video.pause();
    }
  }

}
