import React from 'react';
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

export const Session = ({sesh_navbar, sesh_editor, sesh_video, sesh_chat}) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div style={{overflow: "hidden"}}>
      {sesh_navbar}
      <div className="sesh-container">
        <div className="sesh_col">
          <div className="sesh-editor">
            {sesh_editor}
          </div>
        </div>
        <div className="sesh_col">
          <div className="sesh-video">
            {sesh_video}
          </div>
          <div className="sesh-chat">
            {sesh_chat}
          </div>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
);
