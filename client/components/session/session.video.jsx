import React from 'react';
import Script from 'react-load-script'

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
    $.when(
        $.getScript( "https://rtcmulticonnection.herokuapp.com/dist/RTCMultiConnection.min.js" ),
        $.getScript( "https://rtcmulticonnection.herokuapp.com/socket.io/socket.io.js" ),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    ).done(() => {
      var connection = new RTCMultiConnection();

      connection.userid = Meteor.userId();
      connection.sessionid = this.state.ownerId;

      connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

      connection.session = {
          audio: true,
          video: true
      };

      connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
      };

      connection.onstream = function(event) {
          document.getElementById("video-container").appendChild( event.mediaElement );
      };

      connection.onstream = (event) => {
          var video = event.mediaElement;
          console.log(event);
          console.log(connection);
          // if (event.userid == this.state.sessionId) {
          //   event.userid = connection.userid;
          // }
          // if (event.type == "remote") {
          //     this.state.videoSrc[event.userid] = event.mediaElement;
          // }
          // if (event.type == "local") {
          //   // connection.changeUserId('your-new-userid');
          //   this.state.videoSrc[Meteor.userId()] = event.mediaElement;
          // }
          this.state.videoSrc[event.userid] = event.mediaElement;
      };

      connection.openOrJoin(this.state.ownerId, function(roomExists, roomid) {
        if(!roomExists) {
          console.log("OPENING");
        } else {
          console.log("JOINING: " + roomExists);
        }
      });

      // connection.checkPresence(this.state.sessionid, function(roomExists, roomid) {
      //   if(!roomExists) {
      //     console.log("OPENING");
      //     console.log(connection.userid);
      //     connection.changeUserId(Meteor.userId());
      //     connection.open(roomid);
      //   } else {
      //     console.log("JOINING: " + roomExists);
      //     connection.join(roomid);
      //   }
      //   console.log(connection);
      // });
    });
  }

  constructor(props) {
    super(props);
    this.props.session.users[Meteor.userId()] = Meteor.user();
    this.state = {
      videoSrc: {},
      sessionId: this.props.session._id,
      users: this.props.session.users,
      ownerId: this.props.session.ownerId,
      currentUserId: Meteor.userId(),
      currentVideo: Meteor.userId()
    }

    this._videos = this._videos.bind(this);
    this._videoThumbnails = this._videoThumbnails.bind(this);
    this._changeVideo = this._changeVideo.bind(this);
  }

  _videos() {
    console.log(this.state.videoSrc);
    return Object.keys(this.state.videoSrc).map((key, index) => {
      var video = this.state.videoSrc[key];
      var display = {display: 'block'};
      if (key != this.state.currentVideo) display = {display: 'none'};
      return (<video src={ $(video).attr("src") } controls="controls" muted key={'video-' + key} className="video" id={'video-' + key} value={'video-' + key} style={display} autoPlay></video>);
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

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }

  handleScriptError() {
    this.setState({ scriptError: true })
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true })
  }

  render() {
    return (
      <div className="video-session">
        <div id="video-container" className="video-container">
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
