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
  componentWillMount() {
    this.setState({currentUserId: Meteor.userId()});
    this.setState({currentVideo: Meteor.userId()});
  }

  componentDidMount() {
    this.state.peer.on('open', () => { console.log('Peer: ' + this.state.peer.id) });

    this.state.peer.on('call', (incomingCall) => {
      this.setState({ currentCall: incomingCall });
      var newUserId = '094f129e012c92123ng923va';
      var newUserObj = {
        firstname: 'Mark',
        lastname: 'Zuckerberg',
        image: 'http://blogs.timesofindia.indiatimes.com/wp-content/uploads/2015/12/mark-zuckerberg.jpg'
      }
      this.state.users[newUserId] = newUserObj;
      incomingCall.answer(this.state.localStream);
      incomingCall.on('stream', (remoteStream) => {
        this.setState({ remoteStream: remoteStream })
        var video = document.getElementById(newUserId);
        console.log(video);
        video.src = URL.createObjectURL(remoteStream);
      });
    });

    var errorElement = document.querySelector('#error');
    var video = document.querySelector('#video-'+this.state.currentVideo);

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
      // data: this.props.session.video,
      users: this.props.session.users,
      currentUserId: Meteor.userId(),
      currentVideo: Meteor.userId(),
      peer: new Peer({
        key: '3rzxypo1rwq7u8fr',
        debug: 3,
        config: {'iceServers': [
          { url: 'stun:stun.l.google.com:19302' },
          { url: 'stun:stun1.l.google.com:19302' },
        ]}
      })
    }
    console.log(this.props.session);
    console.log(Sessions.find().fetch());

    this._videos = this._videos.bind(this);
    this._videoThumbnails = this._videoThumbnails.bind(this);
    this._changeVideo = this._changeVideo.bind(this);
  }

  _videos() {
    return Object.keys(this.state.users).map((key, index) => {
      var display = {display: 'block'};
      console.log(key + ': '+ this.state.currentUserId);
      if (key != this.state.currentVideo) display = {display: 'none'};
      if (key == this.state.currentUserId) {
        var vid = <video muted key={'video-' + key} className="video" id={'video-' + key} value={'video-' + key} style={display} autoPlay></video>;
        console.log(vid);
        vid.muted = true;
        return (vid);
      } else {
          return (<video key={'video-' + key} className="video" id={'video-' + key} value={'video-' + key} style={display} autoPlay></video>);
      }
    });
  }

  _videoThumbnails() {
    return Object.keys(this.state.users).map((key, index) => {
      this.state.users[key].color = Colors.choose(index);
      if (key == this.state.currentVideo) {
        return (<div key={key} className="video-thumbnail" id={key} value={key} style={{ background: this.state.users[key].color }} onClick={this._changeVideo}>
            <div className="video-user-initial">{this.state.users[key].profile.firstname[0]}</div>
          </div>);
      }
      return (<div key={key} className="video-thumbnail" id={key} value={key} onClick={this._changeVideo}>
          <div className="video-user-picture" style={{ background: 'url(' + this.state.users[key].profile.image + ')', border: '3px solid ' + this.state.users[key].color }}></div>
        </div>);
    });
  }

  _changeVideo(event) {
    var previous = document.getElementById(this.state.currentVideo);
    console.log(previous);
    replaceChildNode(previous, "div", "video-user-picture", { background: 'url(' + this.state.users[this.state.currentVideo].profile.image + ')', border: '3px solid ' + this.state.users[this.state.currentVideo].color });
    var id = event.currentTarget.getAttribute("value");
    replaceChildNode(event.currentTarget, "div", "video-user-initial", null, this.state.users[id].profile.firstname[0]);
    event.currentTarget.style.background = this.state.users[id].color;
    this.setState({currentVideo: id});
  }

  render() {
    return (
      <div className="video-session">
        <div className="video-container">
          {this._videos()}
          <div className="error-message" id="error"></div>
        </div>
        <div className="sesh-video-sidebar">
          {this._videoThumbnails()}
        </div>
      </div>
    )
  }
}
