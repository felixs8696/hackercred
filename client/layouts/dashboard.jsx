import React from 'react';
import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#2F2F2F",
    // primary2Color: cyan700,
    // primary3Color: grey400,
    accent1Color: cyan500,
    // accent2Color: grey100,
    // accent3Color: grey500,
    textColor: white,
    alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // pickerHeaderColor: cyan500,
    // shadowColor: fullBlack
  },
  appBar: {
    height: 45
  }
});

export const Dashboard = ({dash_navbar, dash_content, login}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      {dash_navbar}
      <div className="container">
        {dash_content}
      </div>
      {login}
    </div>
  </MuiThemeProvider>
);
