import React from 'react';
import AppBar from 'material-ui/AppBar';
// import { Sessions } from '/lib/collections/sessions';
import { updateSessions } from '/lib/methods/sessions';

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

export default class BaseNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.createNewSession = this.createNewSession.bind(this);
  }

  createNewSession() {
    updateSessions.call([], (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('New Session: ' + res);
        FlowRouter.go('/' + res);
      }
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title = "Hackerpad"
          titleStyle = { appBarTitleStyle }
          showMenuIconButton = {false}
          className = "dash_navbar">
          <div className="session-button" type="button" value="Start New Session" onClick={this.createNewSession}>Start New Session</div>
        </AppBar>
      </div>
    )
  }
}
