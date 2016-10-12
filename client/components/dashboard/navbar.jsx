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

var appBarIconStyleLeft = {
  color: "white"
}

export default class Navbar extends React.Component {
  render() {
    return (
      // <div className="dash_navbar title">
      //   Hacker Cred
      // </div>
      <AppBar
        title = "Hacker Cred"
        style = { appBarStyle }
        titleStyle = { appBarTitleStyle }
        iconStyleLeft = { appBarIconStyleLeft }
        className = "dash_navbar"
      />
    )
  }
}
