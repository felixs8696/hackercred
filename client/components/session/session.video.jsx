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

  constructor(props) {
      super(props);
      this.state = {
        currentUserId: '094f129e012c92123ng923va',
        currentVideo: '094f129e012c92123ng923va',
        users: {
          '507f191e810c19729de860ea': {
            firstname: 'Bill',
            lastname: 'Gates',
            image: 'https://pbs.twimg.com/profile_images/558109954561679360/j1f9DiJi.jpeg'
          },
          '094f129e012c92123ng923va': {
            firstname: 'Mark',
            lastname: 'Zuckerberg',
            image: 'http://blogs.timesofindia.indiatimes.com/wp-content/uploads/2015/12/mark-zuckerberg.jpg'
          }
        }
      }
      this._videoThumbnails = this._videoThumbnails.bind(this);
  }

  _videoThumbnails() {
    return Object.keys(this.state.users).map((key) => {
      console.log(key);
      console.log(this.state.currentVideo);
      if (key == this.state.currentVideo) {
        return (<div key={key} className="video-thumbnail" style={{ background: '#DB4437' }}>
            <div className="video-user-picture" style={{ background: 'url(' + this.state.users[key].image + ')' }}></div>
          </div>);
      }
      return (<div key={key} className="video-thumbnail">
          <div className="video-user-picture" style={{ background: 'url(' + this.state.users[key].image + ')' }}></div>
        </div>);
    });
  }

  render() {
    return (
      <div className="video-container">
        <video className="video" id="video" autoPlay></video>
        <div className="error-message" id="error"></div>
        <div className="sesh-video-sidebar">
          {this._videoThumbnails()}
        </div>
      </div>
    )
  }
}
