import React from 'react';
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
  componentDidMount() {
    this.setState({msgBox: document.getElementById('msgBox')});
  }

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      currentUserId: '094f129e012c92123ng923va',
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
      },
      messages: [{
          from: '507f191e810c19729de860ea',
          content: 'Here’s some documentation I wrote up about expectimax trees and probablistic modeling if you want some notes to follow along.',
          time_created: new Date(2016, 9, 18, 8, 30, 55, 0)
        },
        {
          from: '094f129e012c92123ng923va',
          content: 'In lecture Professor Hug also gave some tips about the difference between a reflex agent and a look ahead agent. Here’s the video.',
          time_created: new Date(2016, 9, 18, 8, 32, 15, 0)
        }
      ]
    }

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
      this.state.messages.push(message);
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
