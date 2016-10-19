import React from 'react';

export default class SessionVideo extends React.Component {
  componentDidMount() {
    var errorElement = document.querySelector('#error');
    var video = document.querySelector('video');

    var constraints = window.constraints = {
      audio: true,
      video: true
    };

    function handleSuccess(stream) {
      var videoTracks = stream.getVideoTracks();
      console.log('Got stream with constraints:', constraints);
      console.log('Using video device: ' + videoTracks[0].label);
      stream.oninactive = function() {
        console.log('Stream inactive');
      };
      window.stream = stream; // make variable available to browser console
      video.srcObject = stream;
      var audioContext = new AudioContext();

      // Create an AudioNode from the stream
      var mediaStreamSource = audioContext.createMediaStreamSource(stream);

      // Connect it to the destination or any other node for processing!
      mediaStreamSource.connect(audioContext.destination);
    }

    function handleError(error) {
      errorMsg('Error: ' + error.name, error);
      if (error.name === 'ConstraintNotSatisfiedError') {
        errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
            constraints.video.width.exact + ' px is not supported by your device.');
      } else if (error.name === 'PermissionDeniedError') {
        errorMsg('Permissions have not been granted to use your camera and ' +
          'microphone. Please allow the page access to your devices.');
      }
    }

    function errorMsg(msg, error) {
      errorElement.innerHTML += '<p>' + msg + '</p>';
      if (typeof error !== 'undefined') {
        console.error(error);
      }
    }

    navigator.mediaDevices.getUserMedia(constraints).
        then(handleSuccess).catch(handleError);
  }
  render() {
    return (
      <div className="video-container">
        <video className="video" id="video" autoPlay></video>
        <div className="error-message" id="error"></div>
      </div>
    )
  }
}
