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
      sesh_editor: <SessionEditor/>,
      sesh_video: <SessionVideo/>,
      sesh_chat: <SessionChat/>
    })
  }
});
