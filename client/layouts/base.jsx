import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { cyan500, white } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#2F2F2F",
    accent1Color: cyan500,
    textColor: white,
    alternateTextColor: white,
  },
  appBar: { height: 45 }
});

export class Base extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {this.props.navbar}
          <div className="container">
            {this.props.content}
          </div>
        </div>
      </MuiThemeProvider>
    )}
}
