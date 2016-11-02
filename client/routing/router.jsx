import React from 'react';
import {mount} from 'react-mounter';
import {Dashboard} from '/client/layouts/dashboard.jsx';
import {Session} from '/client/layouts/session.jsx';
import DashNavbar from '/client/components/dashboard/dash.navbar.jsx';
import DashContent from '/client/components/dashboard/dash.content.jsx';

import SessionNavbar from '/client/components/session/session.navbar.jsx';
import SessionEditor from '/client/components/session/session.editor.jsx';
import SessionVideo from '/client/components/session/session.video.jsx';
import SessionChat from '/client/components/session/session.chat.jsx';

import SessionChatContainer from '/client/containers/session.chat.js';
import SessionEditorContainer from '/client/containers/session.editor.js';
import SessionVideoContainer from '/client/containers/session.video.js';
import LoginContainer from '/client/containers/login.js';

FlowRouter.route("/", {
  action (){
    mount(Dashboard, {
      dash_navbar: <DashNavbar/>,
      dash_content: <DashContent/>
    })
  }
});

FlowRouter.route("/:sessionId", {
  action (){
    mount(Session, {
      sesh_navbar: <SessionNavbar/>,
      sesh_editor: <SessionEditorContainer/>,
      sesh_video: <SessionVideoContainer/>,
      sesh_chat: <SessionChatContainer/>,
      login: <LoginContainer/>
    })
  }
});
