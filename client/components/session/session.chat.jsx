import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { updateChat } from '/lib/methods/chat';
import AttachFile from 'material-ui/svg-icons/editor/attach-file';

const sidebarIconStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "28px",
  width: "28px"
}

//TODO: Replace with Database collections and data

export default class SessionChat extends React.Component {
  componentWillMount() {
    this.setState({id: FlowRouter.getParam('sessionId')});
  }

  componentDidMount() {
    this.setState({msgBox: document.getElementById('msgBox')});
  }

  constructor(props) {
    super(props);
    this.state = this.props.session.chat;

    this._sendMessage = this._sendMessage.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._messages = this._messages.bind(this);
  }

  _sendMessage(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
      event.preventDefault();
      var message = {
        from: this.state.currentUserId,
        content: this.state.text,
        time_created: new Date()
      }
      updateChat.call({sessionId: this.state.id, msg: message}, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
          this.setState({messages: this.props.session.chat.messages});
          console.log(this.state);
        }
      });
      this.setState({text: ''});
      this.state.msgBox.scrollTop = this.state.msgBox.scrollHeight;
      return true;
    }
    return false;
  }

  _handleChange(event) {
    this.setState({text: event.target.value});
  }

  _messages() {
    return this.state.messages.map((data) => {
      if (data.from == this.state.currentUserId) {
        return ( <div key={data.time_created} className="message-container right">
          <div className="message-preview-container">
            <div className="message-preview"></div>
          </div>
          <div className="message-bubble">
            <div className="message-bar">
              <div className="message-picture" style={{background: 'url(' + this.state.users[data.from].image + ')'}}></div>
            </div>
            <div className="message-text">{data.content}</div>
          </div>
        </div> );
      }
      return ( <div key={data.time_created} className="message-container left">
        <div className="message-bubble">
          <div className="message-bar">
            <div className="message-picture" style={{background: 'url(' + this.state.users[data.from].image + ')'}}></div>
          </div>
          <div className="message-text">{data.content}</div>
        </div>
        <div className="message-preview-container">
          <div className="message-preview"></div>
        </div>
      </div> );
    });
  }

  render() {
    return (
      <div className="chat-container">
        <div className="chat-message-container" id="msgBox">
          {this._messages()}
        </div>
        <div className="reply-box">
          <div className="attachment-button">
            <AttachFile style={sidebarIconStyle}/>
          </div>
          <div className="reply-input">
            <textarea id="chat-message" placeholder="Type here to reply..." value={this.state.text} onChange={this._handleChange} onKeyDown={this._sendMessage}></textarea>
          </div>
        </div>
      </div>
    )
  }
}
