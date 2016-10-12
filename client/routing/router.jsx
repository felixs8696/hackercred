import React from 'react';
import {mount} from 'react-mounter';
import {Dashboard} from '/client/layouts/dashboard.jsx';
import Navbar from '/client/components/dashboard/navbar.jsx';
import Content from '/client/components/dashboard/content.jsx';

FlowRouter.route("/", {
  action (){
    mount(Dashboard, {
      dash_navbar: <Navbar/>,
      dash_content: <Content/>
    })
  }
});
