import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export const Dashboard = ({dash_navbar, dash_content}) => (
  <MuiThemeProvider>
    <div>
      {dash_navbar}
      <div className="container">
        {dash_content}
      </div>
    </div>
  </MuiThemeProvider>
);
