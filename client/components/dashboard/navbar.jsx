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

export default class Navbar extends React.Component {
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
      <div className="session-button" type="button" value="Start New Session">Start New Session</div>
      </div>
    )
  }
}
