import React from 'react';

export default class SessionChat extends React.Component {
  render() {
    return (
      <div className="chat-container">
        <div className="reply-box">
          <div className="attachment-button"></div>
          <div className="reply-input">
            <textarea placeholder="Type here to reply..."></textarea>
          </div>
        </div>
      </div>
    )
  }
}
