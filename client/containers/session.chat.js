import { FlowRouter } from 'meteor/kadira:flow-router';
import { composeWithTracker } from 'react-komposer';
import { Sessions } from '/collections/sessions';
import SessionChat from '/client/components/session/session.chat.jsx';

const onPropsChange = (props, onData) => {
  var sessionId = FlowRouter.getParam("sessionId");
  console.log(sessionId);
  const subscription = Meteor.subscribe("sessions", {
    onReady: () => { console.log("Subscription Ready: ", 200, " OK"); },
    onError: () => { console.log("Subscription Error: ", arguments); }
  });
  if (subscription.ready()) {
    const session = Sessions.findOne(sessionId);
    console.log(session);
    onData(null, {session});
  };
};

export default SessionChatContainer = composeWithTracker(onPropsChange)(SessionChat);
