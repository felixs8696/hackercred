import React from 'react';
import AppBar from 'material-ui/AppBar';

var appBarTitleStyle = {
  letterSpacing: ".5px",
  fontFamily: "'Raleway', 'Roboto', 'Lato', 'Helvetica', 'Arial', sans-serif",
  fontWeight: "600",
  color: "white",
  textTransform: "uppercase",
  fontSize: "16px",
  position: "absolute",
  left: "50%",
  transform: "translate(-50%)"
}

export default class SessionNavbar extends React.Component {
  render() {
    return (
      <div>
        <AppBar
          title = "Hacker Cred"
          titleStyle = {appBarTitleStyle}
          className = "navbar">
          <div className="session-button" type="button" value="Share Session">Share Session</div>
        </AppBar>
      </div>
    )
  }
}
