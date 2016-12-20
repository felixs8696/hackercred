import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { connectUserSession } from '/lib/methods/chat';
import { userInSession } from '/lib/methods/chat';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#2F2F2F",
    accent1Color: "#2294E3",
    textColor: white,
    alternateTextColor: white,
  },
  appBar: {
    height: 45
  }
});

export class Session extends React.Component {
  componentWillMount() {
    const sessionId = FlowRouter.getParam('sessionId');
    console.log(sessionId);
    this.setState({id: sessionId});
    const userId = Meteor.userId();
    if (userId) {
      userInSession.call({sessionId: sessionId, userId: userId}, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res);
          var sessionExists = res.sessionExists;
          if (!sessionExists) {
            console.log("Session does not exist");
            FlowRouter.go("/");
          } else {
            var user = res.userContent;
            if (!user) {
              connectUserSession.call({sessionId: sessionId, userId: userId, userObj: Meteor.user()}, (err, users) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(users);
                }
              });
            }
          }
        }
      });
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{overflow: "hidden"}}>
          {this.props.sesh_navbar}
          <div className="sesh-container">
            <div className="sesh-col">
              {this.props.sesh_editor}
            </div>
            <div className="sesh-col">
              <div className="sesh-video">
                {this.props.sesh_video}
              </div>
              <div className="sesh-chat">
                {this.props.sesh_chat}
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
