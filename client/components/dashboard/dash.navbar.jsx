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

export default class DashNavbar extends React.Component {
  constructor() {
    super()
    this.createNewSession = this.createNewSession.bind(this);
  }

  createNewSession() {
    FlowRouter.go('/' + ("00000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-5));
  }

  render() {
    return (
      <div>
        <AppBar
          title = "Hacker Cred"
          titleStyle = { appBarTitleStyle }
          showMenuIconButton = {false}
          className = "dash_navbar">
          <div className="session-button" type="button" value="Start New Session" onClick={this.createNewSession}>Start New Session</div>
        </AppBar>
      </div>
    )
  }
}
