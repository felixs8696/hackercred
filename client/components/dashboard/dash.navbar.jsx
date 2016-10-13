import React from 'react';
import AppBar from 'material-ui/AppBar';

var appBarStyle = {
  backgroundColor: "#2F2F2F",
  color: "white"
}

var appBarTitleStyle = {
  color: "white",
  textTransform: "uppercase",
  lineHeight: "45px",
  textAlign: "center",
  verticalAlign: "middle",
  letterSpacing: ".5px",
  fontSize: "16px",
  fontFamily: "'Raleway', 'Roboto', 'Lato', 'Helvetica', 'Arial', sans-serif",
  fontWeight: "600"
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
          style = { appBarStyle }
          titleStyle = { appBarTitleStyle }
          showMenuIconButton = {false}
          className = "dash_navbar"
        />
      <div className="session-button" type="button" value="Start New Session" onClick={this.createNewSession}>Start New Session</div>
      </div>
    )
  }
}
