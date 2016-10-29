import React from 'react';

Colors = {};
Colors.names = {
  red: '#DB4437',
  lightblue: '#2294E3',
  green: '#0F9D58',
  yellow: '#F4C20D'
}

Colors.choose = function(i) {
  var keys = Object.keys(this.names)
  var key = keys[i % keys.length];
  return this.names[key];
};

var replaceChildNode = function(node, type, className, style, text) {
  node.removeChild(node.childNodes[0]);
  var div = document.createElement(type);
  div.className = className;
  if (style) Object.assign(div.style,style);
  if (text) {
    var text = document.createTextNode(text);
    div.appendChild(text);
  }
  node.appendChild(div);
}

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

  constructor(props, data) {
    super(props);
    this.state = {
      data: this.props.session.video,
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
    this._changeVideo = this._changeVideo.bind(this);
  }

  _videoThumbnails() {
    return Object.keys(this.state.users).map((key, index) => {
      this.state.users[key].color = Colors.choose(index);
      if (key == this.state.currentVideo) {
        return (<div key={key} className="video-thumbnail" id={key} value={key} style={{ background: this.state.users[key].color }} onClick={this._changeVideo}>
            <div className="video-user-initial">{this.state.users[key].firstname[0]}</div>
          </div>);
      }
      return (<div key={key} className="video-thumbnail" id={key} value={key} onClick={this._changeVideo}>
          <div className="video-user-picture" style={{ background: 'url(' + this.state.users[key].image + ')', border: '3px solid ' + this.state.users[key].color }}></div>
        </div>);
    });
  }

  _changeVideo(event) {
    var previous = document.getElementById(this.state.currentVideo);
    replaceChildNode(previous, "div", "video-user-picture", { background: 'url(' + this.state.users[this.state.currentVideo].image + ')', border: '3px solid ' + this.state.users[this.state.currentVideo].color });
    var id = event.currentTarget.getAttribute("value");
    replaceChildNode(event.currentTarget, "div", "video-user-initial", null, this.state.users[id].firstname[0]);
    event.currentTarget.style.background = this.state.users[id].color;
    this.setState({currentVideo: id});
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
