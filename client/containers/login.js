import { FlowRouter } from 'meteor/kadira:flow-router';
import { composeWithTracker } from 'react-komposer';
import Login from '/client/components/login/login.jsx';

const onPropsChange = (props, onData) => {
  var user = Meteor.user();
  console.log("hello");
  onData(null, {user});
};

export default LoginContainer = composeWithTracker(onPropsChange)(Login);
