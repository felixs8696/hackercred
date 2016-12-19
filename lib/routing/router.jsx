if (Meteor.isClient) {
  import React from 'react';
  import {mount} from 'react-mounter';
  import {Dashboard} from '/client/layouts/dashboard.jsx';
  import {Base} from '/client/layouts/base.jsx';
  import {Session} from '/client/layouts/session.jsx';
  import {Login} from '/client/layouts/login.jsx';

  import DashNavbar from '/client/components/dashboard/dash.navbar.jsx';
  import DashContent from '/client/components/dashboard/dash.content.jsx';

  import BaseNavbar from '/client/components/base/base.navbar.jsx';
  import BaseContent from '/client/components/base/base.content.jsx';

  import SessionNavbar from '/client/components/session/session.navbar.jsx';
  import SessionEditor from '/client/components/session/session.editor.jsx';
  import SessionVideo from '/client/components/session/session.video.jsx';
  import SessionChat from '/client/components/session/session.chat.jsx';

  import SessionChatContainer from '/client/containers/session.chat.js';
  import SessionEditorContainer from '/client/containers/session.editor.js';
  import SessionVideoContainer from '/client/containers/session.video.js';
  import LoginContainer from '/client/containers/login.js';
}

FlowRouter.route("/:sessionId?/login", {
  name: "login",
  action: (params) => {
    mount(Login, {
      login: <LoginContainer />
    })
  }
});

// FlowRouter.route("/", {
//   name: "home",
//   triggersEnter: [function(context, redirect) {
//     if (!Meteor.userId()) {
//       redirect('login');
//     }
//   }],
//   action: () => {
//     mount(Dashboard, {
//       dash_navbar: <DashNavbar/>,
//       dash_content: <DashContent/>
//     })
//   }
// });

FlowRouter.route("/", {
  name: "home",
  triggersEnter: [function(context, redirect) {
    if (!Meteor.userId()) {
      redirect('login');
    }
  }],
  action: () => {
    mount(Base, {
      navbar: <BaseNavbar/>,
      content: <BaseContent/>
    })
  }
});

FlowRouter.route("/:sessionId", {
  name: "session",
  triggersEnter: [function(context, redirect) {
    const sessionId = context.params.sessionId;
    if (!Meteor.userId()) {
      redirect('login', {sessionId: sessionId});
    } else {
      console.log(context);
      const subscription = Meteor.subscribe("sessions", {
        onReady: () => { console.log("Subscription Ready: ", 200, " OK"); },
        onError: () => { console.log("Subscription Error: ", arguments); }
      });
      if (subscription.ready()) {
        const session = Sessions.findOne(sessionId);
        console.log(session);
        if (!session) {
          console.warn("Session '" + sessionId + "' does not exist.");
          console.debug("Redirecting to homepage");
          redirect('home');
        }
      };
      // console.log(sessionId);
      // console.log(Sessions.find(sessionId).fetch());
      // console.log(Sessions.findOne(sessionId));
      // getSessionObj.call([], (err, session) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(session);
      //     if (!session) {
      //       console.warn("Session '" + sessionId + "' does not exist.");
      //       console.debug("Redirecting to homepage");
      //       redirect('home');
      //     }
      //   }
      // });
    }
  }],
  action: () => {
    mount(Session, {
      sesh_navbar: <SessionNavbar/>,
      sesh_editor: <SessionEditorContainer/>,
      sesh_video: <SessionVideoContainer/>,
      sesh_chat: <SessionChatContainer/>
    })
  }
});
