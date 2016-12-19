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

    ////////
    var errorElement = document.querySelector('#error');
    var video = document.querySelector('#video-'+this.state.currentVideo);
    var video2 = document.querySelector('#video-507f191e810c19729de860ea');
    var video3 = document.querySelector('#video-094f129e012c92123ng923va');

    start();

    function start() {
      console.log('Requesting local stream');
      navigator.mediaDevices.getUserMedia({
        // audio: true,
        video: true
      })
      .then(handleSuccess)
      .catch(handleError);
    }

    function handleSuccess(stream) {
      console.log('Received local stream');
      var videoTracks = stream.getVideoTracks();
      console.log('Using video device: ' + videoTracks[0].label);
      stream.oninactive = function() {
        console.log('Stream inactive');
      };
      window.localstream = stream; // make variable available to browser console
      video.srcObject = stream;
      call();
      // var audioContext = new AudioContext();

      // Create an AudioNode from the stream
      // var mediaStreamSource = audioContext.createMediaStreamSource(stream);

      // Connect it to the destination or any other node for processing!
      // mediaStreamSource.connect(audioContext.destination);
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

    ////////
    var offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };

    var pcCollection = {
      local: {
        // "pc1": null,
        // "pc2": null
      },
      remote: {
        // "pc1": null,
        // "pc2": null
      }
    }

    function createStream(name, video) {
      var servers = null;
      pcCollection.local[name] = new RTCPeerConnection(servers);
      console.log(pcCollection.local);
      pcCollection.remote[name] = new RTCPeerConnection(servers);
      pcCollection.remote[name].onaddstream = (e) => {
        video.srcObject = e.stream;
        console.log(name + ': Received remote stream');
      };
      pcCollection.local[name].onicecandidate = (event) => {
        handleCandidate(event.candidate, pcCollection.remote[name], name + ': ', 'local');
      };
      pcCollection.remote[name].onicecandidate = (event) => {
        handleCandidate(event.candidate, pcCollection.local[name], name + ': ', 'remote');
      };
      console.log(name + ': Created local and remote peer connection objects: ');
    }

    function addStreams() {
      var localPcs = pcCollection.local;
      var remotePcs = pcCollection.remote;
      for (var name in localPcs) {
         if (localPcs.hasOwnProperty(name)) {
           localPcs[name].addStream(window.localstream);
           console.log('Adding local stream to' + name);
           localPcs[name].createOffer(offerOptions)
           .then((desc) => {
               localPcs[name].setLocalDescription(desc);
               console.log('Offer from ' + name + ' (local) \n' + desc.sdp);
               remotePcs[name].setRemoteDescription(desc);
               // Since the 'remote' side has no media stream we need
               // to pass in the right constraints in order for it to
               // accept the incoming offer of audio and video.
               remotePcs[name].createAnswer().then(
                 (desc) => {
                   remotePcs[name].setLocalDescription(desc);
                   console.log('Answer from ' + name + ' (remote) \n' + desc.sdp);
                   localPcs[name].setRemoteDescription(desc);
                 },
                 onCreateSessionDescriptionError
               );
             },
             onCreateSessionDescriptionError
           ).catch((err) => {
             console.log("SDP ERROR: " + err);
           });
         }
      }
    }

    var call = () => {
      console.log('Starting calls');
      var audioTracks = window.localstream.getAudioTracks();
      var videoTracks = window.localstream.getVideoTracks();
      if (audioTracks.length > 0) {
        console.log('Using audio device: ' + audioTracks[0].label);
      }
      if (videoTracks.length > 0) {
        console.log('Using video device: ' + videoTracks[0].label);
      }
      // Create an RTCPeerConnection via the polyfill.
      // TODO: Define video 2
      // createStream("pc1", video2);

      // TODO: Define video 3
      // createStream("pc2", video3);
      var otherUserId = null;
      var otherVideo = null;
      for (var id in this.state.users) {
        if (id != "507f191e810c19729de860ea" && id != "094f129e012c92123ng923va" && id != this.state.currentUserId) {
          otherUserId = id;
          otherVideo = document.querySelector('#video-' + otherUserId);
          console.log(otherUserId + ": " + otherVideo);
        }
      }
      createStream(otherUserId, otherVideo);

      addStreams();
    }

    function hangup() {
      console.log('Ending calls');
      var localPcs = pcCollection.local;
      for (var name in localPcs) {
         if (localPcs.hasOwnProperty(name)) {
           localPcs[name].close();
           localPcs[name] = null;
         }
      }
      var remotePcs = pcCollection.remote;
      for (var name in remotePcs) {
         if (remotePcs.hasOwnProperty(name)) {
           remotePcs[name].close();
           remotePcs[name] = null;
         }
      }
    }

    function onCreateSessionDescriptionError(error) {
      console.log('Failed to create session description: ' + error.toString());
    }

    function handleCandidate(candidate, dest, prefix, type) {
      if (candidate) {
        dest.addIceCandidate(candidate)
        .then(
          onAddIceCandidateSuccess,
          onAddIceCandidateError
        );
        console.log(prefix + 'New ' + type + ' ICE candidate: ' + candidate.candidate);
      }
    }

    function onAddIceCandidateSuccess() {
      console.log('AddIceCandidate success.');
    }

    function onAddIceCandidateError(error) {
      console.log('Failed to add ICE candidate: ' + error.toString());
    }
    // var localVid = document.getElementById("video-" + this.state.currentUserId);
    // localVid.muted = "muted";

    // this.state.peer.on('open', () => { console.log('Peer: ' + this.state.peer.id) });
    //
    // this.state.peer.on('call', (incomingCall) => {
    //   this.setState({ currentCall: incomingCall });
    //   var newUserId = '094f129e012c92123ng923va';
    //   var newUserObj = {
    //     firstname: 'Mark',
    //     lastname: 'Zuckerberg',
    //     image: 'http://blogs.timesofindia.indiatimes.com/wp-content/uploads/2015/12/mark-zuckerberg.jpg'
    //   }
    //   this.state.users[newUserId] = newUserObj;
    //   incomingCall.answer(this.state.localStream);
    //   incomingCall.on('stream', (remoteStream) => {
    //     this.setState({ remoteStream: remoteStream })
    //     var video = document.getElementById(newUserId);
    //     console.log(video);
    //     video.src = URL.createObjectURL(remoteStream);
    //   });
    // });
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
      // console.log(key + ': '+ this.state.currentUserId);
      if (key != this.state.currentVideo) display = {display: 'none'};
      if (key == this.state.currentUserId) {
        var vid = <video muted key={'video-' + key} className="video" id={'video-' + key} value={'video-' + key} style={display} autoPlay></video>;
        // console.log(vid);
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
    // console.log(previous);
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
